<template>
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
</template>
<script>
    import {ref} from 'vue';
    export default {
        emits: ['add-todo'],
        setup(props, context){
            const todo = ref('');
            const hasError = ref(false);

            const onSubmit = () => {
                if(todo.value === ''){
                    hasError.value = true; 
                }else{
                    // 자식컴포넌트에서 부모컴포넌트로 데이터를 보낼 때 사용
                    context.emit('add-todo' , {
                        id: Date.now(),
                        subject: todo.value,
                        completed: false,
                    });
                    hasError.value = false;
                    todo.value = '';
                }
            };
            return{
                todo,
                hasError,
                onSubmit,
            }
        }
    }
</script>