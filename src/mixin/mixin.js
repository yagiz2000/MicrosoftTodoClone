import store from "../store/store";
export default function(){
    function toggle(){
        store.commit("changeHamBtn");
    }
    function clickHamBtn(){
        store.commit("changeHamBtnClicked");
    }
    return {toggle,clickHamBtn}
}