<style>
  .summary{display: none;}
</style>
<template>
    <div class="summary">  
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

    <!-- computed -->
    <h4>count : {{ count }}</h4>
    <h4>double count computed : {{ doubleCountComputed }}</h4>
    <h4>double count computed : {{ doubleCountComputed }}</h4>
    <h4>double count method : {{ doubleCountMethod() }}</h4>
    <h4>double count method : {{ doubleCountMethod() }}</h4>
    <button @click="count++">add one</button>
  </div> 
</template>

<script>
  import {ref,computed} from 'vue';
  //import {watchEffect,reactive} from 'vue';

  export default {
    setup() {
      //let name = "goguma"; //값이 변해야 하니 let로 선언
      const name = ref('goguma');
      const type = ref('number');
      const nameClass = ref('');
      const toggle = ref(false);

      // const name = reactive({
      //   id: 1
      // });

      // const greeting = (name) => {
      //   return "hello," + name;
      // };
      // const greet = greeting(name);

      // const a = reactive({b:1});

      // watchEffect(() => {
      //   console.log(a.b)
      // })
      // a.b = 4;

      const updateName = () => {
        //name = "gamza";
        name.value = "gamza"; //ref 사용 시 value 붙여줘야 함 (기본 자료형 등 사용가능)
        type.value = "text";
        nameClass.value = "name";
        //name.id = 2; //reactive (object 나 array 만 사용 가능)
        //console.log(name)
      };

      
      const updateInput = (e) => {
        name.value = e.target.value;
      };

      
      const onToggle = () => {
        toggle.value = !toggle.value;
      };
      
      //computed 와 함수의 차이
      //1.인자를 받아올 수 없음 (=(name)=>)
      //2.computed 는 값을 cash하여 저장함
      const count = ref(1);
      const doubleCountComputed = computed(()=>{
        //console.log('computed');//두 번 호출했으나 한 개의 log 만 찍힘
        return count.value * 2;
      })

      const doubleCountMethod = ()=> {
        //console.log('method');
        return count.value * 2;
      };
    return{
      //greet,
      name,
      updateName,
      //greeting,
      type,
      nameClass,
      updateInput,
      toggle,
      onToggle,

      count,
      doubleCountComputed,
      doubleCountMethod
    }
  }
}
</script>

<style>

</style>