export class Storage{
    static getTodos(type){
      let list;
      if(localStorage.getItem(type)===null){
        list = [];
      }
      else{
        list = JSON.parse(localStorage.getItem(type))
      }
      return list;
    }
    static getNotCompletedTodos(type){
        return this.getTodos(type).filter((element)=>{
            return element.completed===false;
        })
    }
    static getCompletedTodos(type){
        return this.getTodos(type).filter((element)=>{
            return element.completed===true;
        })
    }
    static addTodos(type,data){
        let todos = this.getTodos(type);
        todos.push(data);
        localStorage.setItem(type,JSON.stringify(todos));
        this.getTodos(type);
    }
    static changeCompletedStatus(type,index,todo=null){
        let currentTodoList = this.getTodos(type);
        if(todo==null){
            let todo = currentTodoList[index];
            todo.completed = !todo.completed;
            localStorage.setItem(type,JSON.stringify(currentTodoList));
            this.getTodos(type);
        }
        else{
            let changedTodo = currentTodoList.find((item)=>{
                return item.createdAt === todo.createdAt;
            })
            currentTodoList.forEach((item)=>{
                if(item==changedTodo){
                    item.completed = false;
                }
            })
            localStorage.setItem(type,JSON.stringify(currentTodoList));
            
        }
        
    }
    static removeTodoFromStorage(type,todo){
        
        let todoList = this.getTodos(type);
        let newList = todoList.filter((element)=>{
            return !(element.content==todo.content &&element.createdAt==todo.createdAt)
        })
        localStorage.setItem(type,JSON.stringify(newList));
    }
}
