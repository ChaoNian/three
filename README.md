# three
three.js


创建 立方体
# UV 纹理技术 如何将二维纹理坐标映射到三维几何体的表面，以便正确地贴合纹理并实现所需的效果
  在 Three.js 中，UV 映射是一种用于在 3D 几何体表面上应用纹理的技术。UV 映射定义了如何将二维纹理坐标映射到三维几何体的表面，以便正确地贴合纹理并实现所需的效果。

    ### UV 映射的基本概念：

    1. **UV 坐标**：
    - UV 坐标是一种二维坐标系，通常表示为 (u, v)，用来描述纹理图像上的位置。与三维空间中的 XYZ 坐标相对应，UV 坐标确定了纹理在几何体表面上的位置和方向。

    2. **UV 映射的实现**：
    - 在 Three.js 中，每个几何体的顶点数据可以包含一个 UV 坐标数组。这些 UV 坐标告诉渲染器如何将纹理映射到几何体的表面。通常情况下，UV 坐标与顶点坐标是一一对应的，使得每个顶点都有一个对应的 UV 坐标。

    3. **纹理映射**：
    - 当渲染器绘制几何体时，会使用每个顶点的 UV 坐标来确定如何从纹理图像中获取颜色。UV 坐标指定了纹理坐标系中的位置，渲染器根据这些坐标从纹理图像中提取正确的颜色值，然后将其应用到几何体表面的对应区域。

    ### 在 Three.js 中使用 UV 映射的步骤：

    1. **创建几何体**：
    - 首先，创建一个几何体，可以是 Three.js 提供的内置几何体，也可以是通过自定义顶点数据构建的几何体。

    2. **定义 UV 坐标**：
    - 对于每个顶点，定义对应的 UV 坐标。通常，UV 坐标的范围是从 (0, 0) 到 (1, 1)，表示纹理图像的整个区域。

    3. **创建材质**：
    - 创建一个使用纹理的材质，如 `MeshBasicMaterial`、`MeshPhongMaterial` 或 `MeshStandardMaterial`。在材质中指定加载的纹理图像。

    4. **应用材质和纹理**：
    - 将创建的材质赋给几何体，确保几何体的每个顶点的 UV 坐标与纹理的映射是正确的。

    5. **渲染**：
    - 将几何体添加到场景中，并使用相机和渲染器来渲染场景。Three.js 的渲染器会根据 UV 坐标来正确地将纹理应用到几何体的表面上。

    ### 示例代码片段：

    ```javascript
    // 创建一个立方体几何体
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // 定义每个顶点的 UV 坐标
    geometry.faceVertexUvs[0] = [
        [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(1, 0),
            new THREE.Vector2(1, 1)
        ],
        [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(1, 1),
            new THREE.Vector2(0, 1)
        ],
        // ... 其他顶点的 UV 坐标
    ];

    // 加载纹理图像
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('textures/texture.png');

    // 创建材质，并将纹理赋给材质
    const material = new THREE.MeshBasicMaterial({ map: texture });

    // 创建网格对象，将几何体和材质结合起来
    const mesh = new THREE.Mesh(geometry, material);

    // 将网格对象添加到场景中
    scene.add(mesh);
    ```

    这段代码演示了如何创建一个立方体几何体，并为其定义 UV 坐标，然后加载一个纹理图像并应用到立方体上的材质中。

    通过理解和实践上述步骤，可以掌握在 Three.js 中使用 UV 映射的基本技术，从而有效地处理和应用纹理到 3D 几何体上。
# 法向量属性应用与法向量辅助器
# 几何体顶点转化、顶点位移、旋转、缩放
# 包围盒使用与世界矩阵转换
# 几何体居中与获取几何体中心
