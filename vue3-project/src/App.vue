<!-- html -->
<template>
  <SummaryCode />
  
  <div class="container">
    <h3>To-Do List</h3>

    <!-- form component 생성 -->
    <TodoSimpleForm @add-todo="addTodo"/>

    <div v-if="!todos.length">empty todo</div>

    <TodoList :todos="todos" @toggle-todo="toggleTodo" @del-todo="delTodo"/>
  </div>

</template>

<script>
import {ref} from 'vue';
import SummaryCode from './components/SummaryCode.vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
//import { reactive } from 'vue';


export default {
  components:{
    SummaryCode,
    TodoSimpleForm,
    TodoList
  },
  setup() {
    //const todo = ref('');
    const todos = ref([]);
    //const hasError = ref(false);
    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray',
    }
    
    const addTodo = (todo) => {
      todos.value.push(todo);
    };

    const delTodo = (index) => {
      todos.value.splice(index, 1);
    }
    
    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed;
    };

    return {

      addTodo,

      //todo,
      todos,
      //hasError,

      todoStyle,
      delTodo,

      toggleTodo,
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
