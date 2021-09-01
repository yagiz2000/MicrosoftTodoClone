<template>
<div class="wrapper">
<div class="modal" >
      <div class="title">
          <h2>Görevi sil</h2>
      </div>
      <div class="content" >
          <p>{{todoy.content}} kalıcı olarak silinecek"</p>
      </div>
      <div class="buttons" style="align-self:center">
          <button class="modal-btn" @click="handleModal('delete')" id="deleteBtn">Sil</button>
          <button class="modal-btn" @click="handleModal('cancel')" id="cancelBtn">İptal</button>
      </div>
  </div>
</div>
  
</template>

<script>
import {ref,computed} from "vue";
import { useStore } from 'vuex';

export default {
    props:{
        todo:Object
    },
    setup(props){
        const store = useStore();
        let pageHeader = computed(()=>{return store.getters.getPage})
        
        let todoy = ref(props.todo);
        function handleModal(answer){
            let payload={type:"defaultTodos",todo:todoy.value};
            if(answer =="delete"){
                if(pageHeader.value=="Önemli"){
                    store.commit("removeTodo",payload);
                    store.commit("setTodosToFavTodos");
                    store.commit("changeShowModal");
                }
                else{
                    store.commit("removeTodo",payload);
                    store.commit("setTodosToDefaultTodos");
                    store.commit("changeShowModal");
                }
            }
            else{
              store.commit("changeShowModal");
            }

        }
        return {todoy,pageHeader,handleModal}
    }
}
</script>

<style scoped>
.wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal{
    position: fixed;
    top: 30%;
    display: flex;
    flex-direction: column;
    width: 300px;
    min-height: 200px;
    justify-content: space-around;
    align-items:flex-start;
    background: white;
    border-radius: 5px;
    padding: 10px;
    z-index: 200000000000000;
}
.modal .content{
    overflow-wrap: anywhere;
}
.modal-btn{
    cursor: pointer;
    border: none;
    width: 100px;
    height: 30px;
    font-weight: 600;
}
#deleteBtn{
    background-color: rgb(214, 20, 20);
    margin-right: 20px;
    color: white;
    outline: none;
    letter-spacing: 1.5px;
}
#cancelBtn{
    outline-width: 0.5px;
    letter-spacing: 1.2px;
}
#cancelBtn:hover{
    outline: auto;
}
</style>