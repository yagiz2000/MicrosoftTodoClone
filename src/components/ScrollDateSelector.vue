<template>
<div class="container" id="scrollDateContainer">
    <div class="wrapper" style="margin:0">
      <div class="side" id="left" ref="scrollLeft">     
          <div class="rects" v-for="(num,i) in  leftNums" :class="{'selected':num==hour}" @click="setHour(num)" :key="i">{{num}}</div>
      </div>
      <div class="side" id="right">
          <div class="rects" v-for="(num,i) in rightNums" :class="{'selected':num==minute}" @click="setMinute(num)" :key="i">{{num}}</div>
      </div>
  </div>
  <div class="buttons">
          <div @click="setTodoTime" class="button">
            <i class="fas fa-check"></i>
          </div>
          <div @click="closeScrollDateSelector" class="button">
              <i class="fas fa-times"></i>
          </div>
      </div>
  
</div>
  
</template>

<script>
import {/* onMounted, */  ref} from "vue";
import {useStore} from "vuex";

export default {
    setup(){
        let scrollLeft = ref(null);
        const store = useStore();
        let hour = ref(null);
        let minute = ref(null);
        let leftNums = ref(generateNumbers(23));
        let rightNums = ref(generateNumbers(59))
        function generateNumbers(limit){
            let list=[];
            for(let i=0;i<=limit;i++){
                if(i<10){
                    let difNum = "0"+i;
                    list.push(difNum);
                }
                else{list.push(i);}
            }
            return list;
        }
        const setMinute = (min)=> minute.value = min;
        const setHour = (hourVal)=>hour.value = hourVal;
        const setTodoTime = ()=>store.commit("setHourAndMinuteForTodo",{hour:hour.value,minute:minute.value});

        function closeScrollDateSelector(){
            let scrollDate = document.getElementById("scrollDateContainer");
            scrollDate.classList.remove("visible");
        }
        

        /* onMounted(() => {
            let iHeight = 50;
            (function scrollStop (callback, refresh = 66) {

                // Make sure a valid callback was provided
                if (!callback || typeof callback !== 'function') return;

                // Setup scrolling variable
                let isScrolling;

                // Listen for scroll events
                scrollLeft.value.addEventListener('scroll', function () {

                    // Clear our timeout throughout the scroll
                    clearTimeout(isScrolling);

                    // Set a timeout to run after scrolling ends
                    isScrolling = setTimeout(callback, refresh);

                }, false);

            })(() => {
                let mod = scrollLeft.value.scrollTop % iHeight;
                if(mod > 0) {
                    scrollLeft.value.scrollTop = scrollLeft.value.scrollTop - mod;
                }

                let iPassed = Math.floor(scrollLeft.value.scrollTop / iHeight) + 3;

                console.log(leftNums.value[iPassed], iPassed)
            })
        }) */
        return{generateNumbers,leftNums,rightNums,scrollLeft,closeScrollDateSelector,setTodoTime,setMinute,hour,minute,setHour};
    }
}
</script>

<style scoped>
#scrollDateContainer{
    position: absolute;
    top: -200px;
    left: -25px;
    display: inline-block;
    position: absolute;
    width: auto;
    z-index: 9999999999999999999;
    display: none;

}
#scrollDateContainer.visible{
    display: flex;
    flex-direction: column;
}
.buttons{
    display: flex;
    justify-content: space-between;
    background-color: white;
}
.buttons .button{
    border-top: 3px solid grey;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 50px;
}
.buttons .button:hover{
    background-color: #EEEEEE;
}           

/* .container .bottom{
    width:300px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.container .bottom .hour-wrapper {
    display: flex;
    margin-top: 10px;
    height: 30px;
    width: 270px;
    border: 1px solid black;
    align-items: center;
    border-radius: 3px;
}
.container .bottom .hour-wrapper #left{
  border-right: 1px solid rgb(185, 172, 172);
}
.container .bottom .hour-wrapper .hour-side{
    width: 135px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.container .bottom .buttons{
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    width: 270px;

}
.container .bottom .buttons .button{
    width: 130px;
    border: none;
    padding: 5px 0;
    font-size: 15px;
    
}
.container .bottom .buttons #save{
    background-color: blue;
    border:1px solid blue;
    color: white;
}
.container .bottom .buttons #save:hover{
    border: 1px solid black;
}
.container .bottom .buttons #cancel:hover{
    border: 1px solid black;
} */

.wrapper{
    display: flex;
    width: 300px;
    height: 350px;
    background-color: white;
}
.side{
    width: 149px;
    height: 350px;
    overflow-y:scroll;
    overflow-x:hidden;
    scroll-behavior: smooth;
}
#left{
    border-right: 1.5px solid grey;
}
#right{
    border-left: 1.9px solid grey;
}
.side::-webkit-scrollbar{
    display: none;
}
.rects{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 149px;
    height: 50px;
}
.rects.selected{
    background-color: #c2c1c1;
}
.rects:hover{
    background-color: #EEEEEE;
}
.rects.active{
    background-color: grey;

}

</style>
