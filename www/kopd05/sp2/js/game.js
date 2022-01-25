var game;
var currentWeather;
var gameOptions = {
 
    birdGravity: 800,
    birdSpeed: 125,
    birdFlapPower: 300,
    minPipeHeight: 50,
    pipeDistance: [220, 280],
    pipeHole: [100, 130],
    localStorageName: 'bestFlappyScore'
};
window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor:0x87ceeb,
        scale: {
            //mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: 'thegame',
            width: 320,
            height: 480
        },
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                debug: false,
                gravity: {
                    y: 0
                }
            }
        },
        scene: [
            Menu,
            playGame 
        ]
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
}


class Button {
    constructor(x, y, label, scene, callback) {
        const button = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => button.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => button.setStyle({ fill: '#FFF' }));
    }
}


class Menu extends Phaser.Scene{
    
    constructor(){
        super('Menu');
    }
    preload(){
        getWeatherData();
    }

    create() {
        const button = new Button(155, 200, 'Start Game', this, () => {this.scene.stop();this.scene.start('PlayGame')});
        this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
        this.topScoreText = this.add.text(90, 230, 'Best score: ' + this.topScore);
    }

}


class playGame extends Phaser.Scene{
    constructor(){
        super('PlayGame');
    }
    preload(){
        getWeatherData();
        this.load.image('bird', '../sp2/assets/imgs/cat.png');
        this.load.image('pipe', '../sp2/assets/imgs/pipe.png');
        this.load.image('bgSnow','../sp2/assets/imgs/bgSnow.png');
        this.load.image('bgClouds','../sp2/assets/imgs/bgClouds.png');
        this.load.image('bgRain','../sp2/assets/imgs/bgRain.png');
        this.load.image('bgClear','../sp2/assets/imgs/bgClear.png');
    }

    

    create(){
        switch(currentWeather){
            case 'Snow': this.background = this.add.sprite(160, 240, 'bgSnow');
                        console.log("Snow");
            break;
            case 'Clear': this.background = this.add.sprite(160, 240, 'bgClear');
            console.log("Clear");
            break;
            case 'Clouds': this.background = this.add.sprite(160, 240, 'bgClouds');
            console.log("Clouds");
            break;
            case 'Rain': this.background = this.add.sprite(160, 240, 'bgRain');
            console.log("Rain");
            break;
            default: console.log("Default");
        }
        this.pipeGroup = this.physics.add.group();
        this.pipePool = [];
        for(let i = 0; i < 4; i++){
            this.pipePool.push(this.pipeGroup.create(0, 0, 'pipe'));
            this.pipePool.push(this.pipeGroup.create(0, 0, 'pipe'));
            this.placePipes(false);
        }
        this.pipeGroup.setVelocityX(-gameOptions.birdSpeed);
        this.bird = this.physics.add.sprite(80, game.config.height / 2, 'bird').setScale(0.05).refreshBody();
        this.bird.body.gravity.y = gameOptions.birdGravity;
        this.input.on('pointerdown', this.flap, this);
        this.score = 0;
        this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
        this.scoreText = this.add.text(10, 10, '');
        this.updateScore(this.score);

        

    }
    updateScore(inc){
        this.score += inc;
        this.scoreText.text = 'Score: ' + this.score + '\nBest: ' + this.topScore;
    }
    placePipes(addScore){
        let rightmost = this.getRightmostPipe();
        let pipeHoleHeight = Phaser.Math.Between(gameOptions.pipeHole[0], gameOptions.pipeHole[1]);
        let pipeHolePosition = Phaser.Math.Between(gameOptions.minPipeHeight + pipeHoleHeight / 2, game.config.height - gameOptions.minPipeHeight - pipeHoleHeight / 2);
        this.pipePool[0].x = rightmost + this.pipePool[0].getBounds().width + Phaser.Math.Between(gameOptions.pipeDistance[0], gameOptions.pipeDistance[1]);
        this.pipePool[0].y = pipeHolePosition - pipeHoleHeight / 2;
        this.pipePool[0].setOrigin(0, 1);
        this.pipePool[1].x = this.pipePool[0].x;
        this.pipePool[1].y = pipeHolePosition + pipeHoleHeight / 2;
        this.pipePool[1].setOrigin(0, 0);
        this.pipePool = [];
        if(addScore){
            this.updateScore(1);
        }
    }
    flap(){
        this.bird.body.velocity.y = -gameOptions.birdFlapPower;
    }
    getRightmostPipe(){
        let rightmostPipe = 0;
        this.pipeGroup.getChildren().forEach(function(pipe){
            rightmostPipe = Math.max(rightmostPipe, pipe.x);
        });
        return rightmostPipe;
    }
    update(){
        this.physics.world.collide(this.bird, this.pipeGroup, function(){
            this.die();
        }, null, this);
        if(this.bird.y > game.config.height || this.bird.y < 0){
            this.die();
        }
        this.pipeGroup.getChildren().forEach(function(pipe){
            if(pipe.getBounds().right < 0){
                this.pipePool.push(pipe);
                if(this.pipePool.length == 2){
                    this.placePipes(true);
                }
            }
        }, this)
    }
    die(){
        localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore));
        this.scene.stop('PlayGame');
        this.scene.start('Menu')
    }

    
}

function getWeatherData() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Prague&appid=153e8b1ebf73f48661f9dd3df9f583b0').then(response => response.json())
    .then(data => {
        var weatherData = data['weather'];
        var mainData = weatherData[0];
        currentWeather = mainData.main;
        return mainData.main;
    })
  }