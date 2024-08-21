<!-- html -->
<template>
  <p>단방향 바인딩</p>
  <div v-bind:class="nameClass">
    <!-- ref 사용 시 name.value 이런 식이 아닌 걍 name 으로 사용해준다-->
    {{ name }}
  </div>
  <!-- ref 사용 시 데이터 바인딩/ [v-bind:] 는 [:]로 생략가능-->
  <input v-bind:type="type" :value="name"/>
  <!-- [v-on:] 는 [@]로 생략가능 -->
  <button class="btn btn-primary" @click="updateName">Click</button>

  <p>양방향 바인딩</p>
  <input type="text" :value="name" @input="updateInput"/>
  <button class="btn btn-primary" @click="onSubmit">Click</button>

  <!-- 양방향바인딩 이해를 위한 앞선 설명들은 v-model 이면 뚝딱 대체됨  -->
  <input type="text" v-model="name" />

  
  <div class="container">
    <p>To-Do List</p>
    <form class="d-flex" @submit.prevent="onSubmit">
      <div class="flex-glow-1">
        <input class="form-control mr-2" type="text" v-model="todo" placeholder="new to-do"/>
      </div>
      <div>
        <button class="btn btn-primary" type="submit">add</button>
      </div>
    </form>
  
    <div class="card">
      <div class="card-body p-2">
        {{ todos[0].subject }}
      </div>
    </div>
    <div class="card">
      <div class="card-body p-2">
        {{ todos[1].subject }}
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
//import { reactive } from 'vue';


export default {
  setup() {
    //let name = "goguma"; //값이 변해야 하니 let로 선언
    const name = ref('goguma');
    const type = ref('number');
    const nameClass = ref('');
    const todo = ref('');
    const todos = ref([
      {id:1 , subject:'공부'},
      {id:2 , subject:'복습'}
    ]);
    // const name = reactive({
    //   id: 1
    // });

    // const greeting = (name) => {
    //   return "hello," + name;
    // };
    // const greet = greeting(name);

    const updateName = () => {
      //name = "gamza";
      name.value = "gamza"; //ref 사용 시 value 붙여줘야 함 (기본 자료형 등 사용가능)
      type.value = "text";
      nameClass.value = "name";
      //name.id = 2; //reactive (object 나 array 만 사용 가능)
      //console.log(name)
    };
    
    const onSubmit = () => {
      todos.value.push({
        id: Date.now(),
        subject: todo.value,
      })
    };

    const updateInput = (e) => {
      name.value = e.target.value;
    };

    return {
      //greet,
      name,
      updateName,
      //greeting,
      type,
      nameClass,

      onSubmit,
      updateInput,

      todo,
      todos,
    };
  },
};
</script>

<style>
.name {
  color: blue;
}
</style>
