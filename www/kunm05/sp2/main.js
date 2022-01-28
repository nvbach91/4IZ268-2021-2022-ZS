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

    if (localStorage.getItem('savedSpellSlots') === null) {
        localStorage.setItem('savedSpellSlots', '[]');
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
    const spellSlotsContainer = $('#spell-slots');

    const spellSlots = [];
    const existingSpellCards = [];

    const loadingSpinner = $('#spinner').hide();


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
        getSpellsSlots();
    });

    longRestButton.click((e) => {
        console.log("long rest");
        e.preventDefault();
        createSpellsSlots();
    });

    const getSpellsSlots = () => {
        const levelOneSpellSlotValue = $('input[name="level-one-spell-slots"]').val();
        const levelTwoSpellSlotValue = $('input[name="level-two-spell-slots"]').val();
        const levelThreeSpellSlotValue = $('input[name="level-three-spell-slots"]').val();
        const levelFourSpellSlotValue = $('input[name="level-four-spell-slots"]').val();
        const levelFiveSpellSlotValue = $('input[name="level-five-spell-slots"]').val();
        const levelSixSpellSlotValue = $('input[name="level-six-spell-slots"]').val();
        const levelSevenSpellSlotValue = $('input[name="level-seven-spell-slots"]').val();
        const levelEightSpellSlotValue = $('input[name="level-eight-spell-slots"]').val();
        const levelNineSpellSlotValue = $('input[name="level-nine-spell-slots"]').val();

        spellSlots.length = 0;
        spellSlots.push(levelOneSpellSlotValue);
        spellSlots.push(levelTwoSpellSlotValue);
        spellSlots.push(levelThreeSpellSlotValue);
        spellSlots.push(levelFourSpellSlotValue);
        spellSlots.push(levelFiveSpellSlotValue);
        spellSlots.push(levelSixSpellSlotValue);
        spellSlots.push(levelSevenSpellSlotValue);
        spellSlots.push(levelEightSpellSlotValue);
        spellSlots.push(levelNineSpellSlotValue);
        console.log(spellSlots);

        createSpellSlots(spellSlots);
        localStorage.setItem('savedSpellSlots', JSON.stringify(spellSlots));
    }

    const createSpellSlots = (spellSlots) => {
        spellSlotsContainer.empty();
        for (let i = 0; i < spellSlots.length; i++) {
            const spellSlotValue = spellSlots[i];
            const SpellSlotSpot = $('<div>');
            SpellSlotSpot.addClass('level-spell-slots');
            SpellSlotSpot.text(spellSlotValue);
            spellSlotsContainer.append(SpellSlotSpot);
        }
    };

    const getSavedSpellSlots = (savedSpellSlots) => {
        for (let i = 0; i < savedSpellSlots.length; i++) {
            const spellSlotIndex = savedSpellSlots[i];
            createSpellSlots(spellSlotIndex);
        }
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
        let levelSpellSlotIndex = parseInt(castingLevel) - 1
        let accessedSpellSlot = savedSpellSlots[levelSpellSlotIndex];
        if (parseInt(accessedSpellSlot) === 0) {
            console.log("No available spell slots for this level.")
        } else {
            savedSpellSlots[levelSpellSlotIndex] = parseInt(accessedSpellSlot) - 1;
            spellSlotsContainer.empty();
            createSpellSlots(savedSpellSlots);
        }
    }

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
        spellAtHigherLevel.text(`At higher level: ${spell.higher_level ? spell.higher_level : "-"}`);

        const castSpellForm = $('<form>');
        castSpellForm.addClass('cast-spell-form');
        castSpellForm.append(`<button> Cast at level:`);
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
        const temporarySpellOptions = [];
        for (let i = 0; i < spellOptionsName.length; i++) {
            const spellOptionData = {
                name: spellOptionsName[i],
            };
            const spellOption = createSpellOptionCard(spellOptionData);
            temporarySpellOptions.push(spellOption);
        }
        spellNamesList.append(temporarySpellOptions);
    };

    const createSpellOptionCard = (spellOption) => {
        const spellOptionCard = $('<button>');
        spellOptionCard.addClass('spell-option');
        spellOptionCard.text(spellOption.name);
        spellOptionCard.click(function () {
            $(spellsNameInput).val(spellOption.name);
        });
        return spellOptionCard;
    }

    const savedSpellSlots = JSON.parse(localStorage.getItem('savedSpellSlots'));
    const savedSpells = JSON.parse(localStorage.getItem('spellCardIndexes'));
    getSavedSpellSlots(savedSpellSlots);
    getSavedSpells(savedSpells);
});