namespace SpriteKind {
    export const Item = SpriteKind.create()
    export const object = SpriteKind.create()
    export const scrape = SpriteKind.create()
}
namespace StatusBarKind {
    export const statusbar = StatusBarKind.create()
}
function openDoorWithPin (code: number) {
    // Placeholder algorithm to check if the pin is correct
    if (code == 1151) {
        // Access granted
        return true
    } else {
        // Access denied
        return false
    }
}
function keyplacer () {
    key = sprites.create(assets.image`myImage`, SpriteKind.Item)
    tiles.placeOnRandomTile(key, assets.tile`Tile0`)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.scrape, function (sprite, otherSprite) {
    otherSprite.sayText("collected", 200, false)
    sprites.destroy(otherSprite, effects.spray, 500)
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
    let sum = 0
    trashvalue = num
    if (100 > sum) {
        for (let index = 0; index < 100 / num + 1; index++) {
            list = [sprites.create(assets.image`tattered metal sheet`, SpriteKind.scrape), sprites.create(assets.image`metal sheet`, SpriteKind.scrape), sprites.create(assets.image`tattered metal sheet`, SpriteKind.scrape)]
            tiles.placeOnRandomTile(list._pickRandom(), assets.tile`Tile3`)
        }
    } else {
        scene.setBackgroundImage(assets.image`womp`)
    }
}
let pin = 0
let list: Sprite[] = []
let trashvalue = 0
let spaceship: Sprite = null
let meteor: Sprite = null
let key: Sprite = null
let status: number[] = []
cutscene()
keyplacer()
tiles.setCurrentTilemap(tilemap`map in doors`)
let mySprite = sprites.create(assets.image`duck`, SpriteKind.Player)
scene.cameraFollowSprite(mySprite)
controller.moveSprite(mySprite)
let mySprite2 = sprites.create(assets.image`monkey`, SpriteKind.Player)
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
        pin = game.askForNumber("", 4)
        if (openDoorWithPin(pin)) {
            game.splash("access granted")
            scene.cameraShake(8, 500)
            tiles.setCurrentTilemap(tilemap`lemap`)
            placeScrap(game.askForNumber("", 2))
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
