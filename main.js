var GAME_START = false;
var GAME_OVER = false;

const width = 1000;
const height = 750;

var blocs = [];

var game = new Phaser.Game(width, height, Phaser.AUTO, 'samco');

var leftKey;
var rightKey;

game.transparent = true;

var gameState = {};
gameState.load = function() { };
gameState.main = function() { };

gameState.load.prototype = {
    preload: function() {
        game.load.image('background', 'img/BG.png')
        game.load.atlas('breath', 'img/breath.png', 'data/breath.json')
        game.load.atlas('runright', 'img/run-right.png', 'data/run-right.json')
        game.load.image('bloc1', 'img/1.png')
        game.load.image('bloc2', 'img/2.png')
        game.load.image('bloc3', 'img/3.png')
    },
    create: function() {
        game.state.start('main');
    }
};

gameState.main.prototype = {
    create: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setShowAll();
        window.addEventListener('resize', function () {
            game.scale.refresh();
        });
        // BACKGROUND + BLOC SOL
        this.background = game.add.sprite(0, 0, 'background');
        this.background.width = game.width;
        this.background.height = game.height;
        blocs.push(game.add.sprite(10, game.height - 128, 'bloc1'));
        for(i=1; i <= 5; i++){
            blocs.push(game.add.sprite(10 + i * 128, game.height - 128, 'bloc2'));
        }
        blocs.push(game.add.sprite(778, game.height - 128, 'bloc3'));
        // PERSONNAGE
        sprite = game.add.sprite(10, game.height - 225, 'breath');
        sprite.animations.add('breath', [0,9]);
        sprite.animations.play('breath', 3, true);
        spritePosition = 'left';

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.physics.enable(sprite, Phaser.Physics.ARCADE);

        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR ]);

    },
	update: function() {

        sprite.body.velocity.x = 0;
        sprite.body.velocity.y = 0;

        if (this.leftKey.isDown)
        {
            sprite.body.velocity.x = -200;
        }
        if (this.rightKey.isDown)
        {
            sprite.body.velocity.x = 200;
        }
	},
};
console.log(blocs);
game.state.add('load', gameState.load);
game.state.add('main', gameState.main);

game.state.start('load');