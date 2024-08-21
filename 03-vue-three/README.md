# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).


在 Three.js 中，`updateProjectionMatrix` 是一个用于更新相机投影矩阵的方法。相机的投影矩阵决定了场景中物体如何投影到视口中，它影响了透视效果、视野范围和物体的可视空间等。

### 相机投影矩阵简介

相机投影矩阵定义了一个透视投影或者正交投影，它决定了场景中的三维物体如何映射到二维屏幕上。在 Three.js 中，常见的相机类型有透视相机（`PerspectiveCamera`）和正交相机（`OrthographicCamera`），它们的投影矩阵会根据不同的设置而变化。

### `updateProjectionMatrix` 方法

#### 1. 透视相机（`PerspectiveCamera`）

```javascript
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
```

- `fov`：视场角（field of view），即视角的大小。
- `aspect`：视口的宽高比（通常是 `width / height`）。
- `near` 和 `far`：相机视锥体的近裁剪面和远裁剪面的距离。

在使用透视相机时，当你更改了相机的 `fov`、`aspect`、`near` 或 `far` 等参数时，需要调用 `updateProjectionMatrix` 方法来更新相机的投影矩阵，以确保这些参数的变化能够正确反映到渲染结果中。

```javascript
camera.fov = newFov;
camera.aspect = newAspect;
camera.updateProjectionMatrix();
```

#### 2. 正交相机（`OrthographicCamera`）

```javascript
const camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
```

- `left`, `right`, `top`, `bottom`：相机视锥体的边界。
- `near` 和 `far`：相机视锥体的近裁剪面和远裁剪面的距离。

在使用正交相机时，当你更改了相机的 `left`, `right`, `top`, `bottom`, `near` 或 `far` 参数时，同样需要调用 `updateProjectionMatrix` 方法来更新相机的投影矩阵。

```javascript
camera.left = newLeft;
camera.right = newRight;
camera.updateProjectionMatrix();
```

### 使用场景

- **动态调整相机参数**：当需要动态改变相机的视角、视场角或者视口比例时，调用 `updateProjectionMatrix` 方法可以立即更新渲染效果，而不需要重新创建相机对象。
  
- **响应窗口大小变化**：在响应窗口大小变化时，通常会重新计算相机的 `aspect` 比例，并调用 `updateProjectionMatrix` 方法来保持投影效果的正确性。

- **动画和交互**：在处理动画或用户交互时，可能会动态调整相机的参数，例如通过滚轮缩放、拖动调整视角等操作，这时需要及时更新投影矩阵以确保用户能够正确看到更新后的场景。

通过理解和正确使用 `updateProjectionMatrix` 方法，可以更好地控制 Three.js 中相机的投影效果，从而达到预期的视觉效果和用户体验。