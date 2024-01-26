namespace SpriteKind {
    export const Item = SpriteKind.create()
    export const object = SpriteKind.create()
    export const scrape = SpriteKind.create()
}
namespace StatusBarKind {
    export const statusbar = StatusBarKind.create()
}
function statusBar () {
    statusbar2 = statusbars.create(30, 5, StatusBarKind.statusbar)
    statusbar2.value = 0
    statusbar2.max = 100
    statusbar2.positionDirection(CollisionDirection.Top)
    statusbar2.setBarBorder(1, 15)
    statusbar2.setLabel("Scraps")
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
controller.player2.onEvent(ControllerEvent.Connected, function () {
    controller.player2.moveSprite(mySprite)
    scene.cameraFollowSprite(mySprite2)
})
function placeScrap (num: number) {
    if (100 > statusbar2.value) {
        for (let index = 0; index < 7; index++) {
            list = [sprites.create(assets.image`door`, SpriteKind.scrape), sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . 5 5 5 5 5 5 5 5 5 . . . . 
                . . 5 c c c c c c c c c 5 . . . 
                . . 5 c b b b b b b b c 5 . . . 
                . . 5 c b b b b b b b b c 5 . . 
                . . . 5 c b b b b b b b c 5 . . 
                . . . 5 c b b b b b b b c 5 . . 
                . . 5 c b b b b b b b b c 5 . . 
                . . 5 c b b b b b b b c 5 . . . 
                . . 5 c b b b b b b b c 5 . . . 
                . . 5 c b b b b b b b c 5 . . . 
                . . 5 c c c c c c c c 5 . . . . 
                . . . 5 5 5 5 5 5 5 5 . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.scrape), sprites.create(assets.image`tattered metal sheet`, SpriteKind.scrape)]
            scrap = sprites.create(assets.image`door`, SpriteKind.scrape)
            scrap2 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . 5 5 5 5 5 5 5 5 5 . . . . 
                . . 5 c c c c c c c c c 5 . . . 
                . . 5 c b b b b b b b c 5 . . . 
                . . 5 c b b b b b b b b c 5 . . 
                . . . 5 c b b b b b b b c 5 . . 
                . . . 5 c b b b b b b b c 5 . . 
                . . 5 c b b b b b b b b c 5 . . 
                . . 5 c b b b b b b b c 5 . . . 
                . . 5 c b b b b b b b c 5 . . . 
                . . 5 c b b b b b b b c 5 . . . 
                . . 5 c c c c c c c c 5 . . . . 
                . . . 5 5 5 5 5 5 5 5 . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.scrape)
            scrap3 = sprites.create(assets.image`tattered metal sheet`, SpriteKind.scrape)
            tiles.placeOnRandomTile(list._pickRandom(), assets.tile`Tile3`)
        }
    }
    if (mySprite.overlapsWith(scrap) || (mySprite.overlapsWith(scrap2) || mySprite.overlapsWith(scrap3))) {
        statusbar2.value += num
    }
}
controller.player1.onEvent(ControllerEvent.Connected, function () {
    controller.player1.moveSprite(mySprite)
    scene.cameraFollowSprite(mySprite)
})
let scrap3: Sprite = null
let scrap2: Sprite = null
let scrap: Sprite = null
let list: Sprite[] = []
let spaceship: Sprite = null
let meteor: Sprite = null
let statusbar2: StatusBarSprite = null
let key: Sprite = null
let mySprite2: Sprite = null
let mySprite: Sprite = null
cutscene()
keyplacer()
tiles.setCurrentTilemap(tilemap`map in doors`)
mySprite = sprites.create(assets.image`duck`, SpriteKind.Player)
mySprite2 = sprites.create(img`
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
            placeScrap(randint(15, 20))
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
