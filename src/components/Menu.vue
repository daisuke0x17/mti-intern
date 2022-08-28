<template>
    <div class="ui secondary pointing gray inverted massive menu">
        <img class="" src="" alt="aimani">
        <LoginModal></LoginModal>
        <div class="right menu">
            <!--<button class="item">-->
            <!--    ログイン-->
            <!--</button>-->
        </div>
        
    </div>
</template>

<script>
import accountFunc from "../functions/accountFunc";
import LoginModal from "../components/LoginModal.vue";
const {logout} = accountFunc(); 
//const {logIn,signUp} = accountFunc();
    export default {
        name:"Menu",
        props:{
            
        },
        components:{
          LoginModal,
        },
        methods:{
            switchPage(pageName){
                if(this.$route.name=== pageName){
                    return;
                }
                this.$router.push({name:pageName});
            },
            logout(){
                logout(()=>this.$router.push({name:"Login"}));
            },
        },
        computed:{
            
        },
    }
</script>
<style scoped>
    
</style>