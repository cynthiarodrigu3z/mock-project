namespace SpriteKind {
    export const Item = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Tile0`, function (sprite, location) {
    if (inventory.length > 0) {
        game.showLongText("You picked up an item!", DialogLayout.Bottom)
        // Perform any additional actions when the player overlaps with the tile
        // For example, you might want to add the item to the inventory
        addToInventory(inventory[0])
    }
})
function addToInventory (item: Sprite) {
    inventory.push(item)
    // Assuming you want to remove the item from the scene when added to the inventory
    item.destroy()
}
let inventory: Sprite[] = []
tiles.setCurrentTilemap(tilemap`lemap`)
let mySprite = sprites.create(assets.image`duck`, SpriteKind.Player)
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
multilights.addLightSource(mySprite)
multilights.toggleLighting(true)
multilights.bandWidthOf(mySprite, 14)
// Example: Creating a key item
let key = sprites.create(assets.image`myImage`, SpriteKind.Item)
tiles.placeOnRandomTile(key, assets.tile`Tile0`)
