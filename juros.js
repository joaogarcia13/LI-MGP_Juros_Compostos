//Notas: A calculadora está a funcionar da maneira mais simples mas ainda falta
//adicionar as periodicidades de juro e os incrementos

var ValFinal;
var ValInicial;
var Retorno;
var tempo;
var ValJuro;
var ValPerJuro = 1; //numero de vezes que o juro é aplicado por ano, esta default para 1 vez por ano//
var ValIncremento; //Incremento opcional//
var ValPerIncremento; //periodicidade do incremento//

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
    console.log(ValPerJuro)
    ValIncremento = $("#incremento").val();
    ValPerIncremento = $("#perincremento").val();

    //verifica se os valores sao positivos
    if (ValInicial <= 0 || tempo <= 0 || ValJuro <= 0 ||
        ValPerJuro <= 0 && ValIncremento <= 0 && ValPerIncremento <= 0) {
        alert("Verifique se todos os valores são positivos.");
    } else
    //verifica se são numeros
    if ($.isNumeric(ValInicial) && $.isNumeric(tempo) &&
        $.isNumeric(ValJuro) && $.isNumeric(ValPerJuro) &&
        $.isNumeric(ValIncremento) && $.isNumeric(ValPerIncremento)) {
        console.log("Os inputs são numeros.")

        calcular();
    } else alert("Os campos têm de ser preenchidos com valores numéricos.");
}


//Cálculos e aparece os gráficos (esta função está dentro da função validate())
function calcular() {
    //função de calculos 
    ValFinal = ValInicial * Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * tempo));
    Retorno = ValFinal - ValInicial;

    // Loop de cálculos

    // Loop de cálculos
    //if ($("#TempoJuros").val() == "Anos") {
    //    $("#tabela").text() = "<th><td>Ano</td><td>Juros por Mês</td><td>Juros Acumulados</td><td>Montante Acumulado</td></th>";
    //} else {
    //    $("#tabela").text() = "<th><td>Meses</td><td>Juros por Mês</td><td>Juros Acumulados</td><td>Montante Acumulado</td></th>";
    //}

    function anoMes() {
        var tempo2;
        if ($("#TempoJuros").val() == "Anos") {
            tempo2 = tempo * 12;
            console.log(tempo2);
        } else {
            tempo2 = tempo * 12;
            console.log(tempo2);
        }
        return tempo2;
    }

    //EixoX
    function eixoX() {
        var cont, duracao = new Array(anoMes());

        for (cont = 0; cont <= anoMes(); cont++) {
            duracao[cont] = cont;
        }

        return duracao;
    }

    //Gráfico de linha 
    var ctx = document.getElementById('myChart').getContext('2d');
    var linhaInvest = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: eixoX(),
            datasets: [{
                    label: 'Inv. Inicial',
                    backgroundColor: 'transparent',
                    borderColor: 'blue',
                    data: [20, 20, 20, 20, 20, 20]

                },
                {
                    label: 'Acumulado',
                    backgroundColor: 'transparent',
                    borderColor: 'red',
                    data: [20, 30, 50, 60, 70, 80]
                }
            ]
        },

        // Configuration options go here
        options: {}
    });

    $("#ValFinal").val(ValFinal.toFixed(2));
    $("#Retorno").val(Retorno.toFixed(2));
    $("#tabGraf").removeClass("d-none");

}