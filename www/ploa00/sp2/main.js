$(document).ready(() => {
    function repeat(string, numberOfRepeats) {
        let result = "";
        for (let i = 0; i < numberOfRepeats; i++) {
            result += string
        }
        const superResult = result + result.length
        return result + superResult.length;
    }

    const x = repeat("Accio!", 3)

    
    const body =  $("body");

    body.append('<h1>Nadpis</h1>')
    body.append('<label for= "label">String</label>')
    body.append('<input type="text" id="string">')
    body.append('<label for= "label">Number</label>')
    body.append('<input type="text" id="number">')
    body.append('<button id="button">Click me</button>')
    body.append('<p id= "paragraph"></p>')
    body.append('<p id= "result"></p>')

    const string = $('#string');
    const number = $('#number');

    $(`#button`).on('click', function (){ 
        repeat(string.val(), number.val());
        const y = repeat(string.val(), number.val());
        $('#paragraph').append(y);
        $.post("https://api.ceny24.cz/4iz268", {
            id: 4629,
            input1: string.val(),
            input2: number.val(),
            output: y,
        }, function (result) {
            $('#result').append(result);
            console.log(result)
        });
    });
 
    

});

