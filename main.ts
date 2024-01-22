namespace SpriteKind {
    export const Item = SpriteKind.create()
}
function addToInventory (item: Sprite) {
    inventory.push(item)
}
function displayInventory () {
    for (let i of inventory) {
        i.setPosition(x, 180)
        x += 16
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Item, function (sprite, item) {
    addToInventory(item)
    item.destroy()
    displayInventory()
})
let x = 0
let inventory: Sprite[] = []
tiles.setCurrentTilemap(tilemap`lemap`)
let mySprite = sprites.create(assets.image`duck`, SpriteKind.Player)
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
multilights.addLightSource(mySprite)
multilights.toggleLighting(true)
multilights.bandWidthOf(mySprite, 14)
displayInventory()
let key = sprites.create(assets.image`key`, SpriteKind.Item)
tiles.placeOnRandomTile(key, assets.tile`Tile3`)
