<template>
  <div>
    <VirtualScroll :list="list" height="700px" style="width: 800px">
      <template #vItem="{ itemData }">
        <div class="flex py-[20px] w-[500px]">
          <div
            class="w-[100px] h-[100px] flex items-center justify-center mr-[10px]"
            :style="{ background: itemData?.color, color: '#fff' }"
          >
            头像{{ itemData?.index + 1 }}
          </div>
          <div>
            <p>
              <span>序号：</span> <span>{{ itemData?.index + 1 }}</span>
            </p>
            <p>
              <span>数量：</span> <span>{{ itemData?.num }}</span>
            </p>
            <p>
              <span>时间：</span> <span>{{ itemData?.date }}</span>
            </p>
          </div>
        </div>
      </template>
    </VirtualScroll>
  </div>
</template>

<script setup lang="ts">
import VirtualScroll from './components/VirtualScroll.vue';
import { ref } from 'vue';
const list = ref([]);
list.value = new Array(2000);
list.value.fill(1);
list.value.forEach((_: any, i: number) => {
  list.value[i] = { index: i, ...createDataObj() };
});

function createDataObj() {
  return {
    color: getRandomColor(),
    num: Math.floor(Math.random() * 1000),
    date: new Date(),
  };
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  while (color.length < 7) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
</script>

<style scoped></style>
