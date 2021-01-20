//erro simulador 1 no incremento

var ValInicial = 0.0;
var ValAtingir = 0.0;
var Retorno = 0.0;
var tempo = 0.0;
var ValJuro = 0.0; // valor do juro
var ValPerJuro = 1.0; //numero de vezes que o juro é aplicado por ano, esta default para 1 vez por ano//
var ValIncremento = 0.0; //Incremento opcional//
var ValPerIncremento = 0.0; //periodicidade do incremento//
var Valor1 = 0.0; // Valor intermedio no calculo do juro do primeiro ano
var ValIntermedio = 0.0; // valor intermedio no loop
var IncremIntermed = 0.0; //variavel intermedia usada nas funçoes anual(); mensal(); semanal() e Diario()
var ArrayEixoX = new Array();
var eixoY = new Array();
let chart;
var eixoY = new Array();

function limpar() {
    //calculadora 2
    if ($("#calculadora1").hasClass("d-none") && $("#calculadora3").hasClass("d-none")) {
        $("#ValFinal2").val('0');
        $("#valorInitial2").val('0');
        $("#juro2").val('00.00');
        $("#periodo2").val('0');
        $("#incremento2").val('0');
        $("#perincremento2").val('0');
        $("#duracao2").val('');
    } else if ($("#calculadora2").hasClass("d-none") && $("#calculadora3").hasClass("d-none")) {
        //calculadora 1
        $("#valorInitial").val('0');
        $("#tempo").val('0');
        $("#juro").val('00.00');
        $("#periodo").val('0');
        $("#ValFinal").val('');
        $("#Retorno").val('');
        $("#incremento").val('0');
    } else {
        //calculadora 3
        $("#valorInitial3").val('0');
        $("#tempo3").val('0');
        $("#juro3").val('00.00');
        $("#periodo3").val('0');
        $("#ValFinal3").val('');
        $("#incremento3").val('0');
        $("#perincremento3").val('0');
    }
    $("#tabGraf").addClass('d-none');
}

//Botão de Informações e escolha de simuladores
$(document).ready(function() {
    $("#Informacoes").click(function() {
        $('html, body').animate({
            scrollTop: $("#Inform").offset().top
        }, 2000);
    });

    $("#simulador1").click(function() {
        $("#calculadora2").addClass("d-none");
        $("#calculadora1").removeClass("d-none");
        $("#calculadora3").addClass("d-none");
        $("#tabGraf").addClass("d-none");
        reset();
    });

    $("#simulador2").click(function() {
        $("#calculadora1").addClass("d-none");
        $("#calculadora3").addClass("d-none");
        $("#calculadora2").removeClass("d-none");
        $("#tabGraf").addClass("d-none");
        reset();
    });

    $("#simulador3").click(function() {
        $("#calculadora1").addClass("d-none");
        $("#calculadora2").addClass("d-none");
        $("#calculadora3").removeClass("d-none");
        $("#tabGraf").addClass("d-none");
        reset();
    });
})

//validação de dados para a função calcular() e botão calcular
function validate() {
    //Escolhe o simulador 2
    if ($("#calculadora1").hasClass("d-none") && $("#calculadora3").hasClass("d-none")) {
        ValAtingir = $("#ValFinal2").val();
        ValInicial = $("#valorInitial2").val();
        ValJuro = $("#juro2").val() / 100;
        ValPerJuro = $("#periodo2").val();
        ValIncremento = $("#incremento3").val();
        ValPerIncremento = $("#perincremento3").val();

        //verifica se os valores sao positivos
        if (ValAtingir <= 0 || ValInicial <= 0 || ValJuro <= 0 ||
            ValPerJuro <= 0 || ValIncremento <= 0) {
            alert("Verifique se todos os valores são positivos.");
        } else
        //verifica se são numeros
        if ($.isNumeric(ValAtingir) && $.isNumeric(ValInicial) &&
            $.isNumeric(ValJuro) && $.isNumeric(ValPerJuro) && $.isNumeric(ValIncremento)) {
            console.log("Os inputs são numeros.");
            if (parseFloat(ValAtingir > ValInicial)) {
                simulador2();
            } else {
                alert("O valor a atingir não pode ser menor que o valor inicial");
            }
        } else alert("Os campos têm de ser preenchidos com valores numéricos.");
    }
    //Escolhe o simulador 1
    else if ($("#calculadora2").hasClass("d-none") && $("#calculadora3").hasClass("d-none")) {
        ValInicial = $("#valorInitial").val();
        tempo = $("#tempo").val();
        ValJuro = $("#juro").val() / 100;
        ValPerJuro = $("#periodo").val();
        ValIncremento = $("#incremento").val();
        ValPerIncremento = $("#perincremento").val();

        //verifica se os valores sao positivos
        if (ValInicial <= 0 || tempo <= 0 || ValJuro <= 0 ||
            ValPerJuro <= 0 || ValIncremento < 0) {
            alert("Verifique se todos os valores são positivos.");
        } else
        //verifica se são numeros
        if ($.isNumeric(ValInicial) && $.isNumeric(tempo) &&
            $.isNumeric(ValJuro) && $.isNumeric(ValPerJuro) &&
            $.isNumeric(ValIncremento)) {
            console.log("Os inputs são numeros.");
            //Escolhe a função de cálculo para cada um dos simuladores
            simulador1();
        } else alert("Os campos têm de ser preenchidos com valores numéricos.");
    } else {
        //Escolhe simulador 3
        tempo = $("#tempo3").val();
        ValPerJuro = $("#periodo3").val();
        ValIncremento = $("#incremento3").val();
        ValAtingir = $("#ValFinal3").val();
        ValPerIncremento = $("#perincremento3").val();
        ValJuro = $("#juro3").val() / 100;

        //verifica se os valores sao positivos
        if (ValAtingir <= 0 || tempo <= 0 || ValJuro <= 0 ||
            ValPerJuro <= 0) { //|| ValIncremento <= 0 Falta isto que está a dar erro
            alert("Verifique se todos os valores são positivos.");
        } else
        //verifica se são numeros
        if ($.isNumeric(ValAtingir) && $.isNumeric(tempo) &&
            $.isNumeric(ValJuro) && $.isNumeric(ValPerJuro) &&
            $.isNumeric(ValIncremento)) {
            console.log("Os inputs são numeros.");
            //Escolhe a função de cálculo para cada um dos simuladores
            simulador3();
        } else alert("Os campos têm de ser preenchidos com valores numéricos.");
    }

        /* escolhe o elemento que desejamos ir */
        var target = $( $("#tabGraf") );
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000); //Tempo de animação em milissegundos
}

//reset variaveis
function reset() {
    ValInicial = 0.0;
    ValAtingir = 0.0;
    Retorno = 0.0;
    tempo = 0.0;
    ValJuro = 0.0;
    ValPerJuro = 1.0;
    ValIncremento = 0.0;
    ValPerIncremento = 0.0;
    Valor1 = 0.0;
    ValIntermedio = 0.0;
    IncremIntermed = 0.0;
}

//Cálculos e aparece os gráficos (esta função é chamada dentro da função validate()) do simulador 1
function simulador1() {

    //Array dos Valores da tabela
    ArrayDados = new Array();
    for (var i = 0; i < tempo; i++) {
        ArrayDados[i] = { 'Tempo': 0, 'ValFinal': 0.0, 'JuroMes': 0.0, 'IncrementoAcumul': 0.0, 'JuroAcumulado': 0.0 };
    }

    // Cálculos e tabela
    //Se for escolhido anos
    if ($("#TempoJuros").val() == "Anos" || $("#calculadora2").hasClass("d-none") == false) {
        $("#PerTabela").text("Ano");
        $("#PerTabela2").text("Juro por Ano");

        //Calculo Primeiro ano (i == 0), e o resto dos anos no else
        for (var i = 0; i < tempo; i++) {
            var t = i - 1;
            ArrayDados[i].Tempo = i + 1;
            if (i == 0) {
                ArrayDados[i].ValFinal = ValInicial * Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * 1));
                ArrayDados[i].JuroMes = ArrayDados[i].ValFinal - ValInicial;
                ArrayDados[i].JuroAcumulado = ArrayDados[i].JuroAcumulado + ArrayDados[i].JuroMes;
                if ($("#TempoInc").val() == "Anual") {
                    ArrayDados[i].ValFinal += parseFloat(Anual());
                    ArrayDados[i].IncrementoAcumul = ArrayDados[i].IncrementoAcumul + parseFloat(Anual());
                } else if ($("#TempoInc").val() == "Mensal") {
                    ArrayDados[i].ValFinal += parseFloat(Mensal());
                    ArrayDados[i].IncrementoAcumul = ArrayDados[i].IncrementoAcumul + parseFloat(Mensal());
                } else if ($("#TempoInc").val() == "Semanal") {
                    ArrayDados[i].ValFinal += parseFloat(Semanal());
                    ArrayDados[i].IncrementoAcumul = ArrayDados[i].IncrementoAcumul + parseFloat(Semanal());
                } else if ($("#TempoInc").val() == "Diário") {
                    ArrayDados[i].ValFinal += parseFloat(Diario(i + 1));
                    ArrayDados[i].IncrementoAcumul = ArrayDados[i].IncrementoAcumul + parseFloat(Diario());
                }
            } else {
                ArrayDados[i].ValFinal = ArrayDados[t].ValFinal * Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * 1));
                ArrayDados[i].JuroMes = ArrayDados[i].ValFinal - ArrayDados[t].ValFinal;
                ArrayDados[i].JuroAcumulado = ArrayDados[t].JuroAcumulado + ArrayDados[i].JuroMes;
                if ($("#TempoInc").val() == "Anual") {
                    ArrayDados[i].ValFinal += parseFloat(Anual());
                    ArrayDados[i].IncrementoAcumul = ArrayDados[t].IncrementoAcumul + parseFloat(Anual());
                } else if ($("#TempoInc").val() == "Mensal") {
                    ArrayDados[i].ValFinal += parseFloat(Mensal());
                    ArrayDados[i].IncrementoAcumul = ArrayDados[t].IncrementoAcumul + parseFloat(Mensal());
                } else if ($("#TempoInc").val() == "Semanal") {
                    ArrayDados[i].ValFinal += parseFloat(Semanal());
                    ArrayDados[i].IncrementoAcumul = ArrayDados[t].IncrementoAcumul + parseFloat(Semanal());
                } else if ($("#TempoInc").val() == "Diário") {
                    ArrayDados[i].ValFinal += parseFloat(Diario(i + 1));
                    ArrayDados[i].IncrementoAcumul = ArrayDados[t].IncrementoAcumul + parseFloat(Diario());
                }
            }
        }
    } else {
        //Cálculo para os Mesess
        for (var i = 0; i < tempo; i++) {
            var t = i - 1;
            ArrayDados[i].Tempo = i + 1;
            if (i == 0) {
                ArrayDados[i].ValFinal = ValInicial * Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * (1 / 12)));
                ArrayDados[i].JuroMes = ArrayDados[i].ValFinal - ValInicial;
                ArrayDados[i].JuroAcumulado = ArrayDados[i].JuroAcumulado + ArrayDados[i].JuroMes;
                if ($("#TempoInc").val() == "Anual") {
                    ArrayDados[0].IncrementoAcumul = 0.0;
                    if (i % 12 == 0 && i >= 12) {
                        ArrayDados[i].ValFinal += Anual();
                        ArrayDados[i].IncrementoAcumul = ArrayDados[i].IncrementoAcumul + Anual();
                    } else {
                        ArrayDados[i].IncrementoAcumul = ArrayDados[i].IncrementoAcumul
                    }
                } else if ($("#TempoInc").val() == "Mensal") {
                    ArrayDados[i].ValFinal += Mensal();
                    ArrayDados[i].IncrementoAcumul = ArrayDados[i].IncrementoAcumul + Mensal();
                } else if ($("#TempoInc").val() == "Semanal") {
                    ArrayDados[i].ValFinal += Semanal();
                    ArrayDados[i].IncrementoAcumul = ArrayDados[i].IncrementoAcumul + Semanal();
                } else if ($("#TempoInc").val() == "Diário") {
                    ArrayDados[i].ValFinal += Diario(i + 1);
                    ArrayDados[i].IncrementoAcumul = ArrayDados[i].IncrementoAcumul + Diario();
                }
            } else {
                ArrayDados[i].ValFinal = ArrayDados[t].ValFinal * Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * (1 / 12)));
                ArrayDados[i].JuroMes = ArrayDados[i].ValFinal - ArrayDados[t].ValFinal;
                ArrayDados[i].JuroAcumulado = ArrayDados[t].JuroAcumulado + ArrayDados[i].JuroMes;
                if ($("#TempoInc").val() == "Anual") {
                    ArrayDados[0].IncrementoAcumul = 0.0;
                    if (i % 12 == 0 && i >= 12) {
                        ArrayDados[i].ValFinal += Anual();
                        ArrayDados[i].IncrementoAcumul = ArrayDados[t].IncrementoAcumul + parseFloat(Anual());
                    } else {
                        ArrayDados[i].IncrementoAcumul = ArrayDados[t].IncrementoAcumul
                    }
                } else if ($("#TempoInc").val() == "Mensal") {
                    ArrayDados[i].ValFinal = ArrayDados[i].ValFinal + parseFloat(Mensal());
                    ArrayDados[i].IncrementoAcumul = ArrayDados[i - 1].IncrementoAcumul + parseFloat(Mensal());
                } else if ($("#TempoInc").val() == "Semanal") {
                    ArrayDados[i].ValFinal = ArrayDados[i].ValFinal + parseFloat(Semanal());
                    ArrayDados[i].IncrementoAcumul = ArrayDados[i - 1].IncrementoAcumul + parseFloat(Semanal());
                } else if ($("#TempoInc").val() == "Diário") {
                    ArrayDados[i].ValFinal = ArrayDados[i].ValFinal + parseFloat(Diario(i + 1));
                    ArrayDados[i].IncrementoAcumul = ArrayDados[i - 1].IncrementoAcumul + parseFloat(Diario());
                }
            }
        }
    }

    Retorno = ArrayDados[ArrayDados.length - 1].ValFinal - ValInicial;
    Retorno = Retorno.toFixed(2);

    console.log(ArrayDados);
    escrever();
}

function simulador2() {

    var tempoAtingir = 0.0;
    var MesConvert = 0.0;
    var AnoInt = 0;
    var taux = 0;



    
        tempoAtingir = (Math.log(ValAtingir / ValInicial) / Math.log(2.71828)) / (ValPerJuro * (Math.log(1 + (ValJuro / ValPerJuro) / Math.log(2.71828))));
        taux = tempoAtingir - parseInt(tempoAtingir);
        MesConvert = tempoAtingir - parseInt(tempoAtingir);
        AnoInt = parseInt(tempoAtingir);
    

    //conversão decimal para mês
    if (MesConvert <= 1 / 12) {
        MesConvert = 1;
    } else if (MesConvert <= 2 / 12) {
        MesConvert = 2;
    } else if (MesConvert <= 3 / 12) {
        MesConvert = 3;
    } else if (MesConvert <= 4 / 12) {
        MesConvert = 4;
    } else if (MesConvert <= 5 / 12) {
        MesConvert = 5;
    } else if (MesConvert <= 6 / 12) {
        MesConvert = 6;
    } else if (MesConvert <= 7 / 12) {
        MesConvert = 7;
    } else if (MesConvert <= 8 / 12) {
        MesConvert = 8;
    } else if (MesConvert <= 9 / 12) {
        MesConvert = 9;
    } else if (MesConvert <= 10 / 12) {
        MesConvert = 10;
    } else if (MesConvert <= 11 / 12) {
        MesConvert = 11;
    } else {
        AnoInt += 1;
        MesConvert = 0;
    }

    if (MesConvert == 0) {
        $("#duracao2").val(AnoInt + " anos");
    } else {
        $("#duracao2").val(AnoInt + " anos e " + MesConvert + " meses");
    }

    tempo = (tempoAtingir - taux) + 1;
    console.log(tempo);
    if (tempo >= 1) {
        simulador1();
    } else {
        tempo = 1;
        simulador1();
    }
}

function simulador3() {
    debugger;
    ValInicial = ValAtingir / Math.pow((1 + (ValJuro / ValPerJuro)), (ValPerJuro * tempo));

    $("#ValInicial3").val(ValInicial.toFixed(2));
    ValInicial = parseFloat(ValInicial).toFixed(2);
    simulador1();
}

function escrever() {
    if (($("#calculadora2").hasClass("d-none") && $("#calculadora3").hasClass("d-none"))) {
        $("#simulador1-result").removeClass("d-none");
        $("#simulador1-result1").removeClass("d-none");
        $("#simulador2-result").addClass("d-none");
        $("#simulador3-result").addClass("d-none");
    } else {
        if (($("#calculadora1").hasClass("d-none") && $("#calculadora3").hasClass("d-none"))) {
            $("#simulador2-result").removeClass("d-none");
            $("#simulador1-result").addClass("d-none");
            $("#simulador1-result1").addClass("d-none");
            $("#simulador3-result").addClass("d-none");
        } else
        if (($("#calculadora1").hasClass("d-none") && $("#calculadora2").hasClass("d-none"))) {

            $("#simulador3-result").removeClass("d-none");
            $("#simulador1-result").addClass("d-none");
            $("#simulador1-result1").addClass("d-none");
            $("#simulador2-result").addClass("d-none");
        }
    }
    

    $("#ValFinal").val(ArrayDados[ArrayDados.length - 1].ValFinal.toFixed(2));
    $("#Retorno").val(Retorno);

    // Array do Valor Eixo Y
    //Reset/Declaração do Array
    if (eixoY.length != 0) { eixoY.length = 0; }

    // atribuição de Valores ao eixoY. No caso de ser Anos faz a Conversão para meses
    eixoY[0] = parseFloat(ValInicial);
    if ($("#TempoJuros").val() == "Meses") {
        for (var i = 0; i < ArrayDados.length; i++) {
            eixoY[i + 1] = ArrayDados[i].ValFinal.toFixed(2);
        }
    } else if ($("#TempoJuros").val() == "Anos" || $("#calculadora2").hasClass("d-none") == false) {
        var aux = 0.0;
        for (var i = 0; i < tempo; i++) {
            aux = parseFloat((ArrayDados[i].JuroMes + ArrayDados[0].IncrementoAcumul) / 12);
            for (var j = 12; j > 0; j--) {
                var m = ((i + 1) * 12) - j;
                eixoY[m + 1] = parseFloat(eixoY[m]) + aux;
            }
        }
        for (i = 0; i < eixoY.length; i++) {
            eixoY[i] = (eixoY[i]).toFixed(2)
        }
    }
    console.log(eixoY);

    //Arredondar os valores de ArrayDados a decimal para inserir na tabela
    for (i = 0; i < ArrayDados.length; i++) {
        ArrayDados[i].ValFinal = ArrayDados[i].ValFinal.toFixed(2);
        ArrayDados[i].JuroAcumulado = ArrayDados[i].JuroAcumulado.toFixed(2);
        ArrayDados[i].JuroMes = ArrayDados[i].JuroMes.toFixed(2);
        ArrayDados[i].IncrementoAcumul = ArrayDados[i].IncrementoAcumul.toFixed(2);
    }

    //tabela
    var $tabela = $("#resetTabela");
    //Preenchimento da tabela
    $(function() {
        $tabela.bootstrapTable({ data: ArrayDados })
        $tabela.bootstrapTable('load', ArrayDados);
    })

    if ($("#TempoJuros").val() == "Meses") {
        $("#PerTabela").text("Mes");
    }

    //reset EixoX Nao funciona como deve
    ArrayEixoX.length = 0;


    var options = {
        series: [{
                name: "Valor Acumulado",
                data: eixoY
            },
            {
                name: "Valor Investido",
                data: valorInicial()
            }
        ],
        chart: {
            height: 350,
            width: "100%",
            type: 'line',
            zoom: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Gráfico Investimento',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        legend: {
            position: 'top'
        },
        xaxis: {
            categories: ArrayEixoX,
            title: {
                text: 'Meses',
            },
        },
        legend: {
            position: 'top'
        },
        yaxis: {
            title: {
                text: 'Valor (€)'
            }
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function(y) {
                    if (typeof y !== "undefined") {
                        return y + " €";
                    }
                    return y;

                }
            }
        }
    };
    if (chart != null) {
        chart.destroy();
    }
    chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

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
        }
        return parseFloat(IncremIntermed);
    }
}

//funcao que converte anos em meses
function anoMes() {
    tempo2 = tempo * 12;
    console.log(tempo2);
    ArrayEixoX[0] = 0;
    for (var i = 1; i < tempo2 + 1; i++) {
        ArrayEixoX[i] = i;

    }
    return tempo2;
}

//Valor inicial
var valor = new Array();

function valorInicial() {
    var cont;
    valor.length = 0;
    valor[0] = ValInicial;
    if ($("#TempoJuros").val() == "Anos" || $("#calculadora2").hasClass("d-none") == false) {
        for (cont = 0; cont < anoMes(); cont++) {
            if ($("#TempoInc").val() == "Anual") {
                IncrementoAcumul = Anual();
            } else if ($("#TempoInc").val() == "Mensal") {
                IncrementoAcumul = Mensal();
            } else if ($("#TempoInc").val() == "Semanal") {
                IncrementoAcumul = Semanal();
            } else if ($("#TempoInc").val() == "Diário") {
                IncrementoAcumul = Diario();
            }
            valor[cont + 1] = (parseFloat(ValInicial) + ((cont + 1) * (IncrementoAcumul / 12))).toFixed(2);
        }
    } else {
        ArrayEixoX[0] = 0
        for (cont = 0; cont < tempo; cont++) {
            for (var i = 1; i < tempo + 1; i++) {
                ArrayEixoX[i] = i;
            }
            if ($("#TempoInc").val() == "Anual") {
                IncrementoAcumul = Anual() / 12;
            } else if ($("#TempoInc").val() == "Mensal") {
                IncrementoAcumul = Mensal();
            } else if ($("#TempoInc").val() == "Semanal") {
                IncrementoAcumul = Semanal();
            } else if ($("#TempoInc").val() == "Diário") {
                IncrementoAcumul = Diario();
            }
            valor[cont + 1] = (parseFloat(ValInicial) + ((cont + 1) * IncrementoAcumul)).toFixed(2);
        }
    }
    return valor;
}

//Exportação excell
function ExportarExcel() {
    var table = document.getElementById('resetTabela');
    var html1 = table.outerHTML;
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html1));
}

//exportação PDF
function ExportarPDF() {
    var doc = new jsPDF()
    doc.autoTable({ html: '#resetTabela' })
    alturaPagina = doc.internal.pageSize.height;
    y = 500
    if (y >= alturaPagina) {
        doc.addPage();
        y = 0
    }

    chart.dataURI().then(({ imgURI, }) => {
        doc.addImage(imgURI, 'PNG', 15, 15, 180, 90);
        doc.save("JurosCompostos.PDF")
    })
}

//botão suporte
function openForm() {
    document.getElementById("myForm").style.display = "block";

}

function closeForm() {
    document.getElementById("myForm").style.display = "none";


}

//slider onde investir
/* Setting the default slide start index: */
let slideIndex = 1;
/* We call the function that is implemented below: */
showSlides(slideIndex);
/* Increase the index by 1 - show the next slide: */
function nextSlide() {
    showSlides(slideIndex += 1);
}
/* Decrease the index by 1 - show the previous slide: */
function previousSlide() {
    showSlides(slideIndex -= 1);
}
/* Set the current slide: */
function currentSlide(n) {
    showSlides(slideIndex = n);
}
/* Flip function: */
function showSlides(n) {
    let i;
    /* We refer to the elements with the class name "item", that is, to the pictures: */
    let slides = document.getElementsByClassName("item");

    /* Checking the number of slides: */
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }

    /* Loop through each slide in a for loop: */
    for (let slide of slides) {
        slide.style.display = "none";
    }
    /* Making an element block: */
    slides[slideIndex - 1].style.display = "block";
}
//intervalo tempo do slider
setInterval(nextSlide, 5000);