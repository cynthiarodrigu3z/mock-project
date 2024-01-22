namespace SpriteKind {
    export const Item = SpriteKind.create()
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
let nmbpad = sprites.create(assets.image`numberpad`, SpriteKind.Item)
tiles.placeOnRandomTile(key, assets.tile`Tile0`)
tiles.placeOnRandomTile(nmbpad, assets.tile`Tile2`)
multilights.addLightSource(mySprite)
multilights.toggleLighting(true)
multilights.bandWidthOf(mySprite, 14)
forever(function () {
    if (key.overlapsWith(mySprite)) {
        story.spriteSayText(key, "1151")
    }
    if (nmbpad.overlapsWith(mySprite)) {
        if (game.askForNumber("", 4) == 1151) {
            game.splash("correct!")
            light.clear()
            scene.cameraShake(4, 500)
            tiles.setCurrentTilemap(tilemap`map in doors`)
        } else {
            game.splash("incorrect")
            light.clear()
        }
    }
})
