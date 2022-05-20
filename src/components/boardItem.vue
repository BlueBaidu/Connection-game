<template>
  <div class="board-item" :class="(selected ? 'selected ' : '') + (closed ? ' closed' : '')">
    <svg class="icon" aria-hidden="true" v-if="icon" style="width:40px">
      <use :xlink:href="'#icon-' + icon"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: "BoardItem",

  props: {
    //图表信息展示
    icon: {
      type: Number,
      require: false,
      default: 0,
    },
    //选中之后颜色发生变化
    selected: {
      type: Boolean,
      require: false,
      default: false,
    },
    // 路径已经走过就不能再走
    closed: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
};
</script>

<style>
  .board-item {
    border: 1px solid #2c3e50;
    width: 50px;
    height: 50px;
    user-select: none;
    /* 把盒子的边也算在总长宽里面 */
    box-sizing: border-box;
  }

  .selected {
    background-color: rgb(156, 154, 154);
  }

  .closed {
    background-color: lightgray;
  }
</style>