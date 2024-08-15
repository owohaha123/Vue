<!-- html -->
<template>
  <div class="name">
    {{ name }}
  </div>
  <button class="btn btn-primary" v-on:click="updateName">Click</button>
</template>

<script>
//import {ref} from 'vue';
import { reactive } from 'vue';


export default {
  setup() {
    //let name = "goguma"; //값이 변해야 하니 let로 선언
    //const name = ref('goguma');
    const name = reactive({
      id: 1
    });

    // const greeting = (name) => {
    //   return "hello," + name;
    // };
    // const greet = greeting(name);

    const updateName = () => {
      //name = "gamza";
      //name.value = "gamza"; //ref 사용 시 value 붙여줘야 함 (기본 자료형 등 사용가능)
      name.id = 2; //reactive (object 나 array 만 사용 가능)
      console.log(name)
    };
    return {
      //greet,
      name,
      updateName
      //greeting,
    };
  },
};
</script>

<style>
.name {
  color: blue;
}
</style>
