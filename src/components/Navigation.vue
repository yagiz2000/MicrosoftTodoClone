<template>
  <div  class="navigation" ref="navigation" :class="{'active':deger2}" >
            <ul id="navi-ul">
                <li id="sidebar-toggle">
                    <span class="icon" @click.prevent="toggleSideBar()" id="responsiveButton2"><i class="fas fa-bars"></i></span>
                </li>
                <li id="firstListItem" @click="openEmailToggler">
                    <span class="icon"><i class="fas fa-user-circle"></i></span>
                    <div class="user-info">
                        <div class="name">Yağız Ceritoğlu</div>
                        <div class="email">yagzceritoglu@gmail.com</div>
                    </div>
                    <span class="icon-2"><i class="fas fa-search"></i></span>
                    <div class="email-toggle" v-click-outside="outsideClickEmailToggler" :style="[showEmailToggle?{'display': 'block'}: {'display': 'none'}]">
                        <ul>
                            <li >
                                <span class="icon"><i class="fas fa-user-cog"></i></span>
                                <span class="text">Hesapları Yönet</span>
                            </li>
                            <hr>
                            <li>
                                <span class="icon"><i class="fas fa-cog"></i></span>
                                <span class="text">Ayarlar</span>
                            </li>
                            <hr>
                            <li>
                                <span class="icon"><i class="fas fa-recycle"></i></span>
                                <span class="text">Eşitle</span>
                            </li>
                        </ul>
                    </div>
                </li>
                <li @click="changeActiveListItem(0)" :style="{'--bgColor':'#7388DA'}" :class="{'active':listNumber ===0}">
                    <span class="icon"><i class="fas fa-sun"></i></span>
                    <span class="title">Günüm</span>
                </li>
                <li  @click="changeActiveListItem(1)" :style="{'--bgColor':'#D35D58'}" :class="{'active':listNumber ===1}" >
                    <span class="icon"><i class="fas fa-star"></i></span>
                    <span class="title">Önemli</span>
                </li>
                <li @click="changeActiveListItem(2)" :style="{'--bgColor':'#39916A'}" :class="{'active':listNumber ===2}" >
                    <span class="icon"><i class="fas fa-calendar-alt"></i></span>
                    <span class="title">Planlanan</span>
                </li>
                <li @click="changeActiveListItem(3)" :style="{'--bgColor':'#7388DA'}" :class="{'active':listNumber ===3}" >
                    <span class="icon"><i class="fas fa-user"></i></span>
                    <span class="title">Bana atanmış</span>
                </li>
                <li @click="changeActiveListItem(4)" :style="{'--bgColor':'#7388DA'}" :class="{'active':listNumber ===4}" >
                    <span class="icon"><i class="fas fa-home"></i></span>
                    <span class="title">Görevler</span>
                </li>
                <hr>
                <li >
                    <span class="icon"><i class="fas fa-bars"></i></span>
                    <span class="title">Ek Görev</span>
                </li>
                <li id="addNewList">
                    <span class="icon"><i class="fas fa-plus"></i></span>
                    <span class="title">Yeni Liste</span>
                    <span class="icon-2"><i class="fas fa-folder-plus"></i></span>
                </li>
            </ul>
        </div>
</template>

<script>
import { ref, computed } from 'vue';
/* import useMixin from "../mixin/mixin";
 */import {useStore} from "vuex";
import ClickOutside from 'vue-click-outside';

export default {
    
    setup(){
        let showEmailToggle = ref(false);
        const sideBar = ref(null);
        let listNumber = ref(0);
/*         const {toggle} = useMixin();
 */        let navigation = ref("navigation")
        const store = useStore();
        const deger2 = computed(()=>{return store.getters.resHamBtn});
        function toggleSideBar(){
            navigation.value.classList.remove("active")            
        }
        function openEmailToggler(){
            showEmailToggle.value = !showEmailToggle.value;
        }
        function outsideClickEmailToggler(){
            console.log("saaaaaaa");
            showEmailToggle.value = false;
        }
        function changeActiveListItem (num){
            listNumber.value = num;
        }
        return{toggleSideBar,sideBar,deger2,navigation,showEmailToggle,openEmailToggler,outsideClickEmailToggler,listNumber,changeActiveListItem}
        
    },
    directives:{
        ClickOutside
    }

}
</script>

<style scoped>
.navigation{
    padding-left:10px ;
    padding-top:10px;
    position: fixed;
    width: 300px;
    height: 100%;
    resize: horizontal;
    transition: 0.5s;
}
.navigation #navi-ul li{
    padding-left: 4px;
    position: relative;
    
}
.navigation #navi-ul li.active::before{
    content: "";
    position: absolute;
    top: 12%;
    left: 0;
    background: var(--bgColor);
    height: 70%;
    width: 2px;
}

.navigation #navi-ul li .icon{
    font-size: 1.2em;
}
.navigation #navi-ul #sidebar-toggle{

    display: none;
}
.navigation #navi-ul li:nth-child(3){
    color: #7388DA;
}
.navigation #navi-ul li:nth-child(4){
    color: #D35D58;
}
.navigation #navi-ul li:nth-child(5){
    color: #39916A;
}
.navigation #navi-ul li:nth-child(6){
    color: #7388DA;
}
.navigation #navi-ul li:nth-child(7){
    color: #7388DA;
}

.navigation #navi-ul li:not(:nth-child(1)):hover{
    background-color: #EEEEEE;
}
.navigation #navi-ul li .title{
    color: black;
    position: absolute;
    left: 10%;
}

.navigation #navi-ul{
    line-height: 55px;
}
#firstListItem{
    position: relative;
}
#firstListItem .icon{
    color: rgb(223, 174, 85);
}
#firstListItem .icon i{
    font-size: 1.5em;

}
#firstListItem .icon-2{
    position: absolute;
    left: 91%;
}

#firstListItem .user-info{
    top: -10px;
    left: 10px;
    position: relative;
    display: inline-block;
}
#firstListItem .user-info .name{
    display: inline;
}
#firstListItem .user-info .email{
    opacity: 0.6;
    position: absolute;
    top:18px;
    left: 0;
    display: inline;
    font-size: 0.8em;
}
#firstListItem .email-toggle{
    position: absolute;
    top: 55.2px;
    width: 225px;
    background-color: white;
    padding-left: 10px;
    border-radius: 5px;
    z-index: 1000;
    -webkit-box-shadow: 1px 2px 13px 6px rgba(127,127,127,0.82); 
    box-shadow: 1px 2px 13px 6px rgba(127,127,127,0.82);
    transition: 0.5s;
}
#firstListItem .email-toggle ul li{
    border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;

    line-height: 35px;
}
#firstListItem .email-toggle ul li .text{
    font-size: 0.9em;
    color: black;
}
#firstListItem .email-toggle ul hr{
    color: hotpink;
}
#firstListItem .email-toggle ul li:hover{
    background: #EEEEEE !important;
}
#firstListItem .email-toggle ul li .icon{
    color: grey;
    font-size: 0.7em;
}
#firstListItem .email-toggle ul li .text{
    margin-left: 10px;
}
#addNewList .title{
    position: absolute;
    left: 10%;
}
#addNewList .icon-2{
    position: absolute;
    left: 91%;
}
@media only screen and (max-width: 800px) {
    .navigation{
        left: -300px;
        z-index: 10000;
        background-color: white;
    }
    .navigation #navi-ul #sidebar-toggle{
        display: block;
    }
    .navigation.active{
        left: 0px;
        z-index: 100000;
    }
  
    #responsiveButton2{
        font-size: 1.5em;
    }
    #responsiveButton2>i{
        color: grey;
    }
}
</style>