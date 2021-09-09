<template>
   <div class="calendar" >
             <scroll-date-selector></scroll-date-selector>

            <div class="today">
                <h3>{{monthString}} {{year}}</h3>
                <div class="arrows">
                    <i @click="changeMonth('-')"  class="fas fa-chevron-up"></i>
                    <i  @click="changeMonth('+')" class="fas fa-chevron-down"></i>
                </div>
            </div>
            <div class="days-title">
                <div class="day">Pt</div>
                <div class="day">Sa</div>
                <div class="day">Ça</div>
                <div class="day">Pe</div>
                <div class="day">Cu</div>
                <div class="day">Ct</div>
                <div class="day">Pa</div>
            </div>
            <div class="days">
                <div v-for="(day,i) in dayz" :key="i" class="day-num"  
                @click="changeActiveDay(day)" 
                :class="[
                day.status=='passive'?'passive':'',
                (day.number==today &&day.status=='active'&&activeDay.month==thisMonth)?'today-active':'',
                (day.number==activeDay &&day.status=='active')?'active':'']">
                {{day.number}}</div>
            </div>
            <div v-if="type!=='extended'" class="buttons">
                <button class="button" @click="closeCalendar" id="cancelBtn">İptal</button>
                <button class="button"  id="saveBtn">Kaydet</button>
            </div>
            <div v-if="type==='extended'" class="bottom">
                <div class="hour-wrapper" @click="openScrollDateSelector">
                    <div class="hour-side" id="left">{{hour}}</div>
                    <div class="hour-side" id="right">{{minute}}</div>
                </div>
                <div class="buttons">
                    <button class="button" @click="closeCalendar" id="cancel">İptal</button>
                    <button class="button" id="save">Kaydet</button>
                </div>
            </div>
        </div>
</template>

<script>
import {ref,computed,watch} from "vue";
import { useStore } from 'vuex';
import ScrollDateSelector from "../components/ScrollDateSelector.vue";

export default {
    props:{
        type:String
    },
    setup(){
        let date = new Date()
        const store = useStore();
        console.log(store.getters.getTodoTime.minuteOfTodo)
        let year =ref(date.getFullYear());
        let hour = computed(()=>store.getters.getTodoTime.hourOfTodo);
        let minute = computed(()=>store.getters.getTodoTime.minuteOfTodo);
        let calendarStatus= computed(()=>store.getters.getCalendarShow)
        let dayz = computed(()=>{return days(thisMonth)});
        let months = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
        let monthString = computed(()=>months[thisMonth.value-1])
        let today =date.getDate();
        let activeDay = ref({today,status:"active",month:(date.getMonth()+1)});
        let thisMonth = ref((date.getMonth()+1));//Plus 1 because of indexing
        function closeCalendar(){
            let calendar = document.querySelector(".calendar");
            store.commit("changeCalendarOptionStatus");
            calendar.classList.remove("visible");
        }
        watch(thisMonth,(newValue,oldValue)=>{
            if(oldValue=="1"&&newValue=="0"){
                thisMonth.value = 12;
                year.value--;
            }
            if(oldValue=="12"&&newValue=="13"){
                thisMonth.value = 1;
                year.value++;
            }
        })
        function changeMonth(sign) {
            if(sign=='+'){
                thisMonth.value++
            }
            else{
                thisMonth.value--;
        }
        }
        function changeActiveDay(day){
            if(day.status=="active"){
                activeDay.value = day.number;
            }
        }
        function days() {//Month gerçek month olacak
            let prevMonthCounter = new Date(year.value,thisMonth.value-1,0).getDate()
            let firstDays = [];
            for(let i= prevMonthCounter; i>=1;i--){
                let day = new Date(year.value, thisMonth.value-2,i)
                firstDays.push({number:day.toString().split(" ")[2],status:'passive'});
                if(day.toString().split(" ")[0]=="Mon"){
                    break;
                }
            }
            let firstDaysReversed = firstDays.reverse();
            let middleDays = [];
            let thisMonthCounter = new Date(year.value, thisMonth.value,0).getDate();
            for(let i = thisMonthCounter; i>=1;i--){
                let day2 = new Date(year.value, thisMonth.value-1,i);
                middleDays.push({number:day2.toString().split(" ")[2],status:"active"})
            }
            let middleDaysReversed= middleDays.reverse();
            let nowaDays = [...firstDaysReversed,...middleDaysReversed];
            let remaningDays = 42-nowaDays.length;
            for(let i=1; i<=remaningDays; i++){
              nowaDays.push({number:i.toString(),status:'passive'});
            }
          return nowaDays;
        }
        function openScrollDateSelector(){
            let scrollDateSelector = document.querySelector("#scrollDateContainer");
            console.log(scrollDateSelector);
            scrollDateSelector.classList.add("visible");
        }
    return{days,dayz,today,activeDay,changeActiveDay,changeMonth,thisMonth,monthString,year,calendarStatus,closeCalendar,openScrollDateSelector,hour,minute}
    },
    components:{
        ScrollDateSelector,
    }
}
</script>

<style scoped>
.calendar{
    display: none;
    position: absolute;
    bottom:75px;
    right:50px;
    width: 250px;
    background-color: white;
    border-radius: 5px;
    z-index: 500000000;
    padding:10px
}
.calendar.visible{
    display: block;
}
.today{
    display: flex;
    justify-content: space-between;
}
.today h3{
    font-weight: 500;
}
.today .arrows{
    display: flex;
    justify-content: space-between;
    width: 35px;
}

.days-title{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    margin: 10px 0;
}
.days{
    display: grid;
    grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
}
.day{
    font-size: 0.8em;
    display: flex;
    justify-content: center;
    align-items: center;
}

.day-num{
    display: flex;
    justify-content: center;
    align-items: center;
    border:1px;
    width:30px;
    height: 30px;
    margin: 1.5px;
}
.day-num:hover{
    border: 2px solid grey;
}
.passive{
    background-color: #EEEEEE;
}
.buttons{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
}
.buttons .button{
    width: 110px;
    height: 25px;
    outline: none;
    font-weight: 700;
    border: 0px solid ;
}
#saveBtn{
    color: white;
    background-color: #0373F3;
}
.today-active{
    background-color: #0373F3;
    color: white;
}
.active{
      outline: 3px solid #0373F3;
    z-index: 500000001;
    outline-offset: 1.5px;
    color: black;
}
.bottom{
    width:230px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.bottom .hour-wrapper {
    display: flex;
    margin-top: 10px;
    height: 30px;
    width: 230px;
    border: 1px solid black;
    align-items: center;
    border-radius: 3px;
}
.bottom .hour-wrapper #left{
  border-right: 1px solid rgb(185, 172, 172);
}
.bottom .hour-wrapper .hour-side{
    width: 115px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.bottom .buttons{
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    width: 230px;
}
.bottom .buttons .button{
    width: 110px;
    border: 1px solid transparent;
    padding: 5px 0;
    font-size: 15px;   
}
.bottom .buttons #save{
    background-color: blue;
    border:1px solid blue;
    color: white;
}
.bottom .buttons .button:hover{
    border: 1px solid black;

}
</style>