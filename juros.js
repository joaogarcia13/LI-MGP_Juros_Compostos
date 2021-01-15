//Notas: o 4º valor da tabela de incrementos quando é incremento semanal e juro anual para valores 2/3/6/9/11/12/13/20/22 e não testei mais;)
//ele nao obedece a regra do toFixed(2) da função semanal()
//Para mudar de simulador temos que carregar no inicio duas vezessss

var ValInicial = 0;
var Retorno = 0;
var tempo = 0;
var ValJuro = 0; // valor do juro
var ValPerJuro = 1; //numero de vezes que o juro é aplicado por ano, esta default para 1 vez por ano//
var ValIncremento = 0; //Incremento opcional//
var ValPerIncremento = 0; //periodicidade do incremento//
var Valor1 = 0; // Valor intermedio no calculo do juro do primeiro ano
var ValIntermedio = 0; // valor intermedio no loop
var IncremIntermed = 0; //variavel intermedia usada nas funçoes anual(); mensal(); semanal() e Diario()
var eixoY = new Array(); //Array com o ValFinal incrementado para o eixo do Y do grafico

//Array dos dados tods e atribuiçao de um valor base
var ArrayDados = new Array();
ArrayDados[0] = { 'Tempo': 0, 'ValFinal': 0.0, 'JuroMes': 0.0, 'IncrementoAcumul': 0.0, 'JuroAcumulado': 0.0, };

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
$(document).ready(function() {
    data
    $("#simulador1").click(function() {
        $("#calculadora2").addClass("d-none");
        $("#calculadora1").removeClass("d-none");
    })
    $("#simulador2").click(function() {
        $("#calculadora1").addClass("d-none");
        $("#calculadora2").removeClass("d-none");
    })
})

//validação de dados para a função calcular() e botão calcular
function validate() {
    ValInicial = $("#valorInitial").val();

    //converter meses anos, com casa decimal
    if ($("#TempoJuros").val() == "Anos") {
        tempo = $("#tempo").val();
    } else {
        tempo = $("#tempo").val() / 12;
    }
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

    var eixoY = new Array();
    ArrayDados = new Array();
    ArrayDados[0] = { 'Tempo': 0, 'ValFinal': 0.0, 'JuroMes': 0.0, 'IncrementoAcumul': 0.0, 'JuroAcumulado': 0.0, };
    IncrementoAcumul = 0;

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
                ArrayDados[i].JuroAcumulado = ArrayDados[0].JuroMes;
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
                ValIntermedio = ValFinal * Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * 1));
                ArrayDados[i].JuroMes = ValIntermedio - ArrayDados[i].ValFinal;
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
        ArrayDados[0] = { 'Tempo': 0, 'ValFinal': 0.0, 'JuroMes': 0.0, 'IncrementoAcumul': 0.0, 'JuroAcumulado': 0.0, };

        for (var i = 0; i < anoMes(); i++) {
            ArrayDados[i].tempo = i + 1;
            if (i == 0) {
                Valor1 = ValInicial * Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * (1 / 12)));
                ArrayDados[i].ValFinal = Valor1 + ValIncremento;
                ArrayDados[i].JuroMes = Valor1 - ValInicial;
                ArrayDados[i].JuroAcumulado = ArrayDados[i].juroMes;
            } else {
                ValIntermedio = ValFinal * Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * (1 / 12)));
                ArrayDados[i].JuroMes = ValIntermedio - ValFinal;
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
    $("#ValFinal").val(ArrayDados[ArrayDados.length - 1].ValFinal.toFixed(2));
    $("#Retorno").val(Retorno.toFixed(2));
}

/*
//Loop para o array eixoY com os valores"</td><td>" + JuroAcumulado.toFixed(2
Valor1 = parseFloat(ValInicial) * parseFloat(Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro / 12)));
//ValFinal = parseFloat(Valor1) + parseFloat(ValIncremento / anoMes());
eixoY[0] = ValInicial;
if ($("#TempoInc").val() == "Anual") {
    ValFinal = parseFloat(Valor1) + (Anual() / 12);
    //ValFinal += (Anual() * 12) / anoMes();
} else if ($("#TempoInc").val() == "Mensal") {
    ValFinal = parseFloat(Valor1) + Mensal() / 12;
} else if ($("#TempoInc").val() == "Semanal") {
    ValFinal = parseFloat(Valor1) + Semanal() / 12;
} else if ($("#TempoInc").val() == "Diário") {
    ValFinal = parseFloat(Valor1) + Diario(i + 1) / 12;
}
eixoY[1] = ValFinal.toFixed(2);
for (var i = 0; i < anoMes() - 1; i++) {
    ValIntermedio = parseFloat(ValFinal) * parseFloat(Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro / 12)));
    //ValFinal = parseFloat(ValIntermedio) + parseFloat(ValIncremento / anoMes());
    if ($("#TempoInc").val() == "Anual") {
        ValFinal = parseFloat(ValIntermedio) + (Anual() / 12);
        //ValFinal += (Anual() / anoMes());
    } else if ($("#TempoInc").val() == "Mensal") {
        ValFinal = parseFloat(ValIntermedio) + Mensal() / 12;
        //ValFinal += Mensal();
    } else if ($("#TempoInc").val() == "Semanal") {
        ValFinal = parseFloat(ValIntermedio) + Semanal() / 12;
    } else if ($("#TempoInc").val() == "Diário") {
        ValFinal = parseFloat(ValIntermedio) + Diario(i + 1) / 12;
    }
    eixoY[i + 2] = ValFinal.toFixed(2);

}*/

//Incremento anual
function Anual() {
    if ($("#TempoJuros").val() == "Anos") {
        return ValIncremento;
    } else if ($("#TempoJuros").val() == "Meses") {
        return ValIncremento;
    }
}
//Incremento Mensal
function Mensal() {
    if ($("#TempoJuros").val() == "Anos") {
        IncremIntermed = ValIncremento * 12;
        return IncremIntermed;
    } else if ($("#TempoJuros").val() == "Meses") {
        return ValIncremento;
    }
}
//Incremento Semanal
function Semanal() {
    if ($("#TempoJuros").val() == "Anos") {
        IncremIntermed = ValIncremento * 52.177457;
        return IncremIntermed;
    } else if ($("#TempoJuros").val() == "Meses") {
        IncremIntermed = ValIncremento * 4;
        return IncremIntermed;
    }
}
//incremento Diário
function Diario(i) {
    if ($("#TempoJuros").val() == "Anos") {
        IncremIntermed = ValIncremento * 365;
        return IncremIntermed;
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
                return IncremIntermed;
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
            IncrementoAcumul = Anual().toFixed(2);
        } else if ($("#TempoInc").val() == "Mensal") {
            IncrementoAcumul = Mensal();
        } else if ($("#TempoInc").val() == "Semanal") {
            IncrementoAcumul = Semanal();
        } else if ($("#TempoInc").val() == "Diário") {
            IncrementoAcumul = Diario();
        }

        if ($("#TempoJuros").val() == "Meses") {
            valor[cont + 1] = parseFloat(ValInicial) + ((cont + 1) * parseFloat(IncrementoAcumul));
        } else {
            valor[cont + 1] = parseFloat(ValInicial) + ((cont + 1) * (IncrementoAcumul / 12));

        }
    }

    return valor;
}



//funcao escrever
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

            }, ],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Dinheiro (€)',
                },
            }, ],
        },
    },
});

//preenchimento da primeira fila da tabela
if ($("#incremento").val() > 0) {
    document.getElementById("tabela").innerHTML += "<tr><td>" + 1 + "</td><td>" + JuroMes.toFixed(2) + " €" +
        "</td><td>" + JuroAcumulado.toFixed(2) + " €" + "</td><td>" + ValFinal.toFixed(2) + " €" + "</td><td>" +
        IncrementoAcumul + " €" + "</td></tr>";
} else {
    document.getElementById("tabela").innerHTML += "<tr><td>" + 1 + "</td><td>" + JuroMes.toFixed(2) + " €" +
        "</td><td>" + JuroAcumulado.toFixed(2) + " €" + "</td><td>" + ValFinal.toFixed(2) + " €" + "</td></tr>";
}


$("#tabGraf").removeClass("d-none");