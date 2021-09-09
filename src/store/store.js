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
      showModal:false,
      calendarOptionShow:false,
      todoTime:{
        hourOfTodo:10,
        minuteOfTodo:10
      }
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
    },
    getCalendarOptionShow(state){
      return state.calendarOptionShow;
    },
    getTodoTime(state){
      return state.todoTime;
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
    },
    changeCalendarOptionStatus(state){
      state.calendarOptionShow = !state.calendarOptionShow;
    },
    setHourAndMinuteForTodo(state,payload){
      let hour = typeof payload.hour=== "string" ? parseInt(payload.hour) : payload.hour;
      let minute = typeof payload.minute=== "string" ? parseInt(payload.minute) : payload.minute;
      state.todoTime.hourOfTodo = hour;
      state.todoTime.minuteOfTodo = minute;
    }
  }
});
export default store;

