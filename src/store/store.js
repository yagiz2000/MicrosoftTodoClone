import { createStore } from "vuex";
import { Storage } from "../Storage/storage";
const store = createStore({
  state(){
    return{
      resHamBtn: false,
      defaultTodos:Storage.getTodos("defaultTodos"),
      completedTodos:Storage.getCompletedTodos("defaultTodos"),
      page:"Günüm",
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
      return state.page
    }
  },
  mutations:{
    changeHamBtn(state){
      state.resHamBtn = !state.resHamBtn;
    },
    // eslint-disable-next-line no-unused-vars
    addTodos(state,payload){
      Storage.addTodos("defaultTodos",payload);
       state.defaultTodos = Storage.getTodos("defaultTodos") 
    },
    changeCompletedStatus(state,payload){
      Storage.changeCompletedStatus(payload.type,payload.index,payload.todo);
      state.defaultTodos = Storage.getTodos("defaultTodos");
      state.completedTodos = Storage.getCompletedTodos("defaultTodos");
    },
    removeTodo(state,payload){
      console.log("storedaki",payload.todo);
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
    }
  }
});
export default store;

