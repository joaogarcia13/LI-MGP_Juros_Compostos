//Notas: o 4º valor da tabela de incrementos quando é incremento semanal e juro anual para valores 2/3/6/9/11/12/13/20/22 e não testei mais;)
//ele nao obedece a regra do toFixed(2) da função semanal()
//Para mudar de simulador temos que carregar no inicio duas vezessss

var ValInicial = 0.0;
var Retorno = 0.0;
var tempo = 0.0;
var ValJuro = 0.0; // valor do juro
var ValPerJuro = 1.0; //numero de vezes que o juro é aplicado por ano, esta default para 1 vez por ano//
var ValIncremento = 0.0; //Incremento opcional//
var ValPerIncremento = 0.0; //periodicidade do incremento//
var Valor1 = 0.0; // Valor intermedio no calculo do juro do primeiro ano
var ValIntermedio = 0.0; // valor intermedio no loop
var IncremIntermed = 0.0; //variavel intermedia usada nas funçoes anual(); mensal(); semanal() e Diario()

//botao de limpar dados
function limpar() {
    $("#valorInitial").val('');
    $("#tempo").val('');
    $("#juro").val('');
    $("#periodo").val('');
    $("#ValFinal").val('');
    $("#Retorno").val('');
    $("#incremento").val('');
    $("#perincremento").val('');
    $("#tabGraf").addClass('d-none');
}

//Escolha de simuladores
$(document).ready(function () {

    $("#simulador1").click(function () {
        $("#calculadora2").addClass("d-none");
        $("#calculadora1").removeClass("d-none");
    })
    $("#simulador2").click(function () {
        $("#calculadora1").addClass("d-none");
        $("#calculadora2").removeClass("d-none");
    })
})

//validação de dados para a função calcular() e botão calcular
function validate() {
    ValInicial = $("#valorInitial").val();

    //converter meses anos, com casa decimal
    tempo = $("#tempo").val();
    console.log(tempo);
    ValJuro = $("#juro").val() / 100;
    console.log(ValJuro);
    ValPerJuro = $("#periodo").val();
    console.log(ValPerJuro);
    ValIncremento = $("#incremento").val();
    ValPerIncremento = $("#perincremento").val();

    //verifica se os valores sao positivos
    if (ValInicial <= 0 || tempo <= 0 || ValJuro <= 0 ||
        ValPerJuro <= 0 && ValIncremento <= 0) {
        alert("Verifique se todos os valores são positivos.");
    } else
        //verifica se são numeros
        if ($.isNumeric(ValInicial) && $.isNumeric(tempo) &&
            $.isNumeric(ValJuro) && $.isNumeric(ValPerJuro) &&
            $.isNumeric(ValIncremento)) {
            console.log("Os inputs são numeros.");
            //Falta aqui a função para quando for o simulador 2
            calcular();

        } else alert("Os campos têm de ser preenchidos com valores numéricos.");
}


//Cálculos e aparece os gráficos (esta função é chamada dentro da função validate())
function calcular() {

    //reset da tabela, grafico, valores Finais e Retorno
    /*if ($("#incremento").val() > 0) {
        document.getElementById("resetTabela").innerHTML = "<thead><tr><th scope='col' id='PerTabela'>Anos</th>" +
            "<th scope='col' id='PerTabela2'>Juros por Mês</th><th scope='col'>Juros Acumulados</th>" +
            "<th scope='col'>Montante Acumulado</th><th>Total Incremento</tr></thead><tbody id='tabela'></tbody>";
    } else document.getElementById("resetTabela").innerHTML = "<thead><tr><th scope='col' id='PerTabela'>Anos</th>" +
        "<th scope='col' id='PerTabela2'>Juros por Mês</th><th scope='col'>Juros Acumulados</th>" +
        "<th scope='col'>Montante Acumulado</th></tr></thead><tbody id='tabela'></tbody>";
        */

    // Array do Valor Eixo Y
    if (eixoY != null) { eixoY.length = 0; }

    var eixoY = new Array();
    if ($("#TempoJuros").val() == "Anos") {
        for (var i = 0; i < anoMes(); i++) {
            eixoY[i] = 0.0;
        }
    } else {
        for (var i = 0; i < tempo; i++) {
            eixoY[i] = 0.0;
        }
    }

    //Array dos Valores da tabela
    ArrayDados = new Array();
    for (var i = 0; i < tempo; i++) {
        ArrayDados[i] = { 'Tempo': 0, 'ValFinal': 0.0, 'JuroMes': 0.0, 'IncrementoAcumul': 0.0, 'JuroAcumulado': 0.0 };
    }



    // Cálculos e tabela
    //Se for escolhido anos
    if ($("#TempoJuros").val() == "Anos") {
        $("#PerTabela").text("Ano");
        $("#PerTabela2").text("Juro por Ano");

        //Calculo Primeiro ano (i == 0), e o resto dos anos no else
        for (var i = 0; i < tempo; i++) {
            ArrayDados[i].Tempo = i + 1;
            if (i == 0) {
                Valor1 = ValInicial * Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * 1));
                ArrayDados[i].JuroMes = Valor1 - ValInicial;
                ArrayDados[i].ValFinal = Valor1;
                ArrayDados[i].JuroAcumulado = ArrayDados[i].JuroMes;
                if ($("#TempoInc").val() == "Anual") {
                    ArrayDados[i].ValFinal += Anual();
                    ArrayDados[i].IncrementoAcumul += Anual();
                } else if ($("#TempoInc").val() == "Mensal") {
                    ArrayDados[i].ValFinal += Mensal();
                    ArrayDados[i].IncrementoAcumul += Mensal();
                } else if ($("#TempoInc").val() == "Semanal") {
                    ArrayDados[i].ValFinal += Semanal();
                    ArrayDados[i].IncrementoAcumul += Semanal();
                } else if ($("#TempoInc").val() == "Diário") {
                    ArrayDados[i].ValFinal += Diario(i + 1);
                    ArrayDados[i].IncrementoAcumul += Diario();
                }
            } else {
                ValIntermedio = ArrayDados[i - 1].ValFinal * Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * 1));
                ArrayDados[i].JuroMes = ValIntermedio - ArrayDados[i - 1].ValFinal;
                ArrayDados[i].JuroAcumulado += ArrayDados[i].JuroMes;
                ArrayDados[i].ValFinal = ValIntermedio;
                if ($("#TempoInc").val() == "Anual") {
                    ArrayDados[i].ValFinal += Anual();
                    ArrayDados[i].IncrementoAcumul += Anual();
                } else if ($("#TempoInc").val() == "Mensal") {
                    ArrayDados[i].ValFinal += Mensal();
                    ArrayDados[i].IncrementoAcumul += Mensal();
                } else if ($("#TempoInc").val() == "Semanal") {
                    ArrayDados[i].ValFinal += Semanal();
                    ArrayDados[i].IncrementoAcumul += Semanal();
                } else if ($("#TempoInc").val() == "Diário") {
                    ArrayDados[i].ValFinal += Diario(i + 1);
                    ArrayDados[i].IncrementoAcumul += Diario();
                }
            }
        }
        Retorno = ArrayDados[ArrayDados.length - 1].ValFinal - ValInicial;

    } else {
        //Cálculo para os Meses
        for (var i = 0; i < tempo; i++) {
            ArrayDados[i].Tempo = i + 1;
            if (i == 0) {
                Valor1 = ValInicial * Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * (1 / 12)));
                ArrayDados[i].ValFinal = Valor1 + ValIncremento;
                ArrayDados[i].JuroMes = Valor1 - ValInicial;
                ArrayDados[i].JuroAcumulado = ArrayDados[i].JuroMes;
                //Duvido
                if ($("#TempoInc").val() == "Anual") {
                    ArrayDados[i].ValFinal += Anual();
                    ArrayDados[i].IncrementoAcumul += Anual();
                } else if ($("#TempoInc").val() == "Mensal") {
                    ArrayDados[i].ValFinal += Mensal();
                    ArrayDados[i].IncrementoAcumul += Mensal();
                } else if ($("#TempoInc").val() == "Semanal") {
                    ArrayDados[i].ValFinal += Semanal();
                    ArrayDados[i].IncrementoAcumul += Semanal();
                } else if ($("#TempoInc").val() == "Diário") {
                    ArrayDados[i].ValFinal += Diario(i + 1);
                    ArrayDados[i].IncrementoAcumul += Diario();
                }
            } else {
                ValIntermedio = ArrayDados[i - 1].ValFinal * Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * (1 / 12)));
                ArrayDados[i].JuroMes = ValIntermedio - ArrayDados[i - 1].ValFinal;
                ArrayDados[i].JuroAcumulado += ArrayDados[i].JuroMes;
                ArrayDados[i].ValFinal = ValIntermedio;
                if ($("#TempoInc").val() == "Anual") {
                    ArrayDados[i].ValFinal += Anual();
                    ArrayDados[i].IncrementoAcumul += Anual();
                } else if ($("#TempoInc").val() == "Mensal") {
                    ArrayDados[i].ValFinal += Mensal();
                    ArrayDados[i].IncrementoAcumul += Mensal();
                } else if ($("#TempoInc").val() == "Semanal") {
                    ArrayDados[i].ValFinal += Semanal();
                    ArrayDados[i].IncrementoAcumul += Semanal();
                } else if ($("#TempoInc").val() == "Diário") {
                    ArrayDados[i].ValFinal += Diario(i + 1);
                    ArrayDados[i].IncrementoAcumul += Diario();
                }
            }
        }
        Retorno = ArrayDados[ArrayDados.length - 1].ValFinal - ValInicial;
    }

    console.log("\n\n\n");
    console.log(ArrayDados);
    console.log("\n\n\n");

    eixoY[0] = ValInicial;
    for (var i = 0; i < ArrayDados.length; i++) {
        eixoY[i + 1] = ArrayDados[i].ValFinal;
    }
    console.log("__: " + eixoY);

    escrever();
}

function escrever() {

    $("#ValFinal").val(ArrayDados[ArrayDados.length - 1].ValFinal.toFixed(2));
    $("#Retorno").val(Retorno.toFixed(2));

    //tabela
    var $tabela = $("#resetTabela")
    $(function () {
        $tabela.bootstrapTable({ ArrayDados: ArrayDados })
    })

    //Gráfico de linha 
    var ctx = document.getElementById('myChart').getContext('2d');
    if (window.linhaInvest && window.linhaInvest !== null) {
        window.linhaInvest.destroy();
    }
    window.linhaInvest = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: eixoX(),
            datasets: [{
                label: 'Val. Investido',
                borderColor: 'blue',
                data: valorInicial(),
                fill: false,
            },
            {
                label: 'Val. Acumulado',
                borderColor: 'red',
                data: eixoY,
                fill: false,
            }
            ]
        },

        // Configuration options go herealorInicial
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Meses',
                    },

                },],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Dinheiro (€)',
                    },
                },],
            },
        },
    });

    //Ultima linha desta função, aparece o grafico e a tabela
    $("#tabGraf").removeClass("d-none");
}

//Incremento anual
function Anual() {
    if ($("#TempoJuros").val() == "Anos") {
        return parseFloat(ValIncremento);
    } else if ($("#TempoJuros").val() == "Meses") {
        return parseFloat(ValIncremento);
    }
}
//Incremento Mensal
function Mensal() {
    if ($("#TempoJuros").val() == "Anos") {
        IncremIntermed = ValIncremento * 12;
        return parseFloat(IncremIntermed);
    } else if ($("#TempoJuros").val() == "Meses") {
        return parseFloat(ValIncremento);
    }
}
//Incremento Semanal
function Semanal() {
    if ($("#TempoJuros").val() == "Anos") {
        IncremIntermed = ValIncremento * 52.177457;
        return parseFloat(IncremIntermed);
    } else if ($("#TempoJuros").val() == "Meses") {
        IncremIntermed = ValIncremento * 4;
        return parseFloat(IncremIntermed);
    }
}
//incremento Diário
function Diario(i) {
    if ($("#TempoJuros").val() == "Anos") {
        IncremIntermed = ValIncremento * 365;
        return parseFloat(IncremIntermed);
    } else if ($("#TempoJuros").val() == "Meses") {
        do {
            i = i - 12;
        } while (i > 12);

        switch (i) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 9:
            case 11:
                IncremIntermed = ValIncremento * 31;
                break;
            case 4:
            case 6:
            case 8:
            case 10:
            case 12:
                IncremIntermed = ValIncremento * 30;
                break;
            default:
                IncremIntermed = ValIncremento * 28;
                return parseFloat(IncremIntermed);
        }
    }
}

//funcao que converte anos em meses
function anoMes() {
    tempo2 = tempo * 12;
    console.log(tempo2);
    return tempo2;
}

//EixoX
function eixoX() {
    var cont;
    duracao = new Array(anoMes());

    for (cont = 0; cont <= anoMes(); cont++) {
        duracao[cont] = cont;
    }

    return duracao;
}

//Valor inicial
function valorInicial() {
    var cont, valor = new Array(anoMes());

    valor[0] = ValInicial;
    for (cont = 0; cont <= anoMes(); cont++) {
        if ($("#TempoInc").val() == "Anual") {
            IncrementoAcumul = Anual();
        } else if ($("#TempoInc").val() == "Mensal") {
            IncrementoAcumul = Mensal();
        } else if ($("#TempoInc").val() == "Semanal") {
            IncrementoAcumul = Semanal();
        } else if ($("#TempoInc").val() == "Diário") {
            IncrementoAcumul = Diario();
        }

        if ($("#TempoJuros").val() == "Meses") {
            valor[cont + 1] = ValInicial + ((cont + 1) * IncrementoAcumul);
        } else {
            valor[cont + 1] = ValInicial + ((cont + 1) * (IncrementoAcumul / 12));

        }
    }

    return valor;
}

/*
//preenchimento da primeira fila da tabela
if ($("#incremento").val() > 0) {
    document.getElementById("tabela").innerHTML += "<tr><td>" + 1 + "</td><td>" + JuroMes.toFixed(2) + " €" +
        "</td><td>" + JuroAcumulado.toFixed(2) + " €" + "</td><td>" + ValFinal.toFixed(2) + " €" + "</td><td>" +
        IncrementoAcumul + " €" + "</td></tr>";
} else {
    document.getElementById("tabela").innerHTML += "<tr><td>" + 1 + "</td><td>" + JuroMes.toFixed(2) + " €" +
        "</td><td>" + JuroAcumulado.toFixed(2) + " €" + "</td><td>" + ValFinal.toFixed(2) + " €" + "</td></tr>";
}
*/