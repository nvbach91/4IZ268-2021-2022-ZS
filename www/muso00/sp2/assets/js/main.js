
let food; // proměnná jídlo
let gap = 15; // mezery v grid lines
let snake; // hlava hada
let pLoc = {}; // předchozí pozice (previousLocation)

// vyzvednutí nejvyššího skóre z localstorage do proměnné
var highScore = localStorage.getItem('highScore');

// sfx
let game_over = new Audio(src = 'assets/sfx/game_over.mp3');
let eat_sound = new Audio(src = 'assets/sfx/eat.mp3');

// rozměry plátna
let canvX = 750;
let canvY = 495;

// proměnná pro pozastavení hry
let paused = true;

// rychlost hada (velocity)
let vel = 12; //FIXME: pokusit se změnit způsob určení rychlosti hry

// switche pro nastavení pozadí plátna
let sw_def = true;
let sw_01 = false;
let sw_02 = false;
let sw_03 = false;
let sw_rndm = false;

// načtení obrázků
let bg_01;
let bg_02;
let bg_03;
let bg_rndm;


/**
 * Vytvoření tlačítek pro změnu 
 * pozadí herního pole.
 */
const buttons = document.getElementById('btns');

// založení tlačítka 'default'
const btn_def = document.createElement('button');
btn_def.innerText = 'default';
btn_def.id = 'def';
buttons.appendChild(btn_def);

// založení tlačítka 'pozadí-01'
const btn_01 = document.createElement('button');
btn_01.innerText = 'pozadí-01';
btn_01.id = 'b-01';
buttons.appendChild(btn_01);

// založení tlačítka 'pozadí-02'
const btn_02 = document.createElement('button');
btn_02.innerText = 'pozadí-02';
btn_02.id = 'b-02';
buttons.appendChild(btn_02);

// založení tlačítka 'pozadí-03'
const btn_03 = document.createElement('button');
btn_03.innerText = 'pozadí-03';
btn_03.id = 'b-03';
buttons.appendChild(btn_03);

// založení tlačítka 'náhodné'
const btn_rndm = document.createElement('button');
btn_rndm.innerText = 'náhodné';
btn_rndm.id = 'b-rndm';
buttons.appendChild(btn_rndm);


// přídání event listenerů na tlačítka pro přepínání switchů
btn_def.addEventListener('click', () => {
    sw_def = true;
    sw_01 = false;
    sw_02 = false;
    sw_03 = false;
    sw_rndm = false;
});

btn_01.addEventListener('click', () => {
    sw_def = false;
    sw_01 = true;
    sw_02 = false;
    sw_03 = false;
    sw_rndm = false;
});

btn_02.addEventListener('click', () => {
    sw_def = false;
    sw_01 = false;
    sw_02 = true;
    sw_03 = false;
    sw_rndm = false;
});

btn_03.addEventListener('click', () => {
    sw_def = false;
    sw_01 = false;
    sw_02 = false;
    sw_03 = true;
    sw_rndm = false;
});

btn_rndm.addEventListener('click', () => {
    sw_def = false;
    sw_01 = false;
    sw_02 = false;
    sw_03 = false;
    sw_rndm = true;

    bg_rndm = loadImage('https://picsum.photos/' + canvX + '/' + canvY + '/?blur');
});

// inicialitace herního pole
function setup() {
    const canvas = createCanvas(canvX, canvY); // vytvoření canvasu
    canvas.parent('#game-canvas'); // rodič canvasu je div s id game-canvas
    food = new Fruit(); // přidání potravy
    snake = new Head(); // přídání hlavy hada
    frameRate(vel); // rychlost hada
    loadImages();
};

// nakreslení herního pole
function draw() {
    // nastavemí pozadí plátna podle switchů
    if (sw_01 === true) {
        background(bg_01);
    } else if (sw_02) {
        background(bg_02);
    } else if (sw_03) {
        background(bg_03);
    } else if (sw_rndm) {
        background(bg_rndm);
        //FIXME: na záčátku se had nenačítá správně
        //FIXME: při pozastavení se taky změní pozadí
    }else {
        background(170, 204, 102);
    }

    if (!paused) { //TODO: možnost změnit barvu pozadí pro pozastavenou obrazovku
        // posouvání článků, dokud první článek (i=0) je hadova hlava
        for (var i = snake.tails.length - 1; i >= 0; i--) {
            if (i == 0) {
                snake.tails[i].x = snake.x;
                snake.tails[i].y = snake.y;
            } else {
                snake.tails[i].x = snake.tails[i - 1].x;
                snake.tails[i].y = snake.tails[i - 1].y;
            }
            snake.tails[i].show();
        }

        // zrychlení hada po dosažení určitého skóre
        //FIXME: ne explicitně
        /*
        if (snake.score > 4 && snake.score < 9) {
            frameRate(18);
        } else if (snake.score > 9 && snake.score < 14) {
            frameRate(23);
        } else if (snake.score > 14 && snake.score < 19) {
            frameRate(26);
        } else if (snake.score > 19) {
            frameRate(40);
        }*/
    
        pLoc.x = snake.x;
        pLoc.y = snake.y;

        // aktualizování pozice hada
        snake.update();

        // když dojde ke kolizi hada s jídlem, tak...
        if (snake.collision(food)) {
            eat_sound.play();
            // přičti skore, ...
            snake.score++;
            // sněz potravu a...
            food.eat();
            // přidej jeden článek ocasu.
            snake.tails.push(new Tail(pLoc.x, pLoc.y));
        };

        // když dojde ke kolizi s okrajem nebo s ocasem, tak...
        if (snake.collision(food) == false || snake.tail_collision() == true) {
            // respawni hada,
            snake.respawn();
            // respawni jídlo,
            food.eat();
            // spusť zvuk konce hry.
            game_over.play();
        };

        food.show(); // zobrazení potravy
        snake.show(); // zobrazení hada

    } // jinak...
    else {
        // vypiš text pozastavené obrazovky
        drawPaused();
    }

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

    drawScore();
    noFill();
    stroke(43, 51, 25);
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
        if (keyCode == LEFT_ARROW && snake.dir != 'right' || key == 'a' && snake.dir != 'right') {
            snake.dir = 'left';
        } // jinak, pokud se stikne pravá šipka/D, had zatočí doprava.
        else if (keyCode == RIGHT_ARROW && snake.dir != 'left' || key == 'd' && snake.dir != 'left') {
            snake.dir = 'right';
        } // jinak, pokud se stikne šipka nahoru/W, had zatočí nahoru.
        else if (keyCode == UP_ARROW && snake.dir != 'down' || key == 'w' && snake.dir != 'down') {
            snake.dir = 'up';
        } // jinak, pokud se stikne praví dolu/S, had zatočí dolu.
        else if (keyCode == DOWN_ARROW && snake.dir != 'up' || key == 's' && snake.dir != 'up') {
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
    else if (paused) {
        paused = false;
    }
}

// nastavení mezerníku pro pozastavení hry
window.addEventListener('keydown', function (e) {
    var key = e.key;
    if (key === ' ') {
        togglePause();
    }
});

// vypsání textu při pozastavení hry
function drawPaused() {
    text('stiskni [mezerník] pro pokračování', width / 2.5, height / 2);
}

/**
 * Funkce drawScore slouží k zobrazení aktuálního 
 * a nejvyššího skóre v herním poli/na plátně.
 */
function drawScore() {
    fill(43, 51, 25);
    text("Score: " + int(snake.score), 10, height - 25);
    text("Highscore: " + localStorage.getItem('highScore'), 10, height - 10);
}

function loadImages() {
    bg_01 = loadImage('https://picsum.photos/id/1081/' + canvX + '/' + canvY + '/?blur');
    bg_02 = loadImage('https://picsum.photos/id/525/' + canvX + '/' + canvY + '/?blur');
    bg_03 = loadImage('https://picsum.photos/id/682/' + canvX + '/' + canvY + '/?blur');
}

function redraw() {
    snake.respawn();
}