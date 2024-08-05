<template>
  <div>
 <!-- 
    四大核心：
      场景（scene）：可以理解时舞台，物体显示的地方，
        代码实现：THREE.Scene = function(){} 无参数，
        可以创建多个场景；

      相机（camera）：现实中相机概念类似，拍摄物体的功能；
         分类：透视相机（近大远小）、正投影相机（远处和近处的一样大）
         代码：THREE.PerspectiveCamera = function(fov,aspect,near,far){}  
              四个参数：
                fov:视角 ，视角的大小
                aspect：纵横比，实际窗口的纵横比，即宽度/高度，值越大，说明宽度越小,
                near：近平面,近处的截面的距离， 不要设置负值，不好计算
                far：远平面，远处的截面的距离

      渲染器（render）：计算的过程，显示到页面的过程；
      几何体（Geometry）：显示在场景中的对象。
            创建方式：直接创建需要的几何体类型，或者通过点线面来创建几何体
            分类：
     -->
  </div>
</template>

<script setup lang='ts'>
import * as THREE from "three";
// 1、创建场景
let scene = new THREE.Scene()

// 2、 创建相机
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000)


// 3、 创建渲染器
let renderer = new THREE.WebGLRenderer()
// 3.1 渲染器大小和颜色
renderer.setClearColor(0xffffff)
renderer.setSize(window.innerWidth, window.innerHeight)

// 3.2 挂载DOM, 渲染到DOM上
console.log(renderer, 'renderer');
document.body.appendChild(renderer.domElement)


// 4、 创建几何体
let geometry = new THREE.BoxGeometry(2,2,2) // 长宽高
// 4.1 材质
let meterial = new THREE.MeshBasicMaterial({color: 0xff0000})
// 4.2 网格
let cube = new THREE.Mesh(geometry, meterial)

// 4.3 添加到场景
scene.add(cube)

// 5 设置相机位置
camera.position.z = 5

// 6 渲染函数
function render() {
    /**
     * requestAnimationFrame() 告诉浏览器你希望执行一个动画。它要求浏览器在下一次重绘之前，调用用户提供的回调函数。
     * 写法：requestAnimationFrame(callback)
     *  返回值：请求 ID 是一个 long 类型整数值，是在回调列表里的唯一标识符。这是一个非零值，
     *         但你不能对该值做任何其他假设。你可以将此值传递给
     *         window.cancelAnimationFrame() 函数以取消该刷新回调请求。
     * 解决： 掉帧问题，函数执行不确定、系统性能问题
     */
    requestAnimationFrame(render) // 执行动画

    // cube.rotation.x +=0.01
    cube.rotation.y +=0.01
    // cube.rotation.z +=0.01

    // 通过场景+相机 将几何体（包含材质） 放到到 domElement里面 ，最终将 domElement 显示在页面
    renderer.render(scene, camera)
}
render()
</script>

<style scoped>

</style>