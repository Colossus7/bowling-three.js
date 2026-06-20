console.log("Connected")

import * as THR from "./three.js-r145/build/three.module.js" //is a must

const camera = new THR.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000)
const renderer = new THR.WebGLRenderer({
    antialiasing : true  //atas ini depend
}) // is a must

renderer.setSize(window.innerWidth, window.innerHeight)
const scene = new THR.Scene()

const loader = new THR.TextureLoader()
renderer.shadowMap.enabled = true // to activate shadow


document.body.appendChild(renderer.domElement) // is a must

camera.position.set(20,60,180)
camera.lookAt(0,0,0) // is a must

function create_floor(width,height,depth){
    const geometry = new THR.BoxGeometry(width,height,depth)
    const texture = loader.load("floor.png")
    const material = new THR.MeshPhongMaterial({
        map : texture
    })
    const floor = new THR.Mesh(geometry,material)

    return floor
}

function upper_cylinder(top,bottom,height,radial,height_segment){
    const geometry = new THR.CylinderGeometry(top,bottom,height,radial,height_segment)
    const material = new THR.MeshPhongMaterial({
        color : "#FFFFFF"
    })
    const upper = new THR.Mesh(geometry,material)

    return upper
}

function lower_cylinder(top,bottom,height,radial,height_segment){
    const geometry = new THR.CylinderGeometry(top,bottom,height,radial,height_segment)
    const material = new THR.MeshPhongMaterial({
        color : "#FFFFFF"
    })
    const lower = new THR.Mesh(geometry,material)

    return lower
}

function neck(top,bottom,height,radial,height_segment){
    const geometry = new THR.CylinderGeometry(top,bottom,height,radial,height_segment)
    const material = new THR.MeshPhongMaterial({
        color : "#FFFFFFF"
    })
    const neck = new THR.Mesh(geometry,material)

    return neck
}

function head(radius,width,height){
    const geometry = new THR.SphereGeometry(radius,width,height)
    const material = new THR.MeshPhongMaterial({
        color : "#FF0000"
    })
    const headMesh = new THR.Mesh(geometry,material)

    return headMesh
}

function Ball(radius,width,height){

    const geometry = new THR.SphereGeometry(radius,width,height)
    const texture = loader.load("bowling-ball.png")
    const material = new THR.MeshPhongMaterial({
        map : texture
    })
    const ball_mesh = new THR.Mesh(geometry,material)

    return ball_mesh
}

const floor = create_floor(250,2,150)
floor.position.set(35,-14,35)
floor.rotation.set(0,-Math.PI/4,0)
floor.receiveShadow = true

scene.add(floor)

const pin_upper = upper_cylinder(3,8,20,12,12)
pin_upper.position.set(0,9,0)
pin_upper.castShadow = true
scene.add(pin_upper)

const lower = lower_cylinder(8,5,12,12,12)
lower.position.set(0,-7,0)
lower.castShadow = true 
scene.add(lower)

const Neck = neck(4,3,12,12,12)
Neck.position.set(0,23,0)
Neck.castShadow = true
scene.add(Neck)

const Head = head(4,32,16)
Head.position.set(0,25,0)
Head.castShadow = true
scene.add(Head)


const ball = Ball(10,32,16)
ball.position.set(90,-3,90)
ball.rotation.set(Math.PI/2,Math.PI/2,Math.PI/2)
ball.castShadow = true
scene.add(ball)

const spot_light = new THR.SpotLight("#FFFFFF",1,)
spot_light.position.set(100,200,300)
spot_light.castShadow = true
spot_light.shadow.mapSize.width =  1024
spot_light.shadow.mapSize.height = 1024
spot_light.shadow.camera.near = 0.5
spot_light.shadow.camera.far = 500

scene.add(spot_light)


window.onload = () => renderer.render(scene,camera) // is a must
