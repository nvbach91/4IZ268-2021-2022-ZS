/* Aplikace pro vytváření karet s kouzly pro hru Dungeons&Dragons (5. edici).
Aplikace umožňuje vygenerovat seznam kouzel buďto podle levelu potřebného k seslání
nebo podle povolání hráčské postavy. Ze seznamu lze následně vygenerovat kartičky
zvolených kouzel a s těmi dále manipulovat ("použít kouzlo" - akce odebírá Spell Slot,
"použít kouzlo jako rituál" - objeví se pouze oznámení, že bylo kouzlo použito,
Spell Slot se neubírá a odstranit kartičku).
Hráč si může vygenerovat počet Spell Slotů - počet kouzel, které může od dané úrovně seslat.
Tlačítko "Long Rest" obnoví Spell Sloty na původní hráčem zvolenou úroveň.
*/

$(document).ready(() => {
    if (localStorage.getItem('spellCardIndexes') === null) {
        localStorage.setItem('spellCardIndexes', '[]');
    }

    const spellClassForm = $('#spell-class-form');
    const spellLevelForm = $('#spell-level-form');

    const spellForm = $('#spell-form');
    const spellsNameInput = $('input[name="spells-name"]');

    const spellNamesList = $('#spell-names-list');
    const spellCards = $('#spell-cards');
    const longRestButton = $('#long-rest');
    const removeAllSpellsButton = $('#remove-all-spells');
    const removeSpellOptionsButton = $('#remove-spell-options');

    const spellSlotsForm = $('#spell-slots-form');
    const levelOneSpellSlots = $('#level-one-spells');
    const levelTwoSpellSlots = $('#level-two-spells');
    const levelThreeSpellSlots = $('#level-three-spells');
    const levelFourSpellSlots = $('#level-four-spells');
    const levelFiveSpellSlots = $('#level-five-spells');
    const levelSixSpellSlots = $('#level-six-spells');
    const levelSevenSpellSlots = $('#level-seven-spells');
    const levelEightSpellSlots = $('#level-eigth-spells');
    const levelNineSpellSlots = $('#level-nine-spells');

    if (localStorage.getItem('levelOneSpellSlots') === null) {
        localStorage.setItem('levelOneSpellSlots', levelOneSpellSlots.text());
        localStorage.setItem('levelTwoSpellSlots', levelTwoSpellSlots.text());
        localStorage.setItem('levelThreeSpellSlots', levelThreeSpellSlots.text());
        localStorage.setItem('levelFourSpellSlots', levelFourSpellSlots.text());
        localStorage.setItem('levelFiveSpellSlots', levelFiveSpellSlots.text());
        localStorage.setItem('levelSixSpellSlots', levelSixSpellSlots.text());
        localStorage.setItem('levelSevenSpellSlots', levelSevenSpellSlots.text());
        localStorage.setItem('levelEightSpellSlots', levelEightSpellSlots.text());
        localStorage.setItem('levelNineSpellSlots', levelNineSpellSlots.text());
    }


    const loadingSpinner = $('#spinner').hide();
    const existingSpellCards = [];

    $(document).ajaxStart(function () {
        loadingSpinner.show();
    })
        .ajaxStop(function () {
            loadingSpinner.hide();
        })

    removeAllSpellsButton.click(() => {
        spellCards.empty();
        spellNamesList.empty();
        existingSpellCards.length = 0;
        localStorage.setItem('spellCardIndexes', '[]');
    });

    removeSpellOptionsButton.click(() => {
        spellNamesList.empty();
    });

    spellSlotsForm.submit((e) => {
        e.preventDefault();
        createSpellsSlots();
    });

    longRestButton.click((e) => {
        console.log("long rest");
        e.preventDefault();
        createSpellsSlots();
    });

    const createSpellsSlots = () => {
        const levelOneSpellSlotValue = $('input[name="level-one-spell-slots"]').val();
        const levelTwoSpellSlotValue = $('input[name="level-two-spell-slots"]').val();
        const levelThreeSpellSlotValue = $('input[name="level-three-spell-slots"]').val();
        const levelFourSpellSlotValue = $('input[name="level-four-spell-slots"]').val();
        const levelFiveSpellSlotValue = $('input[name="level-five-spell-slots"]').val();
        const levelSixSpellSlotValue = $('input[name="level-six-spell-slots"]').val();
        const levelSevenSpellSlotValue = $('input[name="level-seven-spell-slots"]').val();
        const levelEightSpellSlotValue = $('input[name="level-eight-spell-slots"]').val();
        const levelNineSpellSlotValue = $('input[name="level-nine-spell-slots"]').val();

        levelOneSpellSlots.text(levelOneSpellSlotValue);
        levelTwoSpellSlots.text(levelTwoSpellSlotValue);
        levelThreeSpellSlots.text(levelThreeSpellSlotValue);
        levelFourSpellSlots.text(levelFourSpellSlotValue);
        levelFiveSpellSlots.text(levelFiveSpellSlotValue);
        levelSixSpellSlots.text(levelSixSpellSlotValue);
        levelSevenSpellSlots.text(levelSevenSpellSlotValue);
        levelEightSpellSlots.text(levelEightSpellSlotValue);
        levelNineSpellSlots.text(levelNineSpellSlotValue);

        localStorage.setItem('levelOneSpellSlots', levelOneSpellSlots.text());
        localStorage.setItem('levelTwoSpellSlots', levelTwoSpellSlots.text());
        localStorage.setItem('levelThreeSpellSlots', levelThreeSpellSlots.text());
        localStorage.setItem('levelFourSpellSlots', levelFourSpellSlots.text());
        localStorage.setItem('levelFiveSpellSlots', levelFiveSpellSlots.text());
        localStorage.setItem('levelSixSpellSlots', levelSixSpellSlots.text());
        localStorage.setItem('levelSevenSpellSlots', levelSevenSpellSlots.text());
        localStorage.setItem('levelEightSpellSlots', levelEightSpellSlots.text());
        localStorage.setItem('levelNineSpellSlots', levelNineSpellSlots.text());
    }

    const getSavedSpells = (storedSpells) => {
        for (let i = 0; i < storedSpells.length; i++) {
            const spellIndex = storedSpells[i];
            renderSpell(spellIndex);
        }

    };

    spellForm.submit((e) => {
        e.preventDefault();
        const spellIndex = spellsNameInput.val().trim();
        if (existingSpellCards.indexOf(spellIndex) === -1) {
            renderSpell(spellIndex);
        } else {
            console.log("Spell card already exists.")
        }

        console.log(existingSpellCards);
    });

    const renderSpell = (spellIndex) => {
        $.getJSON('https://www.dnd5eapi.co/api/spells/' + spellIndex).done((resp) => {
            existingSpellCards.push(spellIndex);
            const spellData = {
                index: resp.index,
                name: resp.name,
                level: resp.level,
                description: resp.desc,
                range: resp.range,
                higher_level: resp.higher_level,
                ritual: resp.ritual,
                casting_time: resp.casting_time,
                duration: resp.duration,
                components: resp.components,
            }
            createSpellCard(spellData);
            localStorage.setItem('spellCardIndexes', JSON.stringify(existingSpellCards));
        });
    }

    const castSpell = (castingLevel) => {
        console.log(castingLevel);
        if (parseInt(castingLevel) === 1) {
            if (parseInt(levelOneSpellSlots.text()) === 0) {
                console.log("no available spell slots for this level");
            } else {
                const spellSlotsUpdate = parseFloat(levelOneSpellSlots.text() - 1);
                levelOneSpellSlots.text(spellSlotsUpdate);
                localStorage.setItem('levelOneSpellSlots', levelOneSpellSlots.text());
            }
        }
        if (parseInt(castingLevel) === 2) {
            if (parseInt(levelTwoSpellSlots.text()) === 0) {
                console.log("no available spell slots for this level");
            } else {
                const spellSlotsUpdate = parseFloat(levelTwoSpellSlots.text() - 1);
                levelTwoSpellSlots.text(spellSlotsUpdate);
                localStorage.setItem('levelTwoSpellSlots', levelTwoSpellSlots.text());
            }
        }
        if (parseInt(castingLevel) === 3) {
            if (parseInt(levelThreeSpellSlots.text()) === 0) {
                console.log("no available spell slots for this level");
            } else {
                const spellSlotsUpdate = parseFloat(levelThreeSpellSlots.text() - 1);
                levelThreeSpellSlots.text(spellSlotsUpdate);
                localStorage.setItem('levelThreeSpellSlots', levelThreeSpellSlots.text());
            }
        }
        if (parseInt(castingLevel) === 4) {
            if (parseInt(levelThreeSpellSlots.text()) === 0) {
                console.log("no available spell slots for this level");
            } else {
                const spellSlotsUpdate = parseFloat(levelFourSpellSlots.text() - 1);
                levelFourSpellSlots.text(spellSlotsUpdate);
                localStorage.setItem('levelFourSpellSlots', levelFourSpellSlots.text());
            }
        }
        if (parseInt(castingLevel) === 5) {
            if (parseInt(levelFiveSpellSlots.text()) === 0) {
                console.log("no available spell slots for this level");
            } else {
                const spellSlotsUpdate = parseFloat(levelFiveSpellSlots.text() - 1);
                levelFiveSpellSlots.text(spellSlotsUpdate);
                localStorage.setItem('levelFiveSpellSlots', levelFiveSpellSlots.text());
            }
        }
        if (parseInt(castingLevel) === 6) {
            if (parseInt(levelSixSpellSlots.text()) === 0) {
                console.log("no available spell slots for this level");
            } else {
                const spellSlotsUpdate = parseFloat(levelSixSpellSlots.text() - 1);
                levelSixSpellSlots.text(spellSlotsUpdate);
                localStorage.setItem('levelSixSpellSlots', levelSixSpellSlots.text());
            }
        }
        if (parseInt(castingLevel) === 7) {
            if (parseInt(levelSevenSpellSlots.text()) === 0) {
                console.log("no available spell slots for this level");
            } else {
                const spellSlotsUpdate = parseFloat(levelSevenSpellSlots.text() - 1);
                levelSevenSpellSlots.text(spellSlotsUpdate);
                localStorage.setItem('levelSevenSpellSlots', levelSevenSpellSlots.text());
            }
        }
        if (parseInt(castingLevel) === 8) {
            if (parseInt(levelEightSpellSlots.text()) === 0) {
                console.log("no available spell slots for this level");
            } else {
                const spellSlotsUpdate = parseFloat(levelEightSpellSlots.text() - 1);
                levelEightSpellSlots.text(spellSlotsUpdate);
                localStorage.setItem('levelEightSpellSlots', levelEightSpellSlots.text());
            }
        }
        if (parseInt(castingLevel) === 9) {
            if (parseInt(levelNineSpellSlots.text()) === 0) {
                console.log("no available spell slots for this level");
            } else {
                const spellSlotsUpdate = parseFloat(levelNineSpellSlots.text() - 1);
                levelNineSpellSlots.text(spellSlotsUpdate);
                localStorage.setItem('levelNineSpellSlots', levelNineSpellSlots.text());
            }
        }
    };

    const createSpellCard = (spell) => {
        const spellCard = $('<div>');
        spellCard.addClass('spell-card');

        const spellName = $('<div>');
        spellName.addClass('spell-name');
        spellName.text(spell.name);

        const spellLevel = $('<div>');
        spellLevel.addClass('spell-level');
        spellLevel.text(`Level: ${spell.level}`);

        const spellDecription = $('<div>');
        spellDecription.addClass('spell-description');
        spellDecription.text(spell.description);

        const spellCastingTime = $('<div>');
        spellCastingTime.addClass('spell-casting-time');
        spellCastingTime.text(`Casting time: ${spell.casting_time}`);

        const spellRange = $('<div>');
        spellRange.addClass('spell-range');
        spellRange.text(`Range: ${spell.range}`);

        const spellComponents = $('<div>');
        spellComponents.addClass('spell-components');
        spellComponents.text(`Components: ${spell.components}`);

        const spellDuration = $('<div>');
        spellDuration.addClass('spell-duration');
        spellDuration.text(`Duration: ${spell.duration}`);

        const spellAtHigherLevel = $('<div>');
        spellAtHigherLevel.addClass('spell-at-higher-level');
        spellAtHigherLevel.text(`At higher level: ${spell.higher_level}`);

        const castSpellForm = $('<form>');
        castSpellForm.addClass('cast-spell-form');
        castSpellForm.append('<button> Cast at level:');
        const castSpellFormInput = $('<input type=number class="number-input" min=0 max=9>').attr({
            name: spell.name,
        })
        castSpellFormInput.addClass('cast-spell-form-input');
        castSpellForm.append(castSpellFormInput);
        castSpellForm.submit((e) => {
            e.preventDefault();
            castingLevel = $(castSpellFormInput).val();
            const levelToCast = spell.level;
            if (castingLevel >= levelToCast) {
                castSpell(castingLevel);
            } else {
                console.log("You can't cast at a level below the spell level!");
            }
        });

        spellCard.append(spellName);
        spellCard.append(spellLevel);

        if (spell.level != 0) {
            spellCard.append(castSpellForm);
        }


        if (spell.ritual == true) {
            const spellRitualUse = $('<button>');
            spellRitualUse.addClass('spell-as-ritual');
            spellRitualUse.text('Cast as Ritual');
            spellRitualUse.click(() => {
                console.log("Spell used as a ritual");
            })
            spellCard.append(spellRitualUse);
        }

        const spellRemoveButton = $('<button>');
        spellRemoveButton.addClass('spell-remove-button');
        spellRemoveButton.text('Remove Spell');
        spellRemoveButton.click(() => {
            spellCard.remove();
            var spellToRemove = spell.index;
            existingSpellCards.splice($.inArray(spellToRemove, existingSpellCards), 1);
            localStorage.setItem('spellCardIndexes', JSON.stringify(existingSpellCards));
        });

        spellCard.append(spellCastingTime);
        spellCard.append(spellRange);
        spellCard.append(spellComponents);
        spellCard.append(spellDuration);
        spellCard.append(spellDecription);
        spellCard.append(spellAtHigherLevel);
        spellCard.append(spellRemoveButton);
        spellCards.append(spellCard);
    };

    spellClassForm.submit((e) => {
        e.preventDefault();
        chosenClass = $('#dnd-class').find(":selected").text();
        $.getJSON('https://www.dnd5eapi.co/api/classes/' + chosenClass + '/spells').done((resp) => {
            const spellOptions = resp.results;
            getSpellNames(spellOptions);
        });
    });

    spellLevelForm.submit((e) => {
        e.preventDefault();
        chosenSpellLevel = $('#spell-level').find(":selected").text();
        $.getJSON('https://www.dnd5eapi.co/api/spells?level=' + chosenSpellLevel).done((resp) => {
            const spellOptions = resp.results;
            getSpellNames(spellOptions);
        });
    });


    const getSpellNames = (spellOptions) => {
        spellNamesList.empty();
        const spellOptionsName = spellOptions.map(function (item) {
            return item["index"];
        });
        for (let i = 0; i < spellOptionsName.length; i++) {
            const spellOptionData = {
                name: spellOptionsName[i],
            }
            createSpellOptionCard(spellOptionData);
        }
    };

    const createSpellOptionCard = (spellOption) => {
        const spellOptionCard = $('<button>');
        spellOptionCard.addClass('spell-option');
        spellOptionCard.text(spellOption.name);
        spellOptionCard.click(function () {
            $(spellsNameInput).val(spellOption.name);
        })
        spellNamesList.append(spellOptionCard);
    }

    const parselevelOneSpellSlots = (remainingLevelOneSpellSlots) => {
        levelOneSpellSlots.text(remainingLevelOneSpellSlots);
    }
    const parselevelTwoSpellSlots = (remainingLevelTwoSpellSlots) => {
        levelTwoSpellSlots.text(remainingLevelTwoSpellSlots);
    }
    const parselevelThreeSpellSlots = (remainingLevelThreeSpellSlots) => {
        levelThreeSpellSlots.text(remainingLevelThreeSpellSlots);
    }
    const parselevelFourSpellSlots = (remainingLevelFourSpellSlots) => {
        levelFourSpellSlots.text(remainingLevelFourSpellSlots);
    }
    const parselevelFiveSpellSlots = (remainingLevelFiveSpellSlots) => {
        levelFiveSpellSlots.text(remainingLevelFiveSpellSlots);
    }
    const parselevelSixSpellSlots = (remainingLevelSixSpellSlots) => {
        levelSixSpellSlots.text(remainingLevelSixSpellSlots);
    }
    const parselevelSevenSpellSlots = (remainingLevelSevenSpellSlots) => {
        levelSevenSpellSlots.text(remainingLevelSevenSpellSlots);
    }
    const parselevelEightSpellSlots = (remainingLevelEightSpellSlots) => {
        levelEightSpellSlots.text(remainingLevelEightSpellSlots);
    }
    const parselevelNineSpellSlots = (remainingLevelNineSpellSlots) => {
        levelNineSpellSlots.text(remainingLevelNineSpellSlots);
    }

    const savedSpells = JSON.parse(localStorage.getItem('spellCardIndexes'));
    const remainingLevelOneSpellSlots = JSON.parse(localStorage.getItem('levelOneSpellSlots'));
    const remainingLevelTwoSpellSlots = JSON.parse(localStorage.getItem('levelTwoSpellSlots'));
    const remainingLevelThreeSpellSlots = JSON.parse(localStorage.getItem('levelThreeSpellSlots'));
    const remainingLevelFourSpellSlots = JSON.parse(localStorage.getItem('levelFourSpellSlots'));
    const remainingLevelFiveSpellSlots = JSON.parse(localStorage.getItem('levelFiveSpellSlots'));
    const remainingLevelSixSpellSlots = JSON.parse(localStorage.getItem('levelSixSpellSlots'));
    const remainingLevelSevenSpellSlots = JSON.parse(localStorage.getItem('levelSevenSpellSlots'));
    const remainingLevelEightSpellSlots = JSON.parse(localStorage.getItem('levelEightSpellSlots'));
    const remainingLevelNineSpellSlots = JSON.parse(localStorage.getItem('levelNineSpellSlots'));

    getSavedSpells(savedSpells);
    parselevelOneSpellSlots(remainingLevelOneSpellSlots);
    parselevelTwoSpellSlots(remainingLevelTwoSpellSlots);
    parselevelThreeSpellSlots(remainingLevelThreeSpellSlots);
    parselevelFourSpellSlots(remainingLevelFourSpellSlots);
    parselevelFiveSpellSlots(remainingLevelFiveSpellSlots);
    parselevelSixSpellSlots(remainingLevelSixSpellSlots);
    parselevelSevenSpellSlots(remainingLevelSevenSpellSlots);
    parselevelEightSpellSlots(remainingLevelEightSpellSlots);
    parselevelNineSpellSlots(remainingLevelNineSpellSlots);
});