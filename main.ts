namespace SpriteKind {
    export const Item = SpriteKind.create()
    export const object = SpriteKind.create()
    export const scrape = SpriteKind.create()
}
namespace StatusBarKind {
    export const statusbar = StatusBarKind.create()
}
sprites.onCreated(SpriteKind.Enemy, function (sprite) {
    ENEMIE.follow(mySprite, 20)
})
function spawn_enemies (numEnemies: number) {
    for (let index = 0; index < numEnemies; index++) {
        ENEMIE = sprites.create(assets.image`alien`, SpriteKind.Enemy)
        tiles.placeOnRandomTile(ENEMIE, assets.tile`Tile3`)
    }
}
function openDoorWithPin (code: number) {
    if (code == 1151) {
        // Access granted
        return true
    } else {
        // Access denied
        return false
    }
}
function place (num: number) {
    totalTrash = Math.floor(100 / num) + 1
    for (let index = 0; index < totalTrash; index++) {
        let list: Sprite[] = []
        scrap = sprites.create(assets.image`tattered metal sheet`, SpriteKind.scrape)
        list.push(scrap)
        tiles.placeOnRandomTile(scrap, assets.tile`Tile3`)
    }
    if (10 < num) {
        spawn_enemies(num / 2)
    } else {
        spawn_enemies(num / 3)
    }
}
function keyplacer () {
    key = sprites.create(assets.image`myImage`, SpriteKind.Item)
    tiles.placeOnRandomTile(key, assets.tile`Tile0`)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.scrape, function (sprite, otherSprite) {
    otherSprite.sayText("collected", 200, false)
    sprites.destroy(otherSprite, effects.spray, 500)
    collectedTrash += 1
    if (collectedTrash == totalTrash) {
        game.splash("All scrape collected!")
        game.over(true)
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
})
let pin = 0
let spaceship: Sprite = null
let meteor: Sprite = null
let collectedTrash = 0
let scrap: Sprite = null
let totalTrash = 0
let ENEMIE: Sprite = null
let key: Sprite = null
let mySprite: Sprite = null
cutscene()
keyplacer()
tiles.setCurrentTilemap(tilemap`map in doors`)
mySprite = sprites.create(assets.image`duck`, SpriteKind.Player)
scene.cameraFollowSprite(mySprite)
controller.moveSprite(mySprite)
let mySprite2 = sprites.create(assets.image`monkey`, SpriteKind.Player)
multilights.addLightSource(mySprite, 14)
multilights.addLightSource(mySprite2, 14)
multilights.toggleLighting(true)
tiles.placeOnRandomTile(key, assets.tile`Tile0`)
info.setLife(3)
game.showLongText("The powers out....", DialogLayout.Bottom)
game.showLongText("We need to go to the power generator and turn on the emergency power", DialogLayout.Bottom)
game.showLongText("im sure i wrote the code for the door down somewhere", DialogLayout.Bottom)
story.printText("lets look around ", 80, 0)
game.onUpdateInterval(1000, function () {
    if (mySprite.tileKindAt(TileDirection.Right, assets.tile`Tile2`)) {
        pin = game.askForNumber("pincode", 4)
        if (openDoorWithPin(pin)) {
            game.splash("access granted")
            scene.cameraShake(8, 500)
            tiles.setCurrentTilemap(tilemap`lemap`)
            place(game.askForNumber("difficulty level 1-20", 2))
            game.splash("the door opened! lets go turn on the power")
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
