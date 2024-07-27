import * as THREE from 'three'
// 导入控制器 可以缩放 拖拽
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// 1.创建场景
const scene = new THREE.Scene()

// 2.创建相机
const camera = new THREE.PerspectiveCamera(
  45, // 视角
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近平面
  1000 // 远平面
)

// 3.创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)


// 4.创建几何体BoxGeometry 是四边形的原始几何类，   几何体决定形状， 材质决定 外观
// // 它通常使用构造函数所提供的 “width”、“height”、“depth” 参数来创建立方体或者不规则四边形。
// const geometry = new THREE.BoxGeometry(1,1,1) // 立方体

// // 5.创建材质 个以简单着色（平面或线框）方式来绘制几何体的材质。
// const material = new THREE.MeshBasicMaterial({color: 0x00ff00})

// material.wireframe = true
// // 6.创建网格(创建物体)
// const cube = new THREE.Mesh(geometry, material)

// // 7 将网格添加到场景中
// scene.add(cube)

// 方式1 通过buffer 来创建几何体  Buffer缓冲区几何体 ---
const geometry = new THREE.BufferGeometry()
// // 创建顶点数据 使用索引绘制
// const vertices = new Float32Array([
//     -1.0,-1.0,0.0, 1.0,-1.0,0.0, 1.0,1.0,0.0,

//     1.0,1.0,0.0, -1.0,1.0,0.0, -1.0,-1.0,0.0
// ])
// // 创建顶点属性
// geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
//  end-----



// 方式 2
const vertices = new Float32Array([
    -1.0,-1.0,0.0, 1.0,-1.0,0.0, 1.0,1.0,0.0,

    1.0,1.0,0.0, -1.0,1.0,0.0, -1.0,-1.0,0.0
])
// 创建顶点属性
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
// 创建索引值
const indice = new Uint16Array([0,1,2,2,3,0])
// 创建索引属性
geometry.setIndex(new THREE.BufferAttribute(indice, 1))

// 设置2个顶点组，形成2个材质
geometry.addGroup(0,3,0)
geometry.addGroup(3,3,1)

// 创建材质
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    // 由于有正反面  可以设置为两面可以看
    // side: THREE.DoubleSide,
    // wireframe: true
})
const material1 = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    
})

// material 参数可以是数组
const plane = new THREE.Mesh(geometry, [
    material,
    material1
])
// 7 将网格添加到场景中
scene.add(plane)

const axeshelper = new THREE.AxesHelper(5);
scene.add(axeshelper);

// 设置相机位置
camera.position.z = 5
camera.position.y = 2
camera.lookAt(0,0,0) // 默认值 可以不设置 原点


// 添加轨道器(设置dom监听) 可以拖动
const controls = new OrbitControls(camera, renderer.domElement);
// 设置带阻尼的惯性
controls.enableDamping = true;
// 设置带阻尼系数
controls.dampingFactor = 0.05; // 值越大 滑动越久
controls.autoRotate = true;

// 动画
function animate() {
  requestAnimationFrame(animate)
  // 旋转
//   cube.rotation.x += 0.01
//   cube.rotation.y += 0.01

  //  8. 渲染
  renderer.render(scene, camera)
}
animate()


// 监听窗口变化
window.addEventListener('resize', () => {
  // 重置渲染器宽高比
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 重置相机容器宽高比
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新相机投影矩阵
  camera.updateProjectionMatrix()
})
