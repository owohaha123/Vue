<!-- vue 입력 후 첫번째 꺼 선택 시 기본템플릿 -->
<template>
    <!-- v-for : array 데이터 반복 노출 -->
    <div class="card mt-2" v-for="(todo, index) in todos" :key="todo.id">
      <div class="card-body p-2 d-flex aline-items-center">
        <div class="form-check flex-grow-1">
            <!-- one-way binding 이슈로 value 로 변경 -->
            <input class="form-check-input" type="checkbox" :checked="todo.completed" @change="toggleTodo(index)">
            <!-- <input class="form-check-input" type="checkbox" v-model="todo.completed"> -->
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
</template>

<script>
export default {
    //props: ['todos']
    //props: one-way binding 
    //따라서 props 로 받은 값을 자식 컴포넌트에서 변경하면 안된다
    props: {
        todos: {
            type: Array,
            required: true
        }
    },
    emits: ['toggle-todo','del-todo'],
    //context 대신 {emit}으로 간단히 가져올 수 있음
    setup(props, {emit}){
        const toggleTodo = (index) => {
            emit('toggle-todo',index);
        };

        const delTodo = (index) => {
            emit('del-todo',index);
        }

        return {
            toggleTodo,
            delTodo
        }
    }
}
</script>

<style>

</style>