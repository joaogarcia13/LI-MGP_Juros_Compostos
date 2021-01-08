var ValFinal;
var ValInicial;
var tempo = document.getElementById("duracao").value;
var Valjuro; //tem de ser decimal//
var ValPerJuro; //numero de vezes que o juro é aplicado por ano//
var ValIncremento; //Incremento opcional//
var ValPerIncremento; //periodicidade do incremento//

function anoMes() {
    var meses, ano;

    //Converte mês para ano
    //Variavel tempo vai receber o valor de tempo introduzido pelo utilizador
    meses = tempo * 12;
    console.log(meses);
    //Converte ano para mês
    ano = tempo / 12;
    console.log(ano);
    //Chamar o id corresponden-te e introduzir o valor (casa)
}

//Escala da tabela
function linhaTempo() {
    var cont, tempo = new Array();

    for (cont = 0; cont <= meses; cont++) {
        tempo += cont;
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