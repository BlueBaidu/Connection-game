<template>
  <div class="div-container">
    <!-- 1、响应式的input输入框 -->
    <div class="div1">
      <h2>例子1</h2>
      <h2>值：{{ msg }}</h2>
      <input type="text" v-model="msg" />
    </div>
    <!--2、 响应式值的变化 -->
    <div class="div2">
      <h2>例子2</h2>
      <h2>值：{{ count }}</h2>
      <button @click="increment" style="width: 50px; height: 30px">加一</button>
    </div>
    <!-- 3、对象使用响应式的写法 -->
    <div class="div3">
      <button @click="increment3" style="width: 150px; height: 30px">
        加一之后是：{{ count3 }}
      </button>
      <button @click="incrementObj('foo')" style="width: 150px; height: 30px">
        加一之后是：{{ numbers.foo }}
      </button>
      <button @click="incrementObj('bar')" style="width: 150px; height: 30px">
        加一之后是：{{ numbers.bar }}
      </button>
      <h2>computed计算的总计是：{{ total }}</h2>
      <ul>
        <li v-for="item in history" :key="item">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch, watchEffect } from "vue";
export default {
  setup() {
    // 第一个例子
    const msg = ref("初始化值"); //ref是一种响应式的api，当input绑定的msg发生变化的时候，h2中的msg会自动更新，支持基础类型：string,number,boolean，数组

    // 第二个例子
    const count = ref(0); //对响应式的对象进行自增操作，类似于react的.current
    function increment() {
      console.log(count);
      count.value++;
    }

    //第三个例子
    const count3 = ref(0);
    const history = ref([]);
    const numbers = reactive({
      //对象使用reactive api
      foo: 0,
      bar: 0,
    });
    const total = computed(() => {
      //计算属性computed的使用
      return count3.value + numbers.foo + numbers.bar;
    });
    function increment3() {
      count3.value++;
    }
    function incrementObj(items) {
      numbers[items]++;
    }
    //watch监听
    watch(
      numbers,
      (newValue, oldValue) => {
        // newValue和oldValue是reacive对象，永远相同
        if (oldValue) {
          console.log(`foo: ${oldValue.foo} -> ${newValue.foo}`);
          console.log(`foo: ${oldValue.bar} -> ${newValue.bar}`);
        }
      },
      {
        immediate: true,
      }
    );
    watch(
      [count3],
      (newValue, oldValue) => {
        // newValue和oldValue是reacive对象，永远相同
        if (oldValue !== newValue) {
          history.value.push(`count: ${oldValue} -> ${newValue}`);
        }
      },
      {
        immediate: true,
      }
    );
    watchEffect(() => {
      //只会监听count的变化
      console.log(count.value);
    });

    return {
      msg,
      count, //注意count也需要返回
      increment,
      count3,
      numbers,
      total,
      increment3,
      incrementObj,
      history
    };
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .div-container {
    display: flex;
    flex-direction: row;
  }

  .div1 {
    background-color: pink;
    width: 500px;
    height: 200px;
  }

  .div2 {
    background-color: goldenrod;
    width: 500px;
    height: 200px;
  }

  .div3 {
    background-color: lightseagreen;
    width: 500px;
    height: 200px;
  }
</style>
