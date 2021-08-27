import { createStore } from "vuex";
import { Storage } from "../Storage/storage";
const store = createStore({
  state(){
    return{
      resHamBtn: false,
      defaultTodos:Storage.getTodos("defaultTodos"),
      completedTodos:Storage.getCompletedTodos("defaultTodos"),
      page:"Günüm",
      backGroundColor:"#7388DA",
      showModal:false
    }
  },
  getters: {
    resHamBtn(state) {
      return state.resHamBtn;
    },
    getDefaultTodos(state){
      return state.defaultTodos;
    },
    getCompletedTodos(state){
      return state.completedTodos;
    },
    getPage(state){
      return state.page;
    },
    getBackGroundColor(state){
      return state.backGroundColor;
    },
    getShowModal(state){
      return state.showModal;
    }
  },
  mutations:{
    changeHamBtn(state){
      state.resHamBtn = !state.resHamBtn;
    },
    // eslint-disable-next-line no-unused-vars
    addTodos(state,payload){
      if(state.page =="Önemli"){
        payload.isFav = true;
          Storage.addTodos("defaultTodos",payload);
          state.defaultTodos = Storage.getFavTodos();
      }else{
        Storage.addTodos("defaultTodos",payload);
        state.defaultTodos = Storage.getTodos("defaultTodos")
      }
      
    },
    changeCompletedStatus(state,payload){
      Storage.changeCompletedStatus(payload.type,payload.index,payload.todo);
    },
    removeTodo(state,payload){
      Storage.removeTodoFromStorage(payload.type,payload.todo);
      state.defaultTodos = Storage.getTodos("defaultTodos");
      state.completedTodos = Storage.getCompletedTodos("defaultTodos");
    },
    changeFavStatus(state,payload){
      Storage.changeFavStatusOfTodo(payload.type,payload.todo);
      state.defaultTodos = Storage.getTodos("defaultTodos");
      state.completedTodos = Storage.getCompletedTodos("defaultTodos");
    },
    changePageContent(state,payload){
      state.page = payload;
    },
    changeBackGroundColor(state,payload){
      state.backGroundColor = payload;
    },
    setTodosToFavTodos(state){
      state.defaultTodos = Storage.getFavTodos("defaultTodos");
      state.completedTodos = Storage.getCompletedTodos("defaultTodos");
    },
    setTodosToDefaultTodos(state){
      state.defaultTodos = Storage.getTodos("defaultTodos");
      state.completedTodos = Storage.getCompletedTodos("defaultTodos");
    },
    changeShowModal(state){
      state.showModal = !state.showModal;
    }
  }
});
export default store;

