//Nota: É preciso fazer uma funçao on change para quando os campos forem alterados sem usar o botao limpar ele nao 
//imprimir duas tabelas

// Nota2: O site ta a demorar bue a fazer load e enquanto o load nao esta completo ele nao corre o validate()
//acho que tem a ver com o jquery estar com problemas quando estava a fazer o tabela

var ValFinal = 0;
var ValInicial = 0;
var Retorno = 0; 
var tempo = 0;  
var ValJuro = 0; // valor do juro
var ValPerJuro = 1; //numero de vezes que o juro é aplicado por ano, esta default para 1 vez por ano//
var ValIncremento = 0; //Incremento opcional//
var ValPerIncremento = 0; //periodicidade do incremento//
var Valor1 = 0; // Valor intermedio no calculo do juro do primeiro ano
var ValIntermedio = 0;  // valor intermedio no loop
var JuroMes = 0; // valor tabela do Juro ganho por ano/mes
var JuroAcumulado = 0; // valor tabela juros acumulados 


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
        console.log("Os inputs são numeros.");
        calcular();

    } else alert("Os campos têm de ser preenchidos com valores numéricos.");
}


//Cálculos e aparece os gráficos (esta função é chamada dentro da função validate())
function calcular() {

    //reset da tabela e dos valores Finais e Retorno
    document.getElementById("resetTabela").innerHTML = "<thead><tr><th scope='col' id='PerTabela'>Anos</th>" +
    "<th scope='col' id='PerTabela2'>Juros por Mês</th><th scope='col'>Juros Acumulados</th>" +
    "<th scope='col'>Montante Acumulado</th></tr></thead><tbody id='tabela'></tbody>";
    ValFinal = 0; 
    Retorno = 0; 
    JuroAcumulado = 0;

    // Cálculos e tabela
    //Se for escolhido anos
    if ($("#TempoJuros").val() == "Anos") {
        $("#PerTabela").text("Ano");
        $("#PerTabela2").text("Juro por Ano");
        
        //Calculo Primeiro ano
        Valor1 = parseFloat(ValInicial) * parseFloat(Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * 1)));
        JuroMes = Valor1 - ValInicial;
        ValFinal += Valor1;
        JuroAcumulado += JuroMes;

        //preenchimento da primeira fila da tabela
        document.getElementById("tabela").innerHTML += "<tr><td>" + "1" + "</td><td>" + JuroMes.toFixed(2) + " €"
            + "</td><td>" + JuroAcumulado.toFixed(2) + " €" + "</td><td>" + ValFinal.toFixed(2) + " €" + "</td></tr>"
        
            //Loop para os anos seguintes
        for (var i = 0; i < tempo - 1; i++) {
            var t = i + 2;
            ValIntermedio = parseFloat(ValFinal) * parseFloat(Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * 1)));
            JuroMes = ValIntermedio - ValFinal;
            JuroAcumulado += JuroMes;
            ValFinal = ValIntermedio;

            //Preenchimento da tabela
            document.getElementById("tabela").innerHTML += "<tr><td>" + t + "</td><td>" + JuroMes.toFixed(2) + " €"
            + "</td><td>" + JuroAcumulado.toFixed(2) + " €" + "</td><td>" + ValFinal.toFixed(2) + " €" + "</td></tr>"

        }
        Retorno = ValFinal - ValInicial;
    } else {
        $("#PerTabela").text("Meses");
        $("#PerTabela2").text("Juro por Mês");
        
        //Calculo Primeiro Mês
        Valor1 = parseFloat(ValInicial) * parseFloat(Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * (1/12))));
        JuroMes = Valor1 - ValInicial;
        ValFinal += Valor1;
        JuroAcumulado += JuroMes;

        //var eixoY = new Array(tempo);
        //eixoY[0] = ValFinal.toFixed(2);

        //preenchimento da primeira fila da tabela
        document.getElementById("tabela").innerHTML += "<tr><td>" + "1" + "</td><td>" + JuroMes.toFixed(2) + " €"
            + "</td><td>" + JuroAcumulado.toFixed(2) + " €" + "</td><td>" + ValFinal.toFixed(2) + " €" + "</td></tr>"
        

            //Loop para os meses seguintes
        for (var i = 0; i < tempo - 1; i++) {
            var t = i + 2;
            ValIntermedio = parseFloat(ValFinal) * parseFloat(Math.pow(1 + (ValJuro / ValPerJuro), (ValPerJuro * (1/12))));
            JuroMes = ValIntermedio - ValFinal;
            JuroAcumulado += JuroMes;
            ValFinal = ValIntermedio;
            console.log("oi");
            //eixoY[i+1] = ValFinal.toFixed(2);

            //Preenchimento da tabela
            document.getElementById("tabela").innerHTML += "<tr><td>" + t + "</td><td>" + JuroMes.toFixed(2) + " €"
            + "</td><td>" + JuroAcumulado.toFixed(2) + " €" + "</td><td>" + ValFinal.toFixed(2) + " €" + "</td></tr>";
            console.log("oi");
        }
        Retorno = ValFinal - ValInicial;
        //console.log(eixoY);
    }

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

    //Valor inicial
    function valorInicial() {
        var cont, valor = new Array(anoMes());

        for (cont = 0; cont <= anoMes(); cont++) {
            valor[cont] = cont
        }
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
                    data: [20, 30, 50, 60, 70, 80, 32]
                }
            ]
        },

        // Configuration options go herealorInicial
        options: {}
    });

    $("#ValFinal").val(ValFinal.toFixed(2));
    $("#Retorno").val(Retorno.toFixed(2));
    $("#tabGraf").removeClass("d-none");

}