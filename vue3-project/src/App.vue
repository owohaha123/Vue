<!-- html -->
<template>
  <div class="summary" style="display: none;">  
    <div>
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
    </div>

    <div>
      <div v-show="toggle">true</div>
      <div v-show="!toggle">false</div>
      <button @click="onToggle">Toggle</button>

      <!-- v-show 는 초기 렌더비용이 좀 더 든다 -->
      <div v-if="toggle">true</div>
      <div v-else>false</div>
      <button @click="onToggle">Toggle</button>
    </div>
  </div> 
  
  <div class="container">
    <h3>To-Do List</h3>
    <form @submit.prevent="onSubmit">
      <div class="d-flex">
        <div class="flex-glow-1">
          <input class="form-control mr-2" type="text" v-model="todo" placeholder="new to-do"/>
        </div>
        <div>
          <button class="btn btn-primary" type="submit">add</button>
        </div>      
      </div>
      <!-- v-show 사용해도 좋음 -->
      <div v-if="hasError" style="color: red;">this field connot empty</div>
    </form>
    
    <div v-if="!todos.length">empty todo</div>
    <!-- v-for : array 데이터 반복 노출 -->
    <div class="card mt-2" v-for="(todo, index) in todos" :key="todo.id">
      <div class="card-body p-2 d-flex aline-items-center">
        <div class="form-check flex-grow-1">
          <input class="form-check-input" type="checkbox" v-model="todo.completed">
          <!-- <label class="form-check-label" :style="todo.completed ? todoStyle : {}"> -->
          <label class="form-check-label" :class="{ todo: todo.completed}">
            {{ todo.subject }}
          </label>
        </div>
        <div>
          <button class="btn btn-danger btn-sm" @click="delTodo(index)">
            delete
          </button>
        </div>
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
    const todos = ref([]);
    const toggle = ref(false);
    const hasError = ref(false);
    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray',
    }

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
      if(todo.value === ''){
        hasError.value = true;
      }else{
        todos.value.push({
          id: Date.now(),
          subject: todo.value,
          completed: false,
        });
        hasError.value = false;
        todo.value = '';
      }
    };

    const updateInput = (e) => {
      name.value = e.target.value;
    };

    const onToggle = () => {
      toggle.value = !toggle.value;
    }

    const delTodo = (index) => {
      todos.value.splice(index, 1);
    }

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

      toggle,
      onToggle,
      hasError,

      todoStyle,
      delTodo
    };
  },
};
</script>

<style>
  .name {
    color: blue;
  }
  .todo {
    color: gray;
    text-decoration: line-through;
  }
</style>
