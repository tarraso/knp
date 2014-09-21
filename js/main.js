var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaserbox', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('background','assets/background.png');
    game.load.image('player','assets/hero.png');
    game.load.image('enemy','assets/enemy.png');
}

var player;
var cursors;
var spacebarKey;
var enemies;

function create() {

    game.add.tileSprite(0, 0, 4992, 3072, 'background');

    game.world.setBounds(0, 0, 4992, 3072);

    game.physics.startSystem(Phaser.Physics.P2JS);

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');

    game.physics.p2.enable(player);

    enemies = game.add.group();
    for (var i = 0; i < 100; i++) {
        var enemy = enemies.create(game.rnd.integerInRange(0, 4992), game.rnd.integerInRange(0, 3072), 'enemy');
        game.physics.p2.enable(enemy,false);
    }
    cursors = game.input.keyboard.createCursorKeys();
    spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    game.camera.follow(player);
}
var forceAway = 0;

function update(){

    player.body.setZeroVelocity();

    if (cursors.up.isDown)
    {
        player.body.moveUp(300);
    }
    else if (cursors.down.isDown)
    {
        player.body.moveDown(300);
    }

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)
    {
        player.body.moveRight(300);
    }
    
    if((spacebarKey.isDown)&&(forceAway ===0)){
          forceAway = 600;
    }
    forceAway = Math.max(0,forceAway-1);
    enemies.forEachAlive(
        function(enemy){
            accelerateToObject(enemy, player, Math.min((-forceAway + 500),0));
    });
}

function accelerateToObject(obj1, obj2, speed) {
    if (typeof speed === 'undefined') { speed = 60; }
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.rotation = angle + game.math.degToRad(90);
    obj1.body.force.x = Math.cos(angle) * speed;    
    obj1.body.force.y = Math.sin(angle) * speed;
}

function render() {

    /*game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);*/

}