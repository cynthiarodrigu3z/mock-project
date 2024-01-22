color.setPalette(
color.GrayScale
)
tiles.setCurrentTilemap(tilemap`lemap`)
let mySprite = sprites.create(assets.image`duck`, SpriteKind.Player)
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
multilights.addLightSource(mySprite)
multilights.toggleLighting(true)
multilights.bandWidthOf(mySprite, 14)
