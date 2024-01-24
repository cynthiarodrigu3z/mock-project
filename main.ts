namespace SpriteKind {
    export const Item = SpriteKind.create()
    export const object = SpriteKind.create()
    export const scrape = SpriteKind.create()
}
namespace StatusBarKind {
    export const statusbar = StatusBarKind.create()
}
function endscene () {
    scene.setBackgroundImage(assets.image`space`)
}
function statusBar () {
    statusbar = statusbars.create(30, 5, StatusBarKind.statusbar)
    statusbar.value = 0
    statusbar.max = 100
    statusbar.positionDirection(CollisionDirection.Top)
    statusbar.setBarBorder(1, 15)
    statusbar.setLabel("Scraps")
}
function keyplacer () {
    key = sprites.create(assets.image`myImage`, SpriteKind.Item)
    tiles.placeOnRandomTile(key, assets.tile`Tile0`)
    // Example: Creating a key item
    tiles.placeOnRandomTile(key, assets.tile`Tile0`)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.scrape, function (sprite, otherSprite) {
    if (true) {
        otherSprite.sayText("collected", 200, false)
        sprites.destroy(otherSprite, effects.spray, 500)
        statusbar.value += 5
    }
})
function cutscene () {
    scene.setBackgroundImage(assets.image`spaceearth`)
    game.showLongText("meanwhile in space...", DialogLayout.Bottom)
    scene.setBackgroundImage(assets.image`space`)
    meteor = sprites.create(assets.image`meteor`, SpriteKind.Player)
    meteor.setPosition(100, 50)
    spaceship = sprites.create(assets.image`ship`, SpriteKind.Player)
    spaceship.setScale(0.2, ScaleAnchor.Middle)
    spaceship.setPosition(13, 50)
    story.spriteMoveToLocation(spaceship, 100, 50, 100)
    scene.cameraShake(4, 500)
    spaceship.startEffect(effects.warmRadial)
    story.printText("the ship has crashed and needs repairs!", 80, 0)
    effects.clearParticles(spaceship)
    sprites.destroy(meteor)
    sprites.destroy(spaceship)
}
function placeScrap (num: number) {
    if (100 > statusbar.value) {
        for (let index = 0; index < num; index++) {
            list = [sprites.create(assets.image`tattered metal sheet`, SpriteKind.scrape), sprites.create(img`
                ..............bbbbbbb...........
                ...........bb66663333baa........
                .........bb3367776333663aa......
                ........b33333888333389633aa....
                .......b3333333333333389633aa...
                ......b34443333333333338633bae..
                .....b3455433333333334443333ae..
                ....b33322333dddd3333455233daee.
                ...b3d333333dd3bbbb33322333dabe.
                ..b3d333333d3bb33bb33333333da4e.
                ..bd33333333b33aab3333333223a4ee
                .b3d3663333b33aab33366332442b4ee
                .bd3b983333a3aa3333387633ee3b4ee
                .bd6983333baaa333333387633bb4bee
                b3d6833333bba333333333863ba44ebe
                bdd3333333bb3333333333333a44bebe
                add666633333322333366333ba44bbbe
                ad67776333332442336983d3a444b4e.
                add888b333333ee3369833d3a44b44e.
                add333333333333336833d3a444b4e..
                a3dd3333344433333dddd3a444b44e..
                ab33ddd325543333dd33aa444b44e...
                .eabb3dd32233333baaa4444b44e....
                .ebabb3d333d33baa444443b44e.....
                ..ebaab3ddd3aaa4444433b44e......
                ..eebbaab33a44444333b444e.......
                ...eeebbaab444b333b4444e........
                ....ebeeebbbbbbbb4444ee.........
                .....eebbbb44444444ee...........
                .......eeebbb444eee.............
                ..........eeeeee................
                ................................
                `, SpriteKind.scrape), sprites.create(assets.image`tattered metal sheet`, SpriteKind.scrape)]
            tiles.placeOnRandomTile(list._pickRandom(), assets.tile`Tile3`)
        }
    } else {
        endscene()
    }
}
let list: Sprite[] = []
let spaceship: Sprite = null
let meteor: Sprite = null
let statusbar: StatusBarSprite = null
let key: Sprite = null
cutscene()
keyplacer()
tiles.setCurrentTilemap(tilemap`map in doors`)
let mySprite = sprites.create(assets.image`duck`, SpriteKind.Player)
let mySprite2 = sprites.create(img`
    . . . . f f f f f . . . . . . . 
    . . . f e e e e e f . . . . . . 
    . . f d d d d e e e f . . . . . 
    . c d f d d f d e e f f . . . . 
    . c d f d d f d e e d d f . . . 
    c d e e d d d d e e b d c . . . 
    c d d d d c d d e e b d c . . . 
    c c c c c d d e e e f c . . . . 
    . f d d d d e e e f f . . . . . 
    . . f f f f f e e e e f . . . . 
    . . . . f f e e e e e e f . f f 
    . . . f e e f e e f e e f . e f 
    . . f e e f e e f e e e f . e f 
    . f b d f d b f b b f e f f e f 
    . f d d f d d f d d b e f f f f 
    . . f f f f f f f f f f f f f . 
    `, SpriteKind.Player)
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), mySprite)
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), mySprite2)
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
multilights.addLightSource(mySprite, 14)
multilights.addLightSource(mySprite2, 14)
multilights.toggleLighting(true)
tiles.placeOnRandomTile(key, assets.tile`Tile0`)
game.showLongText("The powers out....", DialogLayout.Bottom)
game.showLongText("We need to go to the power generator and turn on the emergency power", DialogLayout.Bottom)
game.showLongText("im sure i wrote the code for the door down somewhere", DialogLayout.Bottom)
story.printText("lets look around ", 80, 0)
game.onUpdateInterval(1000, function () {
    if (mySprite.tileKindAt(TileDirection.Right, assets.tile`Tile2`)) {
        if (game.askForNumber("", 4) == 1151) {
            game.splash("access granted")
            scene.cameraShake(8, 500)
            tiles.setCurrentTilemap(tilemap`lemap`)
            statusBar()
            placeScrap(0)
        } else {
            game.splash("access denied")
        }
    }
    if (mySprite.tileKindAt(TileDirection.Right, assets.tile`myTile0`)) {
        music.play(music.createSoundEffect(WaveShape.Noise, 794, 1599, 255, 104, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        scene.cameraShake(6, 1000)
        multilights.toggleLighting(false)
    }
})
forever(function () {
    if (key.overlapsWith(mySprite)) {
        story.spriteSayText(key, "1151")
        story.printText("great you found it, now go enter it to the pinpad ", 150, 60)
    }
})
