/* eslint-disable no-empty */
/* eslint-disable no-empty */
<template>
  <div class="main" :style="{'--mainBgColor':backGroundColor}" @click="toggleOutside">
      <Modal v-if="showModal" :todo="selectedTodoByRighClk" />
            <div class="content" @click="closeContext" >
                <div id="context-menu" >
                    <div class="item">
                        <span class="icon"><i class="far fa-sun"></i></span>
                        <span class="text">Günüm görünümünden kaldır</span>
                    </div>
                    <div class="item">
                        <span class="icon"><i class="far fa-star"></i></span>
                        <span class="text">Önemli olarak işaretle</span>

                    </div>
                    <div class="item">
                        <span class="icon"><i class="far fa-check-circle"></i></span>
                        <span class="text">Tamamlandı olarak işaretle</span>
                    </div>
                    <hr>
                    <div class="item">
                        <span class="icon"><i class="fas fa-calendar-day"></i></span>
                        <span class="text">Son tarihi bugün</span>
                    </div>
                    <div class="item">
                        <span class="icon"><i class="far fa-calendar-minus"></i></span>
                        <span class="text">Son tarihi yarın</span>

                    </div>
                    <div class="item">
                        <span class="icon"><i class="far fa-calendar-check"></i></span>
                        <span class="text">Tarih Seçin</span>
                    </div>
                    <hr>
                    <div class="item">
                        <span class="icon"><i class="far fa-folder-open"></i></span>
                        <span class="text">Görevi şuraya taşı</span>    
                    </div>
                    <div class="item" @click="removeTodo" style="color:red">
                        <span class="icon"><i class="far fa-trash-alt"></i></span>
                        <span class="text">Görevi Sil</span>
                    </div>                    
                </div>
                <div class="top-info">
                    <div class="days-info">
                        <ul>
                            <li id="responsiveButton"  @click="toggleSideBar()"><i class="fas fa-bars"></i></li>
                            <li><h3><i v-if="pageHeader==='Önemli'" class="far fa-star"></i> {{pageHeader}}</h3></li>
                            <li v-if="pageHeader=='Günüm'"><p> {{getDay()}}</p></li>
                        </ul>
                    </div>
                    <div class="options">
                        <a href="#" class="lamp"><i class="far fa-lightbulb"></i></a>
                        <a href="#" class="dots" @click="openToggleMenu"><i class="fas fa-ellipsis-h"></i></a>
                        <div class="toggle-menu" ref="toggleMenu" >
                            <div @click="opentToggleSideMenu" class="hover-menu">
                                <span class="icon"><i class="fas fa-sort-amount-down-alt"></i></span>
                                <span class="text">Sıralama Ölçütü</span>
                                <span class="arrow"></span>
                            </div>
                            <div class="color-options">
                                <h4 style="padding-left: 10px;">Tema</h4>
                                <div class="colors">
                                    <div  @click="changeBg('#7388DA',0)" class="color-box" :class="{'active':boxIndex===0}" id="blue"></div>
                                    <div  @click="changeBg('#368E68',1)" class="color-box" :class="{'active':boxIndex===1}" id="green"></div>
                                    <div  @click="changeBg('#A968AA',2)" class="color-box" :class="{'active':boxIndex===2}" id="purple"></div>
                                    <div  @click="changeBg('#D05A55',3)" class="color-box" :class="{'active':boxIndex===3}" id="orange"></div>
                                    <div  @click="changeBg('#76838F',4)" class="color-box" :class="{'active':boxIndex===4}" id="gray"></div>
                                    <div  @click="changeBg('#DFEDF9',5)" class="color-box" :class="{'active':boxIndex===5}" id="lightBlue"></div>
                                    <div  @click="changeBg('#F2E7F9',6)" class="color-box" :class="{'active':boxIndex===6}" id="lightPurple"></div>
                                    <div  @click="changeBg('#F9E8DE',7)" class="color-box" :class="{'active':boxIndex===7}" id="lightOrange"></div>
                                </div>
                            </div>
                            <div class="other-options">
                                <div class="option">
                                    <span class="icon"><i class="fas fa-print"></i></span>
                                    <span class="text">Listeyi Yazdır</span>
                                </div>
                                <div class="option">
                                    <span class="icon"><i class="far fa-envelope"></i></span>
                                    <span class="text">Listeyi Eposta ile Gönder </span>
                                </div>
                                <div class="option">
                                    <span class="icon"><i class="fas fa-thumbtack"></i></span>
                                    <span class="text">Başlangıca Sabitle</span>
                                </div>
                            </div>
                            <div class="toggle-side" ref="toggleSide">
                                <div class="side-options">
                                    <div class="option">
                                        <span class="icon"><i class="far fa-star"></i></span>
                                        <span class="text">Önem Derecesi</span>
                                    </div>
                                    <div class="option">
                                        <span class="icon"><i class="far fa-calendar-alt"></i></span>
                                        <span class="text">Son Tarih</span>
                                    </div>
                                    <div class="option">
                                        <span class="icon"><i class="fas fa-sort-alpha-down-alt"></i></span>
                                        <span class="text">Alfebetik</span>
                                    </div>
                                    <div class="option">
                                        <span class="icon"><i class="far fa-calendar-plus"></i></span>
                                        <span class="text">Oluşturma Tarihi</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="middle">
                    <ul v-if="defaultTodos.length>0">
                        <li v-for="(todo,i) in defaultTodos" :key="i">
                            <div v-if="!todo.completed" @contextmenu="openContextMenu(todo,$event)" class="todo">
                                <div class="infoSection">
                                    <div class="circle">
                                        <label class="container" style="z-index:1000000">
                                            <input type="checkbox" @click="changeCompletedStatus(i,todo)" :checked="todo.completed">
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    <div class="text">
                                        <p>{{todo.content}}</p>
                                        <h5>Görevler</h5>
                                    </div>
                                    
                                </div>
                                
                                <div class="favIcon" @click="makeItFav(todo)">
                                    <i v-if="!todo.isFav" class="far fa-star"></i>
                                    <i v-else style="color:#4559aa" class="fas fa-star"></i>
                                </div>
                            </div>
                        </li>
                       
                    </ul>
                    <div v-if="completedTodos.length>0" class="completed" @click="showCompletedTodos">
                        <span class="icon"  :class="{'active':showTodos}" id="completedIcon"></span>
                        <span class="text">Tamamlandı {{completedTodos.length}}</span>
                    </div>
                    <div v-if="completedTodos.length>0" class="completed-todos" :class="{'active':showTodos}">
                        <ul>
                            <li v-for="(todo,i) in completedTodos" :key="i">
                                <div class="todo" @contextmenu="openContextMenu(todo,$event)">
                                    <div class="infoSection">
                                        <div class="circle">
                                            <label class="container">
                                                <input type="checkbox" @click="changeCompletedStatus(i,todo)" :checked="todo.completed">
                                                <span class="checkmark"></span>
                                            </label>
                                        </div>
                                        <div class="text">
                                            <p class="done">{{todo.content}}</p>
                                            <h5>Görevler</h5>
                                        </div>
                                    </div>
                                    
                                    <div class="favIcon" @click="makeItFav(todo)">
                                        <i v-if="!todo.isFav" class="far fa-star"></i>
                                        <i v-else style="color:#4559aa" class="fas fa-star"></i>

                                    </div>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                    <div v-if="defaultTodos.length===0" class="icon">
                        <div class="icon-pic">
                           <svg id="calendar"  enable-background="new 0 0 512 512" height="200" viewBox="0 0 512 512" width="200" xmlns="http://www.w3.org/2000/svg"><g><path d="m409.6 512h68.267c18.851 0 34.133-15.282 34.133-34.133v-331.754h-102.4z" fill="#cadae6"/><g><path d="m477.867 434.393c-4.267 0-7.726-3.459-7.726-7.726v-273.067c0-4.267 3.459-7.726 7.726-7.726s7.726 3.459 7.726 7.726v273.066c0 4.268-3.459 7.727-7.726 7.727z" fill="#b4cadb"/></g><path d="m409.6 153.6h102.4v-85.334c0-18.851-15.282-34.132-34.133-34.132h-68.267z" fill="#db4955"/><path d="m512 111.74h-68.267c-4.267 0-7.726 3.459-7.726 7.726s3.459 7.726 7.726 7.726h68.267z" fill="#c7424d"/><path d="m34.134 477.867c0 18.851 15.282 34.133 34.132 34.133h341.334c18.851 0 34.133-15.282 34.133-34.133v-34.134z" fill="#b4cadb"/><path d="m34.134 146.113v297.621l375.467 34.132c18.851 0 34.132-15.282 34.132-34.132v-297.621z" fill="#eef1f3"/><path d="m443.733 153.6v-85.334c0-18.851-15.282-34.132-34.132-34.132h-68.267-204.8-68.268c-18.851 0-34.132 15.281-34.132 34.132v85.334z" fill="#dd646e"/><path d="m32.692 477.867c-14.877 0-27.53-9.517-32.205-22.795-1.949-5.537 2.197-11.338 8.068-11.338h359.242c4.053 0 7.546 2.853 8.352 6.826 3.162 15.58 16.937 27.308 33.451 27.308h-376.908z" fill="#cadae6"/><g><g><path d="m136.533 75.993h-17.066c-4.267 0-7.726-3.459-7.726-7.726s3.459-7.726 7.726-7.726h17.066c4.267 0 7.726 3.459 7.726 7.726s-3.459 7.726-7.726 7.726z" fill="#db4955"/></g></g><g><g><path d="m187.734 75.993h-17.067c-4.267 0-7.726-3.459-7.726-7.726s3.459-7.726 7.726-7.726h17.067c4.267 0 7.726 3.459 7.726 7.726s-3.459 7.726-7.726 7.726z" fill="#db4955"/></g></g><g><g><g><path d="m307.2 75.993h-17.067c-4.267 0-7.726-3.459-7.726-7.726s3.459-7.726 7.726-7.726h17.067c4.267 0 7.726 3.459 7.726 7.726s-3.459 7.726-7.726 7.726z" fill="#db4955"/></g></g></g><g><g><path d="m358.4 75.993h-17.066c-4.267 0-7.726-3.459-7.726-7.726s3.459-7.726 7.726-7.726h17.066c4.267 0 7.726 3.459 7.726 7.726s-3.459 7.726-7.726 7.726z" fill="#db4955"/></g></g><path d="m136.533 68.267c0 9.426 7.641 17.067 17.067 17.067s17.067-7.641 17.067-17.067v-51.2c0-9.426-7.641-17.067-17.067-17.067s-17.067 7.641-17.067 17.067z" fill="#f4de7f"/><path d="m307.2 68.267c0 9.426 7.641 17.067 17.067 17.067s17.067-7.641 17.067-17.067v-51.2c-.001-9.426-7.642-17.067-17.067-17.067-9.426 0-17.067 7.641-17.067 17.067z" fill="#f4de7f"/><path d="m34.134 111.74h409.599v15.453h-409.599z" fill="#db4955"/><g><circle cx="238.933" cy="307.2" fill="#f4de7f" r="51.2"/><g><path d="m238.933 229.593c-4.267 0-7.726-3.459-7.726-7.726v-17.067c0-4.267 3.459-7.726 7.726-7.726s7.726 3.459 7.726 7.726v17.067c.001 4.267-3.459 7.726-7.726 7.726z" fill="#f0c078"/></g><g><path d="m178.594 254.587c-1.977 0-3.955-.755-5.463-2.263l-12.068-12.068c-3.018-3.017-3.018-7.909 0-10.926 3.017-3.017 7.91-3.017 10.927 0l12.068 12.068c3.018 3.017 3.018 7.909 0 10.927-1.51 1.507-3.487 2.262-5.464 2.262z" fill="#f0c078"/></g><g><path d="m153.6 314.927h-17.067c-4.267 0-7.726-3.459-7.726-7.726s3.459-7.726 7.726-7.726h17.067c4.267 0 7.726 3.459 7.726 7.726s-3.459 7.726-7.726 7.726z" fill="#f0c078"/></g><g><path d="m166.526 387.334c-1.977 0-3.955-.755-5.463-2.263-3.018-3.017-3.018-7.91 0-10.927l12.068-12.068c3.017-3.017 7.909-3.017 10.927 0s3.018 7.91 0 10.927l-12.068 12.068c-1.51 1.508-3.487 2.263-5.464 2.263z" fill="#f0c078"/></g><g><path d="m238.933 417.327c-4.267 0-7.726-3.459-7.726-7.726v-17.067c0-4.267 3.459-7.726 7.726-7.726s7.726 3.459 7.726 7.726v17.066c.001 4.267-3.459 7.727-7.726 7.727z" fill="#f0c078"/></g><g><path d="m311.341 387.334c-1.977 0-3.955-.755-5.463-2.263l-12.068-12.068c-3.018-3.017-3.018-7.909 0-10.927 3.017-3.017 7.91-3.017 10.927 0l12.068 12.068c3.018 3.017 3.018 7.909 0 10.927-1.509 1.508-3.486 2.263-5.464 2.263z" fill="#f0c078"/></g><g><path d="m341.334 314.927h-17.067c-4.267 0-7.726-3.459-7.726-7.726s3.459-7.726 7.726-7.726h17.067c4.267 0 7.726 3.459 7.726 7.726s-3.459 7.726-7.726 7.726z" fill="#f0c078"/></g><g><path d="m299.273 254.587c-1.978 0-3.955-.755-5.463-2.263-3.018-3.017-3.018-7.91 0-10.927l12.068-12.068c3.017-3.017 7.909-3.017 10.926 0 3.018 3.017 3.018 7.909 0 10.926l-12.068 12.068c-1.508 1.509-3.485 2.264-5.463 2.264z" fill="#f0c078"/></g><path d="m238.933 256c-4.08 0-8.043.491-11.847 1.393 22.562 5.348 39.353 25.61 39.353 49.807s-16.791 44.46-39.353 49.807c3.804.902 7.767 1.393 11.847 1.393 28.277 0 51.2-22.923 51.2-51.2.001-28.277-22.923-51.2-51.2-51.2z" fill="#f0c078"/></g></g></svg>
                        </div>
                        <div class="icon-title">
                            <h3>Gününüze Odaklanın</h3>
                        </div>
                        <div class="icon-subtitle">
                            <p>Her gün yenilenen günüm listesiyle işlerinizi tamamlayın</p>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="input">
                        <label class="container">
                            <input type="checkbox" checked="checked">
                            <span class="checkmark"></span>
                        </label>
                        <div class="plus">
                            <span id="vertical"></span>
                            <span id="horizontal"></span>
                        </div>
                        <input id="mainInput" @keyup.enter="addTodo" @change="showInputLabels" v-model="inputValue" placeholder="Görev ekle" type="text">
                        <div class="liste">
                            <ul id="msgInputList"  :style="{display:inputStyling}">
                                <li>
                                    <span class="icon"><i class="fas fa-home"></i></span>
                                    <span class="text">Görevler </span>
                                </li>
                                <li>
                                    <span class="icon"><i class="far fa-calendar-alt"></i></span>
                                </li>
                                <li>
                                    <span class="icon"><i class="far fa-clock"></i></span>
                                </li>
                                <li>
                                    <span class="icon"><i class="fas fa-history"></i></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
</template>

<script>
import {computed,ref} from "vue";
import { useStore } from 'vuex';
import useMixin from "../mixin/mixin";
import Modal from "../components/Modal.vue";
export default {
    setup(){
        const {toggle} = useMixin();
        let inputValue = ref("");
        let inputStyling = ref("none");
        let showTodos = ref(false);
        let boxIndex = ref(0);
        let toggleMenu = ref("toggleMenu");
        let toggleSide = ref("toggleSide");
        let toggleSideShow = ref(false);
        let selectedTodoByRighClk= ref(null);
        let optionsToggleShow = ref(false);
        const store = useStore();
        let showModal = computed(()=>{return store.getters.getShowModal});
        let backGroundColor = computed(()=>{return store.getters.getBackGroundColor})
        let defaultTodos = computed(()=>{return store.getters.getDefaultTodos})
        let completedTodos = computed(()=>{return store.getters.getCompletedTodos})
        let pageHeader = computed(()=>{return store.getters.getPage})
        function getDay(){
            let days = ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"];
            let months = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"]
            let date = new Date();
            let day =  days[date.getDay()]
            let gun = date.getDate()
            let month= months[date.getMonth()];
            let str =`${gun} ${month} ${day}`
            return str;
        }
        function toggleSideBar(){
            var navigation = document.querySelector(".navigation");
            navigation.classList += " active";
        }
        function showInputLabels(){
            if(inputValue.value!==""){
                inputStyling.value="flex";
            }
            else{
                inputStyling.value = "none";
            }
        }
        function showCompletedTodos(){
            showTodos.value = !showTodos.value;
        }
        function toggleOutside(e){
            var navigation = document.querySelector(".navigation");
            if(e.target.className=="middle"||e.target.className=="todo"||e.target.className=="far fa-star"||e.target.className=="top-info"||e.target.className=="far fa-lightbulb"||e.target.className=="fas fa-ellipsis-h"){
                navigation.classList.remove("active");
            }   
        }
        function addTodo(){
            if(inputValue.value ==""){return}
            const data = {
                createdAt:new Date(),
                content:inputValue.value,
                completed:false,
                isFav:false
            }
            store.commit("addTodos",data);
            inputValue.value = "";
        }
        function changeCompletedStatus(index,todo){
            let payload = {index,type:"defaultTodos",todo}
            console.l
            if(pageHeader.value=="Önemli"){
                store.commit("changeCompletedStatus",payload);
                store.commit("setTodosToFavTodos")
            }
            else{
                store.commit("changeCompletedStatus",payload);
                store.commit("setTodosToDefaultTodos")
            }
        }
        function openToggleMenu(){
            if(!optionsToggleShow.value){
                toggleMenu.value.style = "display:block";
                optionsToggleShow.value = true;
            }
            else{                
                toggleMenu.value.style = "display:none";
                optionsToggleShow.value = false;
            }
        }
        function opentToggleSideMenu(){
            if(!toggleSideShow.value){
                toggleSide.value.style= "display:block"
                toggleSideShow.value = true;
            }
            else{
                toggleSideShow.value = false;
                toggleSide.value.style = "display:none";
            }
        }
        function changeBg(val,boxInd=null){
            console.log(!(boxInd==null));
            if(!(boxInd===null)){
                boxIndex.value = boxInd;
                store.commit("changeBackGroundColor",val)
            }
            else{
                store.commit("changeBackGroundColor",val);
            }   
        }
        function normalizePosition(mouseX,mouseY){
            let body = document.querySelector("body");
            let main = document.querySelector(".main");
            let normalisedX;
            let normalisedY;
            let outOfX = mouseX+ 250>body.clientWidth;
            let outOfY = mouseY+326>main.clientHeight;
            normalisedX = mouseX;
            normalisedY = mouseY;
            if(outOfX){
                normalisedX = mouseX-250;//250 represents width of the context menu
            }
            if(outOfY){
                normalisedY =  mouseY-326;//326 represents height of the context menu
            }
            return{normalisedX,normalisedY}
        }
        function openContextMenu(todo,e){
            selectedTodoByRighClk.value = todo;
            e.preventDefault();
            let contextMenu = document.getElementById("context-menu");
            let {clientX,clientY} = e;
            const {normalisedX,normalisedY} = normalizePosition(clientX,clientY);
            contextMenu.style.top = `${normalisedY}px`
            contextMenu.style.left=`${normalisedX}px`;
            contextMenu.classList.add("visible");
        }
        function closeContext(e){
            let contextMenu = document.getElementById("context-menu");
            if(e.target.offsetParent!==contextMenu){
                contextMenu.classList.remove("visible");
            }
        }
        function removeTodo(){
            store.commit("changeShowModal");
            let contextMenu = document.getElementById("context-menu");
            contextMenu.classList.remove("visible");

        }
        function makeItFav(todo){
            let payload={type:"defaultTodos",todo};
            store.commit("changeFavStatus",payload);
            if(pageHeader.value =="Önemli"){
                store.commit("setTodosToFavTodos");
            }
        }
        return{toggleSideBar,toggle,inputValue,showInputLabels,inputStyling,showCompletedTodos,showTodos,toggleOutside,addTodo,defaultTodos,changeCompletedStatus,completedTodos,getDay,openToggleMenu,toggleMenu,toggleSide,toggleSideShow,opentToggleSideMenu,changeBg,backGroundColor,boxIndex,openContextMenu,closeContext,removeTodo,selectedTodoByRighClk,makeItFav,pageHeader,showModal}
    },
    components:{
        Modal
    }
}
</script>

<style scoped>
.main{
    position: absolute;
    background-color: var(--mainBgColor);
    width: calc(100% - 300px);
    left: 300px;
    min-height: 100vh;
}

.main .content{
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.main .content .top-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
}
.main .content .top-info .days-info{
    position: relative;
    display: inline-block;
}
.main .content .top-info .days-info ul li {
    color: white;
}  
.main .content .top-info .days-info ul li h3{
    letter-spacing: 1.5px;
    font-size: 1.5em;
}
.main .content .top-info .days-info ul li p{
    font-size: 0.87em;
}
.main .content .top-info .options{
    position: relative;
    display: inline-block;
    color: white;
}
.main .content .top-info .options a{
    color: white;
    text-decoration: none;
    background-color: rgb(255 255 255 / 14%);   
    border-radius: 3px;
    cursor:default;
    border: 1px solid rgba( 255, 255, 255, 0.18 );    
}
.main .content .top-info .options .dots{
    padding: 3px;
}
.main .content .top-info .options a:hover{
    background-color: #323f75;
}

.main .content .top-info .options .toggle-menu{
    display: none;
    z-index: 1000000;
    position: absolute;
    right: 0;
    height: auto;
    width: 250px;
    background-color: white;
    top: 100%;
    border-radius: 3px;
    flex-direction: column;
}

.main .content .top-info .options .toggle-menu .hover-menu{
    cursor: pointer;
    display: flex;
    padding: 3px 10px 3px 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    align-items: center;
    background-color: white;
    color: black;
    height: 40px;
}
.main .content .top-info .options .toggle-menu .hover-menu .icon{
    color: #717171;
    margin-right: 5px;
}
.main .content .top-info .options .toggle-menu .hover-menu .text{
    margin-right: 80px;
}
.main .content .top-info .options .toggle-menu .hover-menu:hover{
    background-color:#EEEEEE ;
}

.main .content .top-info .options .toggle-menu .hover-menu .arrow{
    height: 10px;
    width: 10px;
    border: solid black;
    border-width: 0 2px 2px 0;
    transform: rotate(-45deg);

}
.main .content .top-info .options .toggle-menu .color-options{
    display: flex;
    flex-direction: column;
    color: black;
    height: auto;
    background-color: white;
}
.main .content .top-info .options .toggle-menu .color-options .colors{
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    background-color: white;
}
.main .content .top-info .options .toggle-menu .color-options .colors .color-box{
    width: 50px;
    height: 50px;
    background-color: #4559aa;
    margin:4px ;
}
.main .content .top-info .options .toggle-menu .color-options .colors .color-box.active{
    outline:solid;
    outline-color: blue;
    outline-offset: 2px;
}
.main .content .top-info .options .toggle-menu .color-options .colors #blue{
    background-color: #4559aa;
}
.main .content .top-info .options .toggle-menu .color-options .colors #green{
    background-color: #368E68;
}
.main .content .top-info .options .toggle-menu .color-options .colors #purple{
    background-color: #A968AA;
}

.main .content .top-info .options .toggle-menu .color-options .colors #orange{
    background-color: #D05A55;
}
.main .content .top-info .options .toggle-menu .color-options .colors #gray{
    background-color: #76838F;
}
.main .content .top-info .options .toggle-menu .color-options .colors #darkGreen{
    background-color: #0B736D;
}
.main .content .top-info .options .toggle-menu .color-options .colors #lightBlue{
    background-color: #DFEDF9;
}
.main .content .top-info .options .toggle-menu .color-options .colors #lightPurple{
    background-color: #F2E7F9;
}
.main .content .top-info .options .toggle-menu .color-options .colors #lightOrange{
    background-color: #F9E8DE;
}
.main .content .top-info .options .toggle-menu .other-options{
    margin-top: 10px;
}
.main .content .top-info .options .toggle-menu .other-options .option{
    display: flex;
    align-items: center;
    height: 40px;
    color: black;
    padding-left: 10px;
}
.main .content .top-info .options .toggle-menu .other-options .option:hover{
    background-color: #EEEEEE;
}
.main .content .top-info .options .toggle-menu .other-options .option .icon{
    color: #717171;
    margin-right: 5px;
}
.main .content .top-info .options .toggle-menu .toggle-side{
    display: none;
    padding: 10px;
    position: absolute;
    right: 99%;
    top: 0;
    width: 200px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid rgb(180, 177, 177);
}
.main .content .top-info .options .toggle-menu .toggle-side .side-options{
    display: flex;
    flex-direction: column;
}
.main .content .top-info .options .toggle-menu .toggle-side .side-options .option{
    color: black;
    height: 40px;
    display: flex;
    align-items: center;
}

.main .content .top-info .options .toggle-menu .toggle-side .side-options .option .icon{
    margin-right: 10px;
    color: #717171;

}



.main .content .top-info .options a:first-child{
    font-size: 1.2em;
    text-align: center;
    padding: 2px 4.5px 2px 4.5px;
    margin-right: 15px;
}
.main .content .top-info .options a:last-child{
    font-size: 1.2em;
    padding: 2px;
}
.main .content .top-info .options a{

}





.main .content .middle {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items:center;
    top:108.8px ;
    height: 100%;
/*     height: calc(100vh - 106.4px);
 */
 }
.main .content .middle .completed{
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-self: flex-start;
    left: 10%;
    margin-top: 10px;
    background-color: rgb(255 255 255 / 14%);
    color: white;
    border-radius: 5px;
    height:35px;
    min-height: 35px;
    margin-bottom: 20px;
    width: 140px;
    padding: 5px;
}
.main .content .middle .completed .icon.active{
    transform: rotate(45deg);
}
.main .content .middle .completed .text{
    position: absolute;
    left: 27px;
    top: 6px;
}
.main .content .middle .completed .icon{
    position: absolute;
    top: 10px;
    left: 5px;
    width: 10px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(-45deg);
    transition: 0.4s;
}

.main .content .middle .icon{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: white;
}
.main .content .middle .completed-todos{
    display:none;
    position: relative;
    width: 80%;
}
.main .content .middle .completed-todos.active{
    display: block;

}
.main .content .middle .completed-todos ul {
    width: 100%;
}





.main .content .middle .icon .icon-pic img {
    width: 100px;
}
.main .content .middle .icon .icon-title{
    margin-top: 10px;
    font-size: 1.2em;
    text-align: center;
    margin-top: 25px;
    letter-spacing: 1.5px;
}
.main .content .middle .icon .icon-subtitle{
    text-align: center;
    margin-top: 10px;
    width: 300px;
    white-space: normal;
    
}
.main .content .middle ul{
    width: 80%;
}
.main .content .middle ul li {
    margin-top: 5px;
}
.main .content .middle ul li .todo{
    display: flex;
    border-radius: 5px;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    width: 100%;
    height: 60px;
}
.main .content .middle ul li .todo .infoSection .text{
    left: 44px;
}
.main .content .middle ul li .todo .infoSection .text p.done{
    text-decoration: line-through;
    color: grey;
}
.main .content .middle ul li .todo .infoSection .text h5{
    font-weight: 100;
    color: grey;
}
.main .content .middle ul li .todo:hover{
    background-color: #EEEEEE;
}
.main .content .middle ul li .todo .infoSection{
    width: 20%;
    align-items: center;
    justify-content: space-between;

}
/* Hide the browser's default checkbox */
.main .content .middle ul li .todo .circle input{
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
}
/* Create a custom checkbox */
.main .content .middle ul li .todo .circle span{
    position: absolute;
    z-index: 1000;
    display: block;
    top: -12px;
    width: 25px;
    height: 25px;
    border: 3px solid grey;
    border-radius: 50%;
}
/* On mouse-over, add a grey background color */
.main .content .middle ul li .todo .circle .container:hover input ~ .checkmark{
    background-color:  #ccc;  
} 
/* Create the checkmark/indicator (hidden when not checked)*/
.main .content .middle ul li .todo .circle input:checked ~ .checkmark{
    background-color: #7388DA;
}
/* Create the checkmark/indicator (hidden when not checked) */
.main .content .middle ul li .todo .circle .container .checkmark::after{
    content: "";
    position: absolute;
    display: none;
}
/* Show the checkmark when checked */
.main .content .middle ul li .todo .circle .container input:checked ~  .checkmark::after {
    display: block;
}
.main .content .middle ul li .todo .circle .container .checkmark::after {
    left: 5px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid black;
    z-index: 1000;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
.main .content .middle ul li .todo .circle .container .checkmark{
    position: relative;
    top:15px;
}
.main .content .middle ul li .todo  .text{
    position: relative;
    top: -10px;
    left: 30px;
}
.main .content .bottom{
    width: 100%;
    margin-bottom: 30px;
}
.main .content .bottom .input{
    pointer-events: none;
    display: flex;
    position: relative;
    left: 10%;
    width: 80%;
}
.main .content .bottom .input #mainInput{
    z-index: 10000;
    background-color: rgb(255 255 255 / 14%);
}
.main .content .bottom .input .container {
    z-index:100000;
} 
.main .content .bottom .input:focus-within >.container{
    display: block;

}
.main .content .bottom .input:focus-within >.plus{
    display: none;
}
.main .content .bottom .input:focus-within input::placeholder{
    color: transparent;
}
.main .content .bottom .input input{
    color: white;

}
.main .content .bottom .input .plus{
    position: relative;
    left:1%;
    top: 22px;
    z-index: 100000;
}
.main .content .bottom .input .plus #vertical{
    position: absolute;
    transform: rotate(90deg);
    width: 20px;
    display: block;
    height: 1.5px;
    background-color: white;
}
.main .content .bottom .input .plus #horizontal{
    width: 20px;
    display: block;
    position: absolute;
    height: 1.5px;
    background-color: white;
}
.main .content .bottom .input .liste{
    display: inline-block;
    position: relative;
    background-color: rgb(255 255 255 / 14%);
    z-index: 10000;
}
.main .content .bottom .input .liste ul li{
    z-index: 1000;
}
.main .content .bottom .input .liste ul li:hover{
    background: chartreuse;
    
}

.main .content .bottom .input input{
    pointer-events: auto;
    width: 100%;
    height: 45px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border: none;
    outline: none;
    padding-left:50px;
    font-size: large;
    background-color: #4559aa;
}
.main .content .bottom .input input::placeholder{
    color: white;
}

.main .content .bottom .input .container{
    display: none;
    position: absolute;
    width: 30px;
    left: 1%;
    top: 0px;   
    z-index: 100000;
}
/* Hide the browser's default checkbox */
.main .content .bottom .input .container input{
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
}
/* Create a custom checkbox */
.main .content .bottom .input .container span{
    position: absolute;
    z-index: 1000;
    top: 10px;
    display: block;
    width: 25px;
    height: 25px;
    border: 3px solid whitesmoke;
    border-radius: 50%;
}

.main .content .bottom .input ul {
    position: relative;
    width: 100%;
    height: 100%;
    display: none;
    justify-content: space-around;
    color: white;
    background-color:#4559aa ;
    opacity: 0.8;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    align-items: center;
}
.main .content .bottom .input  ul li{
    display: flex;
    align-items: center;
    padding: 0px 5px 0 5px;
    height: 100%;
}
.main .content .bottom .input  ul li:last-child{
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;

}
/* .main .content .bottom .input input:focus +  ul{
   display: flex;
} */
.main .content .bottom .input  ul li .text{
    font-size: 0.8em;
}

.main .content .bottom .input  ul li:hover{
    background-color:#323f75 ;
    
}


#responsiveButton{
    display: none;
    width: 50px;
    height: 50px;
}
.container .navigation.mobile{
    display: block;
    z-index: 1001;
    width: 250px;
    top: 0;
    left: 0;
    background-color: white;
}
#context-menu{
    position: fixed;
    z-index:1000000;
    width: 250px;
    background: white;
    display:none;
     transform: scale(0);
    transform-origin: top bottom;
}

#context-menu.visible{
    display: block;
 transform: scale(1);
  transition: transform 200ms ease-in-out;  
  border-radius: 5px;
  border: 1px solid grey;
}
#context-menu .item{
    padding:8px 10px;
    font-size: 15px;
    height: 40px;
    color:rgba(0, 0, 0, 0.678);
    cursor:pointer;
    border-radius: inherit;
  transform-origin: top left;
}
#context-menu .item .icon{
    margin-right: 5px;
}
#context-menu .item:hover{
    background-color: #EEEEEE;
}
@media only screen and (max-width: 800px){
    .main {
        left: 0;
        width: 100%;
    }
    #responsiveButton{
        display: block;
        font-size: 1.5em;
        z-index: 1002;
    }
    #responsiveButton>i:hover{
        background-color:#4559aa ;
        padding: 3px;

    }
    .main .content .top-info .options{
        align-self: flex-end;
    }

}
</style>