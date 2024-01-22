namespace SpriteKind {
    export const Item = SpriteKind.create()
    export const object = SpriteKind.create()
}
function addToInventory (item: Sprite) {
    let inventory: Sprite[] = []
    inventory.push(item)
    item.destroy()
}
tiles.setCurrentTilemap(tilemap`map in doors`)
let mySprite = sprites.create(assets.image`duck`, SpriteKind.Player)
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
let key = sprites.create(assets.image`myImage`, SpriteKind.Item)
tiles.placeOnRandomTile(key, assets.tile`Tile0`)
multilights.addLightSource(mySprite)
multilights.toggleLighting(true)
multilights.bandWidthOf(mySprite, 14)
game.onUpdateInterval(1000, function () {
    if (mySprite.tileKindAt(TileDirection.Right, assets.tile`Tile2`)) {
        if (game.askForNumber("", 4) == 1151) {
            game.splash("correct!")
            scene.cameraShake(4, 500)
            tiles.setCurrentTilemap(tilemap`lemap`)
        } else {
            game.splash("incorrect")
        }
    }
    if (mySprite.tileKindAt(TileDirection.Right, assets.tile`myTile0`)) {
        scene.cameraShake(6, 500)
        multilights.toggleLighting(false)
    }
})
forever(function () {
    if (key.overlapsWith(mySprite)) {
        story.spriteSayText(key, "1151")
    }
})
