<template>
    <div class="headercontainer">
        <img class="logo_size" src="../assets/Logo_NIKE.svg.png" alt="aimani">
        <LoginModal ></LoginModal>
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
<style>
    .headercontainer{
        padding:12px;
        display: flex;
        flex-direction: row;
        background-color:#787878;
        justify-content: space-between;
        align-items:center;
        align-contents:center;
    }
    .logo_size{
        height: 50px;
        width: 105px;
        /*margin: 40px 0 20px 60px;*/
    }
   
</style>