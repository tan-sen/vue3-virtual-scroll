# 一个简单的 vue3 虚拟滚动盒子

## 参数

| **名称** | **类型** | **是否必须** | **默认值** |       **说明**        |
| :------: | :------: | :----------: | :--------: | :-------------------: |
|   list   |  Array   |     true     |     /      |    需要展示的数据     |
| list-key |  String  |     true     |     /      | list 中唯一的属性名称 |
|  height  |  String  |    false     |   600px    |      容器的高度       |

## 插槽

| **名称** | **是否必须** |                **说明**                 |
| :------: | :----------: | :-------------------------------------: |
|  vItem   |     true     | 回调参数`itemData`,值为 list 中的元素值 |

## 导入方法

全局导入

```
 // 在main.ts中
import { createApp } from 'vue';
import App from './App.vue';
import VirtualScroll from 'vue3-virtual-scroll-container';

createApp(App).use(VirtualScroll).mount('#app');
```

组件内引入

```
import { VirtualScroll } from 'vue3-virtual-scroll-container';
```

## 使用示例

```
<template>

  <div>

    <VirtualScroll :list="list" list-key="key" height="700px">

      <template #vItem="{ itemData }">

        <div class="flex py-[20px] w-[500px]">

          <span>头像{{ itemData?.key  }}</span>

        </div>

      </template>

    </VirtualScroll>

  </div>

</template>



<script setup lang="ts">

import { VirtualScroll } from 'vue3-virtual-scroll-container';

import { ref } from 'vue';

const list = ref<any>([]);

list.value = new Array(2000);

list.value.fill(1);

list.value.forEach((_: any, index) => {

  list.value[i] = { key: Math.floor(Math.random() * 1000) };

});
</script>



<style scoped></style>
```
