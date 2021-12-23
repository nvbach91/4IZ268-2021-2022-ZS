$(document).ready(() => {
    const spellClassForm = $('#spell-class-form');
    const spellLevelForm = $('#spell-level-form');
    
    const spellForm = $('#spell-form');
    const spellsNameInput = $('input[name="spells-name"]');
        
    const spellNamesList = $('#spell-names-list');
    const spellCards = $('#spell-cards');
    const getSpellList = $('#long-rest');

    spellForm.submit((e) => {
        e.preventDefault();
        createSpellCard();
        console.log(spellsNameInput.val());
    });
    
    const createSpellCard = (spell) => {
        const spellCard = $('<div>');
        spellCard.addClass('spell');
        $.getJSON('https://www.dnd5eapi.co/api/spells/' + spellsNameInput.val()).done((resp) => {
            console.log(resp);
            spellCard.text(JSON.stringify(resp));
        });
        spellCards.append(spellCard);
    };

    spellClassForm.submit((e) => {
        e.preventDefault();
        var chosenClass = $('#dnd-class').find(":selected").text();
        $.getJSON('https://www.dnd5eapi.co/api/classes/' + chosenClass + '/spells').done((resp) => {
            console.log(resp);});
    });

    spellLevelForm.submit((e) => {
        e.preventDefault();
        var chosenLevel = $('#spell-level').find(":selected").text();
        $.getJSON('https://www.dnd5eapi.co/api/spells?level=' + chosenLevel).done((resp) => {
            console.log(resp);});
    });

    getSpellList.click(() => {
        console.log("long rest");
    });
});