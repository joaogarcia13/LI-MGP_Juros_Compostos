var tempo = 12;

function anoMes() {
    var meses, ano;

    //Converte mês para ano
    //Variavel tempo vai receber o valor de tempo introduzido pelo utilizador
    meses = tempo * 12;

    //Converte ano para mês
    ano = tempo / 12;

    //Chamar o id corresponden-te e introduzir o valor (casa)
}

function linhaTempo() {
    var cont, tempo = new Array();

    for (cont = 0; cont <= meses; cont++) {
        tempo += cont;
    }

    return tempo;
}

var ctx = document.getElementById('tabelaLinear').getContext('2d');
var chart = new Chart(tx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: linhaTempo(),
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },

    // Configuration options go here
    options: {}
});