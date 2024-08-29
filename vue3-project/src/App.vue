<!-- html -->
<template>
  <SummaryCode />
  
  <div class="container">
    <h3>To-Do List</h3>
    
    <input class="form-control mr-2" type="text" v-model="searchText" @keyup.enter="searchTodo" placeholder="Search"/>
    <hr/>
    <!-- form component 생성 -->
    <TodoSimpleForm @add-todo="addTodo"/>
    <div>{{  error }}</div>

    <div v-if="!todos.length">There is nothing to display</div>

    <TodoList :todos="todos" @toggle-todo="toggleTodo" @del-todo="delTodo"/>

    <hr/>

    <!-- pagination -->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="currentPage !== 1" class="page-item">
          <a class="page-link" @click="getTodos(currentPage - 1)" href="#">
            Previous
          </a>
        </li>
        <li v-for="page in numberOfPages" :key="page" :class="currentPage === page ? active : ''"  class="page-item">
          <a class="page-link" @click="getTodos(page)" href="#">{{page}}</a>
        </li>
        <li v-if="numberOfPages !== currentPage" class="page-item">
          <a class="page-link" @click="getTodos(currentPage + 1)" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>

</template>

<script>
import {ref, computed, watch} from 'vue';
import SummaryCode from './components/SummaryCode.vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios'; //비동기방식(비순차)

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
    const searchText = ref('');
    const numberOfTodos = ref(0);
    let limit = 5;
    const currentPage = ref(1);
    const numberOfPages = computed(()=>{
      return Math.ceil(numberOfTodos.value/limit);
    });

    const getTodos = async(page = currentPage.value) => {
      currentPage.value = page;
      try{
        const res = await axios.get(`http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`);
        numberOfTodos.value = res.headers['x-total-count'];
        todos.value = res.data;
      }catch(err){
        error.value = 'ERROR';
      }
    }
    
    getTodos();

    // 콜백 지옥 방지를 위해 async/await 사용
    // async : 함수 자체를 비동기화
    // async로 function 선언, 기다려야하는 작업에 await --> 순차적 진행 굿
    const addTodo = async(todo) => {
      //db에 todo 저장 
      error.value = '';
      try{
        //const res = await axios.post('http://localhost:3000/todos', {
        await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed : todo.completed,
        });
        getTodos(1);
        //todos.value.push(res.data);
      }catch(err){
        error.value = 'ERROR';
      }

      // .then(res => { //응답 후
      //   console.log(res);
      //   todos.value.push(res.data);
      // }).catch(err => {
      //   console.log(err);
      //   error.value = 'ERROR';
      // });
    };

    const delTodo = async(index) => {
      error.value = '';
      const id = todos.value[index].id;
      try{
        await axios.delete('http://localhost:3000/todos/' + id);
        getTodos(1);
        //todos.value.splice(index, 1);
      }catch(err){
        error.value = 'ERROR';
      }
    }
    
    const toggleTodo = async(index) => {
      const id = todos.value[index].id;
      try{
        //patch: 일부수정 / put: 전체수정
        await axios.patch('http://localhost:3000/todos/' + id, {
          completed: !todos.value[index].completed
        });
        todos.value[index].completed = !todos.value[index].completed;
      }catch(err){
        error.value = 'ERROR';
      }
    };

    // const filteredTodos = computed(()=>{
    //   if(searchText.value){
    //     return todos.value.filter(todo => {
    //       return todo.subject.includes(searchText.value);
    //     });
    //   }

    //   return todos.value;
    // });

    let timeout = null;
    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1); 
    }
    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getTodos(1);  
      },2000)//2s
    });

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray',
    }

    return {
      addTodo,

      //todo,
      todos,
      //hasError,

      todoStyle,
      delTodo,

      toggleTodo,

      searchText,
      //filteredTodos,
      error,

      numberOfPages,
      currentPage,

      getTodos,
      searchTodo,
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
