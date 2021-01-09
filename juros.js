//Notas: A calculadora está a funcionar da maneira mais simples mas ainda falta
//adicionar as periodicidades de juro e os incrementos

var ValFinal;
var ValInicial;
var Retorno;
var tempo;
var Valuro; //tem de ser decimal//
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
}

//validação de dados para a função calcular()
function validate() {
    ValInicial = $("#valorInitial").val();
    tempo = $("#tempo").val();
    ValJuro = $("#juro").val();
    ValPerJuro = $("#periodo").val();
    //verifica se os valores sao positivos
    if (ValInicial < 0 || tempo < 0 || ValJuro < 0 || ValPerJuro < 0) {
        alert("Verifique se todos os valores são positivos.");
    } else
    //verifica se são numeros
    if ($.isNumeric(ValInicial) && $.isNumeric(tempo) &&
        $.isNumeric(ValJuro) && $.isNumeric(ValPerJuro)) {
        console.log("Os inputs são numeros.")
    } else alert("Os campos têm de ser preenchidos com valores numéricos.");
}

//botao calcular
function calcular() {
    validate();
    ValFinal = Math.pow(ValInicial * (1 + (ValJuro / ValPerJuro)), tempo);
    Retorno = ValFinal - ValInicial;
    $("#ValFinal").val(ValFinal);
    $("#Retorno").val(Retorno);
}

function anoMes() {
    var meses, ano;
    
    //Converte mês para ano
    //Variavel tempo vai receber o valor de tempo introduzido pelo utilizador
    meses = tempo * 12;

    //Converte ano para mês
    ano = tempo / 12;

    //Chamar o id corresponden-te e introduzir o valor (casa)
}

//Escala da tabela
function linhaTempo() {
    var cont, tempo = new Array();

    for (cont = 0; cont <= meses; cont++) {
        tempo[cont] += cont;
    }

    return tempo;
}

//Gráfico de linha 
var ctx = document.getElementById('myChart').getContext('2d');
var myLineChart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [{
            label: 'Valor',
            backgroundColor: 'transparent',
            borderColor: 'black',
            data: [50, 6, 35, 2, 3, 4]
        }]
    },

    // Configuration options go here
    options: {}
});