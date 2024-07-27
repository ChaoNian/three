import * as THREE from 'three'


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


// 4.创建几何体BoxGeometry 是四边形的原始几何类，
// 它通常使用构造函数所提供的 “width”、“height”、“depth” 参数来创建立方体或者不规则四边形。
const geometry = new THREE.BoxGeometry(1,1,1) // 立方体

// 5.创建材质 个以简单着色（平面或线框）方式来绘制几何体的材质。
const material = new THREE.MeshBasicMaterial({color: 0x00ff00})


// 6.创建网格(创建物体)
const cube = new THREE.Mesh(geometry, material)

// 7 将网格添加到场景中
scene.add(cube)

// 设置相机位置
camera.position.z = 5
camera.lookAt(0,0,0) // 默认值 可以不设置 原点


// 动画
function animate() {
  requestAnimationFrame(animate)
  // 旋转
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  //  8. 渲染
  renderer.render(scene, camera)
}
animate()


// 监听窗口变化
window.addEventListener('resize', () => {
  // 重置渲染器宽高比
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 重置相机容器宽高比
  camera.aspect(window.innerWidth / window.innerHeight)
  // 更新相机投影矩阵
  camera.updateProjectionMatrix()
})

let btn = document.createElement('button')
btn.innerHTML = '点击全屏'
btn.style.position = 'absolute'
btn.style.top = '10px'
btn.style.left = '10px'
btn.style.right = '10px'
btn.style.zIndex = 999

btn.onclick = function() {
  // 全屏
  renderer.domElement.requestFullscreen()
}

// 追加到body 下
document.body.appendChild(btn)