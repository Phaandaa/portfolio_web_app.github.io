const canvas = document.querySelector('canvas')
const tile_size = 56

const c = canvas.getContext('2d')
canvas.width = 1280
canvas.height = 640

//collisionMap variable at collisions.js file

//Boundary making


const boundaries = []
const offset = {
    x: -840,
    y: -1700
}
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol != 0 ){
            boundaries.push(new Boundary({position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
            }
        }
        ))
    }})
})

console.log(boundaries)


const image = new Image()
image.src = './img/portfolio_exterior_2.png'

const foregroundImage = new Image()
foregroundImage.src = './img/foreground_objects.png'

const playerImage = new Image()
playerImage.src = './img/playerIdle01.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp01.png'

const playerDownImage = new Image()
playerDownImage.src = './img/playerDown01.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft01.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight01.png'


const player = new Sprite({
    position: {
        x: canvas.width / 2 - (336 / 6 / 2),
        y: canvas.height / 2 - 112 / 2
    },
    image: playerImage,
    frames: {
        max: 6
    },
    sprites : {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage,
        idle: playerImage
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const movables = [background, ...boundaries, foreground]


function rectangularCollision ({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x + 10 &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width - 10 &&
        rectangle1.position.y <= rectangle2.position.y + (rectangle2.height/3)  &&
        rectangle1.position.y + tile_size >= rectangle2.position.y)
}
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
        
    })
    player.draw()
    foreground.draw()
    let moving = true
    

    player.moving = false
    player.image = player.sprites.idle
    if (keys.w.pressed && lastKey === 'w') { 
        player.moving = true
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }}
                })
            ) {
                console.log('colliding')
                moving = false
                break
            }
        }
        if(moving)
            movables.forEach(movable => {
            movable.position.y += 3
    })}
    else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }}
                })
            ) {
                console.log('colliding')
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach(movable => {
            movable.position.x += 3
    })}
    else if (keys.s.pressed && lastKey === 's') {
        player.moving = true
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }}
                })
            ) {
                console.log('colliding')
                moving = false
                break
            }
        }
        if(moving)
        movables.forEach(movable => {
        movable.position.y -= 3
    })}
    else if (keys.d.pressed && lastKey === 'd') {
        player.moving = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }}
                })
            ) {
                console.log('colliding')
                moving = false
                break
            }
        }
        if(moving)
        movables.forEach(movable => {
        movable.position.x -= 3
    })}
}

animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break

        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break

        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break

        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false       
            break

        case 'a':
            keys.a.pressed = false
            break

        case 's':
            keys.s.pressed = false
            break

        case 'd':
            keys.d.pressed = false
            break
    }
})
