<script setup>
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'

// 初始化场景
const scene = new THREE.Scene()
// 初始化相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

// 设置相机位置
camera.position.set(-3.23, 2.98, 4.06)
camera.updateProjectionMatrix() // 更新相机投影矩阵

// 初始化渲染器
const renderer= new THREE.WebGLRenderer({
  // 抗锯齿
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight) // 设置画布宽高
document.body.appendChild(renderer.domElement) // 将canvas 挂载到body下

// 初始化控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true


// 初始化Loader 
const dracoLoader = new DRACOLoader()
// dracoLoader.setDecoderPath('./xx') 解压文件在当前目录
dracoLoader.setDecoderPath()
const gltfLoader = new GLTFLoader() // glb 格式 转换为glft格式
gltfLoader.setDRACOLoader(dracoLoader)


972903631
// 加载模型
// gltfLoader.load('./xxx/xxx', (gltf) => {
//   const model = gltf.scene
//   model.scale.set(0.1,0.1,0.1)
//   scene.add(model)
// })
// gltfLoader.load('', (gltf) => {
//   const model = gltf.scene
//   model.scale.set(0.1,0.1,0.1)
//   scene.add(model)
// })


// 添加平行光
const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(0,50,0)
scene.add(light)


// 动画
function redner() {
  requestAnimationFrame(redner)
  // 场景scene 和 相机camera
  renderer.render(scene, camera)
  controls.update()
}
redner()
</script>

<template>
  <div>
  </div>
</template>

<style scoped>
</style>
