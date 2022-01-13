let food; // jídlo
let snake; // hlava hada
let gap = 15; // mezery v grid lines
let pLoc = {}; // předchozí pozice (previousLocation)

var highscore = 0;

// sfx
let gameOverSound = new Audio(src = 'assets/sfx/game_over.mp3');
let eatSound = new Audio(src = 'assets/sfx/eat.mp3');
let selectSound = new Audio(src = 'assets/sfx/selection.mp3');

// rozměry plátna
let canvX = 750; // šířka
let canvY = 495; // výška

// proměnná pro pozastavení hry
let paused;

// rychlost hada (velocity)
let vel = 12;

// switche pro nastavení pozadí plátna
let swDef = true;
let sw01 = false;
let sw02 = false;
let sw03 = false;
let swRndm = false;

// načtení obrázků
let bg01;
let bg02;
let bg03;
let bgRndm;

/**
 * Proměnné pro 'debounce'. Debounce donutí funkci čekat
 * zvolený čas předtím, než může být znovu spuštěna. Používá se
 * k eliminaci bezprostředního opakovaného volání zvolené funkce.
 */
let currentTime = 0; // aktuální čas
let lastTime = 0; // čas posledního stisknutí tlačítka
let debounceMs = 1000; // cooldown v milisekundách - 1000ms = 1s
let readyToPlay; // proměnná pro odpočet debounce fce

/**
 * Funkce přehraje zvuk,
 * který se používá při výběru 
 * pozadí.
 */
function playSelectionSound() {
    selectSound.play();
};

/**
 * Založení tlačítek pro změnu pozadí herního pole 
 * a vytvoření eventu přikliknutí na tlačítko.
 * 
 * Tlačítka přepínají spínače, které se používají
 * pro změnu pozadí ve funkci setBackground().
 * 
 * Při kliknutí tlačítka se přehraje zvuk.
 */

const btnDef = $('<button>default</button>')
    .attr('id', 'b-def')
    .appendTo('#btns')
    .click(function () {
        playSelectionSound();
        swDef = true;
        sw01 = false;
        sw02 = false;
        sw03 = false;
        swRndm = false;
    });

$('<button>pozadí 01</button>')
    .attr('id', 'b-01')
    .appendTo('#btns')
    .click(function () {
        playSelectionSound();
        swDef = false;
        sw01 = true;
        sw02 = false;
        sw03 = false;
        swRndm = false;
    });

$('<button>pozadí 02</button>')
    .attr('id', 'b-02')
    .appendTo('#btns')
    .click(function () {
        playSelectionSound();
        swDef = false;
        sw01 = false;
        sw02 = true;
        sw03 = false;
        swRndm = false;
    });

$('<button>pozadí 03</button>')
    .attr('id', 'b-03')
    .appendTo('#btns')
    .click(function () {
        playSelectionSound();
        swDef = false;
        sw01 = false;
        sw02 = false;
        sw03 = true;
        swRndm = false;
    });

$('<button>náhodné</button>')
    .attr('id', 'b-rndm')
    .appendTo('#btns')
    .click(function () {
        locked = true;
        playSelectionSound();
        /**
         * Async
         * Funkce loadImage načte obrázek. Druhý parametr je funkce, která se zavolá
         * po úspešném načtení obrázku (callback).
         */
        bgRndm = loadImage(`https://picsum.photos/${canvX}/${canvY}/?blur`, bgLoaded);
        swDef = false;
        sw01 = false;
        sw02 = false;
        sw03 = false;
        swRndm = true;
        lastTime = currentTime;
    });


/**
 * Funkce se stará o načtení obrázků před nastavením hry.
 * Nejde o asynchronní načítání souborů, protože funkce preload
 * se provede jako první před funkcí setup(), která hru 
 * nastaví/inicializuje - čeká, až se soubory načtou.
 */
function preload() {
    bg01 = loadImage(`https://picsum.photos/id/1081/${canvX}/${canvY}/?blur`);
    bg02 = loadImage(`https://picsum.photos/id/141/${canvX}/${canvY}/?blur`);
    bg03 = loadImage(`https://picsum.photos/id/994/${canvX}/${canvY}/?blur`);
};

/**
 * Funkce se spustí pouze jednou, když se program spustí. Je součástí
 * knihovny p5 a používá se pro definování počátečního prostředí a
 * definováním počátečních proměnných.
 */
function setup() {
    const canvas = createCanvas(canvX, canvY); // vytvoření canvasu
    canvas.parent('#game-canvas'); // rodič canvasu je div s id game-canvas
    food = new Fruit(); // přidání potravy
    snake = new Head(); // přídání hlavy hada
    frameRate(vel); // rychlost hry
    snake.tails = []; // články hadova ocasu
    paused = true; // na počátku je hra pozastavena
};

/**
 *  Funkce se zavolá hned po funkci 'setup' a slouží ke kontinuálnímu
 *  provádění řádků kódu, které jsou v ní obsažené.
 * (součástí knihovny p5)
 */
function draw() {
    // metoda millis vrátí počet milisekund  od spuštění sketche (zavolání setup)
    currentTime = millis();
    readyToPlay = (currentTime - lastTime) > debounceMs;

    setBackground(); // funkce pro nastavení pozadí

    // pokud hra není pozastavena, tak...
    if (!paused) {
        // skryj skupinu tlačítek pro změnu pozadí plátna.
        document.getElementById('btns').style.display = 'none';

        /**
         * Posouvání článků ocasu spolu s hadem.
         * Dochází k loopování pozpátku skrz pole s články ocasu. Poslední ocas
         * se přesune jako předposlední, předposlední jako druhý předposlední atp. až 
         * dokud první ocas, resp. článek (i=0) není položen na hlavu hada.
         * Hlava hada se posouvá podle směru.
         */
        for (var i = snake.tails.length - 1; i >= 0; i--) {
            if (i === 0) {
                snake.tails[i].x = snake.x;
                snake.tails[i].y = snake.y;
            } else {
                snake.tails[i].x = snake.tails[i - 1].x;
                snake.tails[i].y = snake.tails[i - 1].y;
            }
            snake.tails[i].show();
        }

        // ocas se spawne na předchozích souřadnicích hadovi hlavy
        pLoc.x = snake.x;
        pLoc.y = snake.y;

        // aktualizování pozice hada
        snake.update();

        food.show(); // zobrazení potravy
        snake.show(); // zobrazení hada

    } // jinak...
    else {
        // ztmavení pozadí při pozastavené obrazovce
        background('rgba(0,0,0,0.1)');
        // zobraz skupinu tlačítek pro změnu pozadí plátna.
        document.getElementById('btns').style.display = 'inline';
        // vypiš text pozastavené obrazovky  
        drawPaused();
    };

    var i = snake.score;
    // pokud je skóre větší nebo rovno 10, tak...
    if (i >= 10) {
        // nastav novou rychlost hry.
        frameRate(vel + 5);
        // pokud je skóre větší nebo rovno 20, tak...
        if (i >= 20) {
            // nastav novou rychlost hry.
            frameRate(vel + 10);
            // pokud je skóre větší nebo rovno 25, tak...
            if (i >= 25) {
                // nastav novou rychlost hry.
                frameRate(vel + 15);
                // pokud je skóre větší nebo rovno 35, tak...
                if (i >= 35) {
                    // nastav novou rychlost hry.
                    frameRate(vel + 25);
                    // pokud je skóre větší nebo rovno 40, tak...
                    if (i >= 40) {
                        // nastav novou rychlost hry.
                        frameRate(vel + 35);
                        // pokud je skóre větší nebo rovno 50, tak...
                        if (i >= 50) {
                            // nastav novou rychlost hry.
                            frameRate(vel + 45)
                        }
                    }
                }
            }
        }
    };

    // pomocná proměnná pro skóre
    var score = snake.score;
    // uložení aktuálního nejvyššího skore do proměnné
    var storagedHighscore = localStorage.getItem('highscore');

    // pokud nejvyšší skóre není null, a...
    if (storagedHighscore !== null) {
        // pokud je aktuální skóre vyšší než nejvyšší skóre, tak...
        if (score > storagedHighscore) {
            // ulož nové nejvyšší skóre do highscore v localStorage.
            localStorage.setItem('highscore', score);
        }
    } // jinak...
    else {
        // nastav highscore 0 v localStorage.
        localStorage.setItem('highscore', 0);
    }

    // když dojde ke kolizi hada s jídlem, tak...
    if (snake.collision(food)) {
        // přehraj zvuk snědení potravy
        eatSound.play();
        // přičti skore,...
        snake.score++;
        // sněz potravu a...
        food.eat();
        // přidej jeden článek ocasu.
        snake.tails.push(new Tail(pLoc.x, pLoc.y));
    };

    // když dojde ke kolizi s okrajem nebo s ocasem, tak...
    if (snake.collision(food) === false || snake.tailCollision() === true) {
        // konec hry, 
        gameOver();
        // spusť zvuk konce hry.
        gameOverSound.play();
    };

    // pokud je aktivní defaultní pozadí, tak...
    if (swDef) {
        // nastav zelenou barvu písma.
        fill(43, 51, 25);
    } // jinak...
    else {
        // nastav bílou barvu písma.
        fill(255, 255, 255);
    };

    // zobrazení skóre
    drawScore();
};

/**
 * Funkce slouží k namapování ovládání hada
 * na konkrétní klávesy. Hada lze ovládat pomocí
 * šipek nebo WASD a to pouze pokud hra beží.
 * Zároveň se nelze otočit do opačného směru.
 */
function keyPressed() {
    // pokud hra není pozastavena, tak...
    if (!paused) {
        // pokud je stiknuta levá šipka (nebo a) a had se nepohybuje doprava, tak...
        if (keyCode === LEFT_ARROW && snake.dir != 'right' || key === 'a' && snake.dir != 'right') {
            // nastav nový směr hada.
            snake.dir = 'left';
        } // jinak, pokud je stiknuta pravá šipka (nebo d) a had se nepohybuje doleva, tak...
        else if (keyCode === RIGHT_ARROW && snake.dir != 'left' || key === 'd' && snake.dir != 'left') {
            // nastav nový směr hada.
            snake.dir = 'right';
        } // jinak, pokud je stiknuta šipka nahoru (nebo w) a had se nepohybuje dolu, tak...
        else if (keyCode === UP_ARROW && snake.dir != 'down' || key === 'w' && snake.dir != 'down') {
            // nastav nový směr hada.
            snake.dir = 'up';
        } // jinak, pokud je stiknuta šipka dolů (nebo s) a had se nepohybuje nahoru, tak...
        else if (keyCode === DOWN_ARROW && snake.dir != 'up' || key === 's' && snake.dir != 'up') {
            // nastav nový směr hada.
            snake.dir = 'down';
        }
    }
};

/**
 * Funkce slouží k vyvolání pauzi,
 * tj. pozastavení hry a její opětovné
 * spuštění.
 */
function togglePause() {
    // pokud hra není pozastavena a není aktivní debounce, tak...
    if (!paused && readyToPlay) {
        // pozastav hru a...
        paused = true;
        // ulož poslední čas do aktuálního času.
        lastTime = currentTime;
    } // jinak, pokud je pozastavena, tak...
    else {
        // spusť hru.
        paused = false;
    }
};

// nastavení listeneru pro tlačítko, které pozastaví hru.
document.addEventListener('keydown', function (e) {
    var key = e.key;
    // pokud je stisknut mezerník nebo Esc
    if (key === ' ' || key === 'Escape') {
        /**
         * metoda preventDefault se používá v případě, 
         * že pokud není Event explicitně zpracovaný, jeji výchozí 
         * akce by neměla být provedena tak, jak by to bylo normálně.
         */
        e.preventDefault();
        // spusť funkci.
        togglePause();
    };
});

// vypsání textu při pozastavení hry
function drawPaused() {
    text('stiskni [mezerník] pro pokračování', width / 2.5, height / 2);
};

/**
 * Funkce drawScore slouží k zobrazení aktuálního 
 * a nejvyššího skóre v herním poli/na plátně.
 */
function drawScore() {
    text('Score: ' + snake.score, 10, height - 25); // aktuální skóre
    text('Highscore: ' + localStorage.getItem('highscore'), 10, height - 10); // nejvyšší skóre
};

/**
 * funkce slouží k nastavení pozadí herního pole.
 * Tlačítka pro změnu herního pole spouští switche.
 * Pozadí se nastaví podle toho, jaký switch je
 * zapnutý. Po stisknutí tlačítka se nastaví focus
 * na zvolené tlačítko.
 */
function setBackground() {
    // pokud je stisknuto tlačítko pozadí 01, tak...
    if (sw01 === true) {
        // nastav pozadí na pozadí 01, a...
        background(bg01);
        // nastav focus na tlačítko pozadí 01.
        $('#b-01').get(0).focus();
    } // jinak, pokud je stisknuto tlačítko pozadí 02, tak...
    else if (sw02) {
        // nastav pozadí na pozadí 02, a...
        background(bg02);
        // nastav focus na tlačítko pozadí 01.
        $('#b-02').get(0).focus();
    } // jinak, pokud je stisknuto tlačítko pozadí 03, tak...
    else if (sw03) {
        // nastav pozadí na pozadí 03, a...
        background(bg03);
        // nastav focus na tlačítko pozadí 03.
        $('#b-03').get(0).focus();
    } // jinak, pokud je stisknuto tlačítko náhodné, tak...
    else if (swRndm) {
        // nastav náhodné pozadí, a...
        bgLoaded();
        // nastav focus na tlačítko náhodné.
        $('#b-rndm').get(0).focus();
    } // jinak...
    else {
        // nastav defaultní pozadí herní plochy, a...
        background(170, 204, 102);
        // nastav focus na tlačítko default.
        $('#b-def').get(0).focus();
    }
};

/**
 * Funkce určuje, jaké činnosti
 * se mají provést, když dojde
 * ke konci hry.
 */
function gameOver() {
    // respawni hada,
    snake.respawn();
    // respawni jídlo.
    food.eat();
};

/**
 * Funkce je zavolána po stisknutí tlačítka
 * náhodné, pokud došlo k úspěšné realizaci 
 * funkce loadImage, tj. načtení obrázku.
 * 
 * Používá se na realizaci callbacku.
 */
function bgLoaded() {
    background(bgRndm);
};
