//Notas: o 4º valor da tabela de incrementos quando é incremento semanal e juro anual para valores 2/3/6/9/11/12/13/20/22 e não testei mais;)
//ele nao obedece a regra do toFixed(2) da função semanal()
//Para mudar de simulador temos que carregar no inicio duas vezes

var ValFinal = 0;
var ValInicial = 0;
var Retorno = 0;
var tempo = 0;
var ValJuro = 0; // valor do juro
var ValPerJuro = 1; //numero de vezes que o juro é aplicado por ano, esta default para 1 vez por ano//
var ValIncremento = 0; //Incremento opcional//
var ValPerIncremento = 0; //periodicidade do incremento//
var Valor1 = 0; // Valor intermedio no calculo do juro do primeiro ano
var ValIntermedio = 0; // valor intermedio no loop
var JuroMes = 0; // valor tabela do Juro ganho por ano/mes
var JuroAcumulado = 0; // valor tabela juros acumulados 
var IncrementoAcumul = 0; // valor total investido em incrementos
var IncremIntermed = 0; //variavel intermedia usada nas funçoes anual(); mensal(); semanal() e Diario()

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

function escolhe() {
    document.getElementById("simulador1").onclick = function() {
        $("#calculadora1").removeClass('d-none');
        $("#calculadora2").addClass('d-none');
    }
    document.getElementById("simulador2").onclick = function() {
        $("#calculadora1").addClass('d-none');
        $("#calculadora2").removeClass('d-none');
    }
}

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
    if ($("#incremento").val() > 0) {
        document.getElementById("resetTabela").innerHTML = "<thead><tr><th scope='col' id='PerTabela'>Anos</th>" +
            "<th scope='col' id='PerTabela2'>Juros por Mês</th><th scope='col'>Juros Acumulados</th>" +
            "<th scope='col'>Montante Acumulado</th><th>Total Incremento</tr></thead><tbody id='tabela'></tbody>";
    } else document.getElementById("resetTabela").innerHTML = "<thead><tr><th scope='col' id='PerTabela'>Anos</th>" +
        "<th scope='col' id='PerTabela2'>Juros por Mês</th><th scope='col'>Juros Acumulados</th>" +
        "<th scope='col'>Montante Acumulado</th></tr></thead><tbody id='tabela'></tbody>";

    var eixoY = new Array(); //Array com o ValFinal incrementado para o eixo do Y do grafico/Reset do array
    IncrementoAcumul = 0;

    // Cálculos e tabela
    //Se for escolhido anos
    if ($("#TempoJuros").val() == "Anos") {
        $("#PerTabela").text("Ano");
        $("#PerTabela2").text("Juro por Ano");

        //Loop para o array eixoY com os valores"</td><td>" + JuroAcumulado.toFixed(2
        Valor1 = parseFloat(ValInicial) * parseFloat(Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * (1 / 12))));
        eixoY[0] = ValInicial;
        if ($("#TempoInc").val() == "Anual") {
            ValFinal = parseFloat(Valor1) + Anual();
            eixoY[1] = ValFinal.toFixed(2);
        } else if ($("#TempoInc").val() == "Mensal") {
            ValFinal = parseFloat(Valor1) + Mensal();
            eixoY[1] = ValFinal.toFixed(2);
        } else if ($("#TempoInc").val() == "Semanal") {
            ValFinal = parseFloat(Valor1) + Semanal();
            eixoY[1] = ValFinal.toFixed(2);
        } else if ($("#TempoInc").val() == "Diário") {
            ValFinal = parseFloat(Valor1) + Diario(i + 1);
            eixoY[1] = ValFinal.toFixed(2);
        }
        for (var i = 0; i < anoMes() - 1; i++) {
            ValIntermedio = parseFloat(ValFinal) * parseFloat(Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * 1 / 12)));

            ValFinal = parseFloat(ValIntermedio) + Mensal() / 12;
            eixoY[i + 2] = ValFinal.toFixed(2);

        }

        //Calculo Primeiro ano
        Valor1 = parseFloat(ValInicial) * parseFloat(Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * 1)));
        JuroMes = Valor1 - ValInicial;
        ValFinal = Valor1;
        JuroAcumulado = JuroMes;
        if ($("#TempoInc").val() == "Anual") {
            ValFinal += Anual();
            IncrementoAcumul += Anual();
        } else if ($("#TempoInc").val() == "Mensal") {
            ValFinal += Mensal();
            IncrementoAcumul += Mensal();
        } else if ($("#TempoInc").val() == "Semanal") {
            ValFinal += Semanal();
            IncrementoAcumul += Semanal();
        } else if ($("#TempoInc").val() == "Diário") {
            ValFinal += Diario(i + 1);
            IncrementoAcumul += Diario();
        }


        //preenchimento da primeira fila da tabela
        if ($("#incremento").val() > 0) {
            document.getElementById("tabela").innerHTML += "<tr><td>" + 1 + "</td><td>" + JuroMes.toFixed(2) + " €" +
                "</td><td>" + JuroAcumulado.toFixed(2) + " €" + "</td><td>" + ValFinal.toFixed(2) + " €" + "</td><td>" +
                IncrementoAcumul + " €" + "</td></tr>";
        } else document.getElementById("tabela").innerHTML += "<tr><td>" + 1 + "</td><td>" + JuroMes.toFixed(2) + " €" +
            "</td><td>" + JuroAcumulado.toFixed(2) + " €" + "</td><td>" + ValFinal.toFixed(2) + " €" + "</td></tr>";

        //Loop para os anos seguintes
        for (var i = 0; i < tempo - 1; i++) {
            var t = i + 2;
            ValIntermedio = parseFloat(ValFinal) * parseFloat(Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * 1)));
            JuroMes = ValIntermedio - ValFinal;
            JuroAcumulado += JuroMes;
            ValFinal = ValIntermedio;
            if ($("#TempoInc").val() == "Anual") {
                ValFinal += Anual();
                IncrementoAcumul += Anual();
            } else if ($("#TempoInc").val() == "Mensal") {
                ValFinal += Mensal();
                IncrementoAcumul += Mensal();
            } else if ($("#TempoInc").val() == "Semanal") {
                ValFinal += Semanal();
                IncrementoAcumul += Semanal();
            } else if ($("#TempoInc").val() == "Diário") {
                ValFinal += Diario(i + 1);
                IncrementoAcumul += Diario();
            }

            //Preenchimento da tabela
            if ($("#incremento").val() > 0) {
                document.getElementById("tabela").innerHTML += "<tr><td>" + t + "</td><td>" + JuroMes.toFixed(2) + " €" +
                    "</td><td>" + JuroAcumulado.toFixed(2) + " €" + "</td><td>" + ValFinal.toFixed(2) + " €" + "</td><td>" +
                    IncrementoAcumul + " €" + "</td></tr>";
            } else document.getElementById("tabela").innerHTML += "<tr><td>" + t + "</td><td>" + JuroMes.toFixed(2) + " €" +
                "</td><td>" + JuroAcumulado.toFixed(2) + " €" + "</td><td>" + ValFinal.toFixed(2) + " €" + "</td></tr>";
        }
        Retorno = ValFinal - ValInicial;
    } else {
        $("#PerTabela").text("Meses");
        $("#PerTabela2").text("Juro por Mês");

        //Calculo Primeiro Mês
        Valor1 = parseFloat(ValInicial) * parseFloat(Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * (1 / 12))));
        JuroMes = Valor1 - ValInicial;
        ValFinal = parseFloat(Valor1) + parseFloat(ValIncremento);
        JuroAcumulado = JuroMes;
        eixoY[0] = ValInicial;
        if ($("#TempoInc").val() == "Anual") {
            ValFinal += Anual();
            IncrementoAcumul += Anual();
            eixoY[1] = ValFinal.toFixed(2);
        } else if ($("#TempoInc").val() == "Mensal") {

            ValFinal += Mensal();
            IncrementoAcumul += Mensal();
            eixoY[1] = ValFinal.toFixed(2);
        } else if ($("#TempoInc").val() == "Semanal") {
            ValFinal += Semanal();
            IncrementoAcumul += Semanal();
            eixoY[1] = ValFinal.toFixed(2);
        } else if ($("#TempoInc").val() == "Diário") {
            ValFinal += Diario(i + 1);
            IncrementoAcumul += Diario();
            eixoY[1] = ValFinal.toFixed(2);
        }

        //preenchimento da primeira fila da tabela
        if ($("#incremento").val() > 0) {
            document.getElementById("tabela").innerHTML += "<tr><td>" + 1 + "</td><td>" + JuroMes.toFixed(2) + " €" +
                "</td><td>" + JuroAcumulado.toFixed(2) + " €" + "</td><td>" + ValFinal.toFixed(2) + " €" + "</td><td>" +
                IncrementoAcumul + " €" + "</td></tr>";
        } else document.getElementById("tabela").innerHTML += "<tr><td>" + 1 + "</td><td>" + JuroMes.toFixed(2) + " €" +
            "</td><td>" + JuroAcumulado.toFixed(2) + " €" + "</td><td>" + ValFinal.toFixed(2) + " €" + "</td></tr>";


        //Loop para os meses seguintes
        for (var i = 0; i < anoMes() - 1; i++) {
            var t = i + 2;
            var j = i + 1; // nao apagar ista linha ela esta a por a if ($("#TempoInc").val() == "Anual") a funcionar corretamente
            ValIntermedio = parseFloat(ValFinal) * parseFloat(Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * (1 / 12))));
            JuroMes = ValIntermedio - ValFinal;
            JuroAcumulado += JuroMes;
            ValFinal = ValIntermedio;
            if ($("#TempoInc").val() == "Anual") {
                if (j % 12 == 0) {
                    ValFinal += Anual();
                    IncrementoAcumul += Anual();
                }
            } else if ($("#TempoInc").val() == "Mensal") {
                ValFinal += Mensal();
                IncrementoAcumul += Mensal();
            } else if ($("#TempoInc").val() == "Semanal") {
                ValFinal += Semanal();
                IncrementoAcumul += Semanal();
            } else if ($("#TempoInc").val() == "Diário") {
                ValFinal += Diario(i + 1);
                IncrementoAcumul += Diario();
            }

            eixoY[i + 2] = ValFinal.toFixed(2);


            //Preenchimento da tabela
            if ($("#incremento").val() > 0) {
                document.getElementById("tabela").innerHTML += "<tr><td>" + t + "</td><td>" + JuroMes.toFixed(2) + " €" +
                    "</td><td>" + JuroAcumulado.toFixed(2) + " €" + "</td><td>" + ValFinal.toFixed(2) + " €" + "</td><td>" +
                    IncrementoAcumul + " €" + "</td></tr>";
            } else document.getElementById("tabela").innerHTML += "<tr><td>" + t + "</td><td>" + JuroMes.toFixed(2) + " €" +
                "</td><td>" + JuroAcumulado.toFixed(2) + " €" + "</td><td>" + ValFinal.toFixed(2) + " €" + "</td></tr>";
        }
        Retorno = ValFinal - ValInicial;
        console.log("\n\n\n\n Array eixoY");
        console.log(eixoY);
        console.log("\n\n\n\n");
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
            var i = cont + 2;
            if ($("#TempoInc").val() == "Anual") {
                IncrementoAcumul = (Anual() / anoMes()).toFixed(2);
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
                valor[cont + 1] = parseFloat(ValInicial) + ((cont + 1) * (parseFloat(IncrementoAcumul) / 12));

            }
        }

        return valor;
    }

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
    $("#Retorno").val(Retorno.toFixed(2));
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
        return parseFloat(IncremIntermed.toFixed(2));
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

//funcao que converte anos em meses2
function anoMes() {
    tempo2 = tempo * 12;
    console.log(tempo2);
    return tempo2;
}