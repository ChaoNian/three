import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 目标： 使用控制器查看3d物体

// 1---、创建场景
const scene = new THREE.Scene()

// 2---、创建相机
/**透视相机
 * 代码：THREE.PerspectiveCamera = function(fov,aspect,near,far){}  
四个参数：
  fov:视角 ，视角的大小
  aspect：纵横比，实际窗口的纵横比，即宽度/高度，值越大，说明宽度越小,
  near：近平面(近端面),近处的截面的距离， 不要设置负值，不好计算
  far：远平面（远端棉），远处的截面的距离
 */

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
// 2.1、设置相机位置
// set(x，y，z)
camera.position.set(0,0,10)
// 2.2 添加到场景中
scene.add(camera)

// 3--- 添加物体
// 3.1 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
// 3.2 设置基础材质
const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00})
// 3.3 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
// 3.4 将几何体添加到场景中
scene.add(cube)

// 4--- 初始化渲染器
const renderer = new THREE.WebGLRenderer
// 4.1 设置渲染器尺寸
renderer.setSize(window.innerWidth, window.innerHeight)
// 4.2 将webgl渲染的canvas内容添加到body,  domElement属性是canvas DOM
const canvas = renderer.domElement
document.body.appendChild(canvas)

// // 5--- 使用渲染器， 通过相机将场景渲染进来
// renderer.render(scene, camera)


// 6-- 创建轨道控制器
const controls = new OrbitControls(camera, canvas)
function render() {
    // 5--- 使用渲染器， 通过相机将场景渲染进来
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}
render()