<template>
  <div class="board">
    <BoardItem
      v-for="(cell, index) in cells"
      :key="cell + '' + index"
      :icon="cell"
      @mousedown="mousedown(index)"
      @mouseup="mouseup(index)"
      @mousemove="go(index)"
      :selected="checkRoad(index)"
      :closed="checkClosedRoad(index)"
    />
    <button @click="reset()">重置</button>
  </div>
</template>

<script>
import BoardItem from "./boardItem";
import { ref } from "vue";
export default {
  name: "BoardComponent",
  components: {
    BoardItem,
  },

  setup() {
    //宫格数据
    // const cells = ref([3,1,0,1,0,0,0,0,2,0,0,0,2,0,0,3])
    const cells = ref([
      "jiemutiantianquan",
      "liuliantiantianquan",
      0,
      "liuliantiantianquan",
      0,
      0,
      0,
      0,
      "caomeitiantianquan",
      0,
      0,
      0,
      "caomeitiantianquan",
      0,
      0,
      "jiemutiantianquan",
    ]);

    const path = ref([]); //路径数据
    const size = ref(4); //限定路径的移动范围
    const closedPath = ref([]); //已经走过的路径

    // 鼠标按下事件
    const mousedown = (index) => {
      // 1.如果按下的方格值存在(不为0)
      // 2.按下的位置不处于已连接路径数组closedPath内
      // 3.把按下位置的索引存到路径数组path中
      path.value = []; //确保操作，也可以去掉
      if (cells.value[index] && !checkClosedRoad(index)) {
        path.value.push(index);
      }
    };

    // 鼠标抬起事件
    const mouseup = (index) => {
      //1.起点path.value[0]和终点index不是同一个索引
      //2.起点和终点的值相同
      //3.把这条连线上的所有索引加到closedPath数组中（累加）
      //4.抬起时清空路径数组path
      //注意：值的改变全部要加上.value
      if (
        index !== path.value[0] && cells.value[index] === cells.value[path.value[0]]
      ) {
        closedPath.value = closedPath.value.concat(path.value);
      }
      path.value = [];
    };

    // 移动事件
    const go = (index) => {
      // 1.如果点击了某一个非空位置（path大于0），才可以移动
      // 2.取到按下路径的最后一个位置的索引，在某一个格子移动的方向只能是上下或者是左右，索引差距绝对值为1或者格子的宽度4
      // 3.如果格子处于已连接路径数组closedPath内，或者是移动路线的起点与终点值不匹配的时候，取消连线
      if (path.value.length) {
        const lastIndex = path.value[path.value.length - 1];
        if (
          Math.abs(lastIndex - index) === 1 || (Math.abs(lastIndex - index) === size.value && !checkClosedRoad(index))
        ) {
          path.value.push(index);
        }
        if (
          checkClosedRoad(index) || (cells.value[index] && cells.value[index] !== cells.value[path.value[0]])
        ) {
          path.value = [];
        }
      }
    };

    //检查路径
    const checkRoad = (index) => {
      //选择路线后格子的颜色会发生变化
      return path.value.findIndex((p) => p === index) > -1;
    };

    //标记已经走过走过的路径
    const checkClosedRoad = (index) => {
      return closedPath.value.findIndex((p) => p === index) > -1;
    };

    const reset = () => {
      path.value = [];
      closedPath.value = [];
    };

    return {
      cells,
      mousedown,
      mouseup,
      go,
      path,
      checkRoad,
      checkClosedRoad,
      reset,
    };
  },
};
</script>

<style>
  .board {
    width: 200px;
    height: 200px;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
  }
</style>