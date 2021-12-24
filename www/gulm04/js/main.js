$('#create-txt').click(function () {
    $('#btn-box').hide();
    $('#create-txt-box').show();
});

$('#hlw').click(function () {
    $('form').show();
    $('#submit').click(function () {
        $('form').hide();
        $('#create-txt-box').hide();
        var nameFrom = $('#from').val();
        var nameTo = $('#to').val();
        var congratBox = $('<p/>', {
            html: 'From ' + nameFrom + ' happy halloween to ' + nameTo,
            'class': 'congratsBox'
        });
        var twitterBtn = $('<button/>', {
            html: 'SHARE ON TWITTER',
            'class': 'btn'
        });
        congratBox.appendTo('body');
        twitterBtn.appendTo('body');
    });
    
});
$('#xmas').click(function () {
    $('form').show();
    $('#submit').click(function () {
        $('form').hide();
        $('#create-txt-box').hide();
        var nameFrom = $('#from').val();
        var nameTo = $('#to').val();
        var congratBox = $('<p/>', {
            html: 'From ' + nameFrom + ' MARRY CHRISTMAS to ' + nameTo,
            'class': 'congratsBox'
        });
        var twitterBtn = $('<button/>', {
            html: 'SHARE ON TWITTER',
            'class': 'btn'
        });
        congratBox.appendTo('body');
        twitterBtn.appendTo('body');
    });
});
$('#bday').click(function () {
    $('form').show();
    $('#submit').click(function () {
        $('form').hide();
        $('#create-txt-box').hide();
        var nameFrom = $('#from').val();
        var nameTo = $('#to').val();
        var congratBox = $('<p/>', {
            html: 'From ' + nameFrom + ' HAPPY BIRTHDAY to ' + nameTo,
            'class': 'congratsBox'
        });
        var twitterBtn = $('<button/>', {
            html: 'SHARE ON TWITTER',
            'class': 'btn'
        });
        congratBox.appendTo('body');
        twitterBtn.appendTo('body');
    });
});
$('#thx').click(function () {
    $('form').show();
    $('#submit').click(function () {
        $('form').hide();
        $('#create-txt-box').hide();
        var nameFrom = $('#from').val();
        var nameTo = $('#to').val();
        var congratBox = $('<p/>', {
            html: 'From ' + nameFrom + ' HAPPY THANKSGIVING DAY to ' + nameTo,
            'class': 'congratsBox'
        });
        var twitterBtn = $('<button/>', {
            html: 'SHARE ON TWITTER',
            'class': 'btn'
        });
        congratBox.appendTo('body');
        twitterBtn.appendTo('body');
    });
});

