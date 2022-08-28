<template>
    <div class="ui secondary pointing green inverted massive menu">
        <a class="item" @click="switchPage('Home')" v-bind:class="{active: current=='Home'}">
            Home
        </a>
        <a class="item" @click="switchPage('User')" v-bind:class="{active: current=='User'}">
            Users
        </a>
        <a class="item" @click="switchPage('Profile')" v-bind:class="{active: current=='Profile'}">
            Profile
        </a>
        <div class="right menu">
            <button class="item" @click="logout">Logout</button>
        </div>
        <LoginModal></LoginModal>
    </div>
</template>

<script>
import accountFunc from "../functions/accountFunc";
import LoginModal from "../components/LoginModal.vue";
const {logout} = accountFunc(); 
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
            }
           
        },
        computed:{
            current(){
                return this.$route.name;
            }
        }
    }
</script>
<style scoped>
    
</style>