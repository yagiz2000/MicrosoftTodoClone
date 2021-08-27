<template>
  <div class="container">
    <Navigation/>
    <Main />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Main from "./components/Main.vue";
import { computed } from 'vue';
import {useStore} from "vuex";
export default {
  setup(){
    const store = useStore();
    let deger = computed(()=>{return store.getters.resHamBtn});
    let clickHamBtn = computed(()=>{return store.getters.isHamBtnClicked})
    return{deger,clickHamBtn}
  },

  components:{
    Navigation,
    Main
  }
}
</script>

<style>
*{
    margin:0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
}
::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent; 
  }
  ::-webkit-scrollbar-thumb {
    background: #555; 
  }
 
.container{
    position: relative;
    width: 100%;
}
ul{
  list-style: none;
}
</style>
