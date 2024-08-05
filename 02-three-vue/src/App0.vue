<script setup>
import * as THREE from "three";
// 导入控制器 可以缩放 拖拽
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// 导入lil.gui 控制器
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'


// 1.创建场景
const scene = new THREE.Scene();

// 2.创建相机
const camera = new THREE.PerspectiveCamera(
  45, // 视角
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近平面
  1000 // 远平面
);

// 3.创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// 4.创建几何体BoxGeometry 是四边形的原始几何类，
// 它通常使用构造函数所提供的 “width”、“height”、“depth” 参数来创建立方体或者不规则四边形。
const geometry = new THREE.BoxGeometry(1, 1, 1); // 立方体

// 5.创建材质 个以简单着色（平面或线框）方式来绘制几何体的材质。
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const materialsub = new THREE.MeshBasicMaterial({ color: 0x88add66 });
// 设置父元素材质为线框模式
material.wireframe = true

// 6.创建网格(创建物体)
const Parentcube = new THREE.Mesh(geometry, material); // 父
const Subcube = new THREE.Mesh(geometry, materialsub); // 子
Parentcube.add(Subcube);



// 三维向量都有这属性和方法 .position.set
Parentcube.position.set(-3, 0, 0); // 父位置
// Subcube.position.set(3, 0, 0); // 子位置

// Parentcube.position.set(2, 2, 2) // 父元素放大2倍
// 设置立方体 放大
// Subcube.scale.set(2, 2, 2) // 父元素放大倍数 * 自身放大倍数

Parentcube.rotation.x = Math.PI / 4;
// Subcube.rotation.x = Math.PI / 2; // 子旋转的角度 = 父旋转的角度 + 自身旋转的角度

// 7 将网格添加到场景中
scene.add(Parentcube); // 父

// 设置相机位置
camera.position.z = 5;
camera.position.x = 2;
camera.position.y = 3;
camera.lookAt(0, 0, 0); // 默认值 可以不设置 原点

// 添加世界坐标辅助器
const axeshelper = new THREE.AxesHelper(5);
scene.add(axeshelper);

// 添加轨道器(设置dom监听) 可以拖动
const controls = new OrbitControls(camera, renderer.domElement);
// 设置带阻尼的惯性
controls.enableDamping = true;
// 设置带阻尼系数
controls.dampingFactor = 0.05; // 值越大 滑动越久
controls.autoRotate = true;

// 动画 渲染函数
function animate() {
  controls.update();
  requestAnimationFrame(animate);
  // 旋转
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  //  8. 渲染
  renderer.render(scene, camera);
}
animate();
// 监听窗口变化
window.addEventListener("resize", () => {
  // 重置渲染器宽高比
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 重置相机容器宽高比
  camera.aspect(window.innerWidth / window.innerHeight);
  // 更新相机投影矩阵
  camera.updateProjectionMatrix();
});

// let btn = document.createElement("button");
// btn.innerHTML = "点击全屏";
// btn.style.position = "absolute";
// btn.style.top = "10px";
// btn.style.left = "10px";
// btn.style.zIndex = 999;

// btn.onclick = function () {
//   // 全屏
//    document.body.requestFullscreen();
// };
// document.body.appendChild(btn);

// // 退出全屏
// let exbtn = document.createElement("button");
// exbtn.innerHTML = "退出全屏";
// exbtn.style.position = "absolute";
// exbtn.style.top = "10px";
// exbtn.style.left = "100px";
// exbtn.style.zIndex = 999;

// exbtn.onclick = function () {
//   document.exitFullscreen()
// };

// // 追加到body 下
// document.body.appendChild(exbtn);

// 全屏、旋转等属性 通过GUI 面板来控制
// 1. 初始化 
const eventObj = {
  Fullscreen: function() {
   //  全屏
   document.body.requestFullscreen();
  },
  exitFullscreen: function() {
    document.exitFullscreen()
  }
}
// 2. 创建GUI 
const gui = new GUI()
// Fullscreen 名字和定义的属性相同
gui.add(eventObj, 'Fullscreen').name('全屏')
gui.add(eventObj, 'exitFullscreen').name('退出全屏')

// 控制立方体的位置
// gui.add(Subcube.position, 'x'， -5， 5)
// gui.add(Subcube.position, 'x').min(-10).max(10).step(1).name('立方体x轴的位置')
// gui.add(Subcube.position, 'y').min(-10).max(10).step(1).name('立方体y轴的位置')
// gui.add(Subcube.position, 'z').min(-10).max(10).step(1).name('立方体z轴的位置')

// 控制立方体的位置 分组
const folder = gui.addFolder('立方体位置')
folder.add(Subcube.position, 'x').setValue(5).min(-10).max(10).step(1).name('立方体x轴的位置').onChange(() => {
  console.log('x 事件');
}).onFinishChange(() => {
  console.log(' x  完成事件');
})
folder.add(Subcube.position, 'y').min(-10).max(10).step(1).name('立方体y轴的位置')
folder.add(Subcube.position, 'z').min(-10).max(10).step(1).name('立方体z轴的位置')

// 元素是线框模式 起效子材质的实例中
gui.add(material, 'wireframe').name('父元素线框模式')

// 修改颜色
let colorParams = {
  cubeColor: '#00ff00'
}
gui.addColor(colorParams, 'cubeColor')
.name('立方体颜色')
.onChange((val) => {
  Parentcube.material.color.set(val)
})

</script>

<template>
  <div></div>
</template>

<style></style>
