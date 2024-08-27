<!-- html -->
<template>
  <SummaryCode />
  
  <div class="container">
    <h3>To-Do List</h3>
    
    <input class="form-control mr-2" type="text" v-model="searchText" placeholder="Search"/>
    <hr/>
    <!-- form component 생성 -->
    <TodoSimpleForm @add-todo="addTodo"/>
    <div>{{  error }}</div>

    <div v-if="!filteredTodos.length">There is nothing to display</div>

    <TodoList :todos="filteredTodos" @toggle-todo="toggleTodo" @del-todo="delTodo"/>
  </div>

</template>

<script>
import {ref,computed} from 'vue';
import SummaryCode from './components/SummaryCode.vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';
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
    const error = ref('');
    //const hasError = ref(false);
    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray',
    }
    
    const addTodo = (todo) => {
      //db에 todo 저장 
      error.value = '';
      axios.post('http://localhost:3000/todos', {
        subject: todo.subject,
        completed : todo.completed,
      }).then(res => { //응답 후
        console.log(res);
        todos.value.push(res.data);
      }).catch(err => {
        console.log(err);
        error.value = 'ERROR';
      });
    };

    const delTodo = (index) => {
      todos.value.splice(index, 1);
    }
    
    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed;
    };

    const searchText = ref('');
    const filteredTodos = computed(()=>{
      if(searchText.value){
        return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value);
        });
      }

      return todos.value;
    });

    return {
      addTodo,

      //todo,
      todos,
      //hasError,

      todoStyle,
      delTodo,

      toggleTodo,

      searchText,
      filteredTodos,
      error,
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
