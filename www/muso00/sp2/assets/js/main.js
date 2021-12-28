let food; // proměnná jídlo
let gap = 15; // mezery v grid lines
let snake; // hlava hada
let pLoc = {}; // předchozí pozice (previousLocation)

// vyzvednutí nejvyššího skóre z localstorage do proměnné
var highScore = localStorage.getItem('highScore');

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
let vel = 12; //FIXME: pokusit se změnit způsob určení rychlosti hry

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
 * Vytvoření tlačítek pro změnu 
 * pozadí herního pole.
 */
const buttons = document.getElementById('btns');

// založení tlačítka 'default'
const btnDef = document.createElement('button');
btnDef.innerText = 'default';
btnDef.id = 'def';
buttons.appendChild(btnDef);

// založení tlačítka 'pozadí-01'
const btn01 = document.createElement('button');
btn01.innerText = 'pozadí 01';
btn01.id = 'b-01';
buttons.appendChild(btn01);

// založení tlačítka 'pozadí-02'
const btn02 = document.createElement('button');
btn02.innerText = 'pozadí 02';
btn02.id = 'b-02';
buttons.appendChild(btn02);

// založení tlačítka 'pozadí-03'
const btn03 = document.createElement('button');
btn03.innerText = 'pozadí 03';
btn03.id = 'b-03';
buttons.appendChild(btn03);

// založení tlačítka 'náhodné'
const btnRndm = document.createElement('button');
btnRndm.innerText = 'náhodné';
btnRndm.id = 'b-rndm';
buttons.appendChild(btnRndm);

// přídání event listenerů na tlačítka pro přepínání switchů
btnDef.addEventListener('click', () => {
    selectSound.play();
    swDef = true;
    sw01 = false;
    sw02 = false;
    sw03 = false;
    swRndm = false;
});

btn01.addEventListener('click', () => {
    selectSound.play();
    swDef = false;
    sw01 = true;
    sw02 = false;
    sw03 = false;
    swRndm = false;
});

btn02.addEventListener('click', () => {
    selectSound.play();
    swDef = false;
    sw01 = false;
    sw02 = true;
    sw03 = false;
    swRndm = false;
});

btn03.addEventListener('click', () => {
    selectSound.play();
    swDef = false;
    sw01 = false;
    sw02 = false;
    sw03 = true;
    swRndm = false;
});

btnRndm.addEventListener('click', () => {
    // async
    bgRndm = loadImage(`https://picsum.photos/${canvX}/${canvY}/?blur`);
    selectSound.play();
    swDef = false;
    sw01 = false;
    sw02 = false;
    sw03 = false;
    swRndm = true;
});

/**
 * Funkce se stará o načtení obrázků před nastavením hry.
 * Nejde o asynchronní načítání souborů, protože funkce preload
 * se provede jako první před a funkce setup(), která hru nastaví/inicializuje,
 * čeká, až se soubory načtou.
 */
 function preload() {
    bg01 = loadImage(`https://picsum.photos/id/1081/${canvX}/${canvY}/?blur`);
    bg02 = loadImage(`https://picsum.photos/id/141/${canvX}/${canvY}/?blur`);
    bg03 = loadImage(`https://picsum.photos/id/1032/${canvX}/${canvY}/?blur`);
};

// inicialitace herního pole
function setup() {
    const canvas = createCanvas(canvX, canvY); // vytvoření canvasu
    canvas.parent('#game-canvas'); // rodič canvasu je div s id game-canvas
    food = new Fruit(); // přidání potravy
    snake = new Head(); // přídání hlavy hada
    //loadImages(); // načtení obrázků
    frameRate(vel); // rychlost hry
    snake.tails = []; // články hadova ocasu
    togglePause(); // na počátku je hra pozastavena
};

// nakreslení herního pole
function draw() {
    setBackground();
    if (!paused) { //TODO: možnost změnit barvu pozadí pro pozastavenou obrazovku
        
        // skryj skupinu tlačítek pro změnu pozadí plátna.
        document.getElementById('btns').style.display = 'none';
        
        // posouvání článků, dokud první článek (i=0) není hadova hlava
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

        pLoc.x = snake.x;
        pLoc.y = snake.y;

        // aktualizování pozice hada
        snake.update();

        food.show(); // zobrazení potravy
        snake.show(); // zobrazení hada

    } // jinak...
    else {
        //background('rgba(0,0,0,0.1)');
        
        // zobraz skupinu tlačítek pro změnu pozadí plátna.
        document.getElementById('btns').style.display = 'inline';
        // vypiš text pozastavené obrazovky
        drawPaused();
    }

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

    // pokud nejvyšší skore není null, a...
    if (highScore !== null) {
        // pokud je aktuální skore vyšší než nejvyšší skore, tak...
        if (snake.score > highScore) {
            // ulož nové nejvyšší skore do localStorage.
            localStorage.setItem('highScore', snake.score);
        }
    } else {
        localStorage.setItem('highScore', snake.score);
    };

    // když dojde ke kolizi hada s jídlem, tak...
    if (snake.collision(food)) {
        eatSound.play();
        // přičti skore,...
        snake.score++;
        // sněz potravu a...
        food.eat();
        // přidej jeden článek ocasu.
        snake.tails.push(new Tail(pLoc.x, pLoc.y));
    };

    // když dojde ke kolizi s okrajem nebo s ocasem, tak...
    if (snake.collision(food) === false || snake.tail_collision() === true) {
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

    drawScore();
    //noFill();
    //stroke(43, 51, 25);
    //rect(1, 1, width - 2, height - 2);
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
        // při stisknutí levé šipky/A had zatočí doleva.
        if (keyCode === LEFT_ARROW && snake.dir != 'right' || key === 'a' && snake.dir != 'right') {
            snake.dir = 'left';
        } // jinak, pokud se stikne pravá šipka/D, had zatočí doprava.
        else if (keyCode === RIGHT_ARROW && snake.dir != 'left' || key === 'd' && snake.dir != 'left') {
            snake.dir = 'right';
        } // jinak, pokud se stikne šipka nahoru/W, had zatočí nahoru.
        else if (keyCode === UP_ARROW && snake.dir != 'down' || key === 'w' && snake.dir != 'down') {
            snake.dir = 'up';
        } // jinak, pokud se stikne praví dolu/S, had zatočí dolu.
        else if (keyCode === DOWN_ARROW && snake.dir != 'up' || key === 's' && snake.dir != 'up') {
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
    // pokud hra není pozastaven, tak...
    if (!paused) {
        // pozastav hru.
        paused = true;
    } // jinak, pokud je pozastavena, tak...
    else {
        // spusť hru.
        paused = false;
    }
};

// nastavení tlačítka pro pozastavení hry.
document.addEventListener('keydown', function (e) {
    var key = e.key;
    if (key === ' ') {
        e.preventDefault();
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
    text('Score: ' + int(snake.score), 10, height - 25);
    text('Highscore: ' + localStorage.getItem('highScore'), 10, height - 10);
};

/**
 * funkce slouží l nastavení pozadí herního pole.
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
        btn01.focus();
    } // jinak, pokud je stisknuto tlačítko pozadí 02, tak...
    else if (sw02) {
        // nastav pozadí na pozadí 02, a...
        background(bg02);
        // nastav focus na tlačítko pozadí 01.
        btn02.focus();
    } // jinak, pokud je stisknuto tlačítko pozadí 03, tak...
    else if (sw03) {
        // nastav pozadí na pozadí 03, a...
        background(bg03);
        // nastav focus na tlačítko pozadí 03.
        btn03.focus();
    } // jinak, pokud je stisknuto tlačítko náhodné, tak...
    else if (swRndm) {
        // nastav náhodné pozadí, a...
        background(bgRndm);
        // nastav focus na tlačítko náhodné.
        btnRndm.focus();
    } // jinak...
    else {
        // nastav defaultní pozadí herní plochy, a...
        background(170, 204, 102);
        // nastav focus na tlačítko default.
        btnDef.focus();
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
 * Get a value from web storage regardless of whether it's sync or async
 */
function getStorageItem(storage, key, callback) {

    if (typeof callback !== 'function') throw new Error('Invalid callback handler');

    var result = storage.getItem(key);

    if (result instanceof window.Promise) {
        result.then(callback);
    }
    else {
        callback(result);
    }
};

/**
 * Set a value in web storage regardless of whether it's sync or async
 */
function setStorageItem(storage, key, value, callback) {

    var result = storage.setItem(key, value);

    if (result instanceof window.Promise && callback) {
        result.then(callback);
    }
    else if (callback) {
        callback();
    }
};

$('#loader')
    .hide() //hide it initially
    .ajaxStart(function () {
        $(this).show();
    })
    .ajaxStop(function () {
        $(this).hide();
    });