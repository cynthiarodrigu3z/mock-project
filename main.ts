namespace SpriteKind {
    export const Item = SpriteKind.create()
    export const object = SpriteKind.create()
    export const scrape = SpriteKind.create()
}
function keyplacer () {
    key = sprites.create(assets.image`myImage`, SpriteKind.Item)
    tiles.placeOnRandomTile(key, assets.tile`Tile0`)
    // Example: Creating a key item
    tiles.placeOnRandomTile(key, assets.tile`Tile0`)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.scrape, function (sprite, otherSprite) {
    if (true) {
        sprites.destroy(scrap)
        mySprite.sayText("collected", 100, false)
        tiles.placeOnRandomTile(scrap, assets.tile`Tile3`)
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
function placeScrap () {
    scrap = sprites.create(assets.image`tattered metal sheet`, SpriteKind.scrape)
    tiles.placeOnRandomTile(scrap, assets.tile`Tile3`)
}
let spaceship: Sprite = null
let meteor: Sprite = null
let scrap: Sprite = null
let key: Sprite = null
let mySprite: Sprite = null
cutscene()
keyplacer()
tiles.setCurrentTilemap(tilemap`map in doors`)
mySprite = sprites.create(assets.image`duck`, SpriteKind.Player)
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
multilights.addLightSource(mySprite, 14)
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
            placeScrap()
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
