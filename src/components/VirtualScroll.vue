<template>
  <div class="container" :style="{ height: height }" ref="boxRef">
    <div :style="customStyle"></div>
    <div
      v-for="item in currentShowList"
      :key="item"
      :ref="(el: any) => (itemDom = el)"
      :style="{ position: 'absolute', left: 0, top: item?.top }"
    >
      <slot name="vItem" :itemData="item"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
  height: {
    type: String,
    default: '600px',
  },
});

const itemDom = ref(); // 某个list的dom
const customStyle = ref({ height: '', width: '' }); // 占位元素的样式
const currentShowList = ref<Array<any>>([]); // 视口展示的数据
currentShowList.value = props.list.slice(0, 1); // 首先展示一个用来获取listDom的宽高
const boxRef = ref(); // 滚动容器的dom
// 单个盒子的高度
let itemHeight = 0;
// 视口可显示的数量
let showNum = 0;

onMounted(() => {
  // 获取listDom的宽和高，然后赋值设置占位盒子的宽高
  const itemDomData = itemDom.value.getBoundingClientRect();
  customStyle.value.height = itemDomData.height * props.list.length + 'px';
  customStyle.value.width = itemDomData.width + 'px';
  // listDom的高度
  itemHeight = itemDomData.height;

  // 滚动容器的视口高度
  const viewHeight = boxRef.value.clientHeight;

  // 需要展示的list数量
  showNum = Math.ceil(viewHeight / itemDomData.height) + 1;

  // 赋值展示
  currentShowList.value = props.list.slice(0, showNum);
  // 更新位置信息
  updateListPosition();

  // 监听滚动容器的滚动事件
  boxRef.value.addEventListener(
    'scroll',
    (e: { target: { scrollTop: any } }) => {
      update(e.target.scrollTop);
    }
  );
});

// 更新
const update = throttle((top: number) => {
  updateShowData(top);
  updateListPosition(top);
}, 0);

// 更新展示的数据
const updateShowData = (top: number) => {
  const scrollH = Math.floor(top / itemHeight); //  滚动到了第几个
  currentShowList.value = props.list.slice(scrollH, scrollH + showNum);
};

// 更新列表位置
function updateListPosition(top = 0) {
  const diffTop = top % itemHeight; // 第一条数据的滚动差值
  currentShowList.value.forEach((item: any, index: number) => {
    item.top = top - diffTop + itemHeight * index + 'px'; // top是因为父元素是滚动的，所以需要加上scrollTop;
  });
}

// 节流
function throttle(fn: Function, delay: number) {
  let time: number = 0;
  return function (...agm: any) {
    const now = Date.now();
    if (now - time >= delay) {
      fn.apply(this, agm);
      time = now;
    }
  };
}
</script>

<style scoped>
.container {
  position: relative;
  left: 0;
  top: 0;
  overflow-y: scroll;
}
</style>
