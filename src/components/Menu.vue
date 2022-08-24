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
    </div>
</template>

<script>
    export default {
        name:"Menu",
        props:{
            
        },
        methods:{
            switchPage(pageName){
                if(this.$route.name=== pageName){
                    return;
                }
                this.$router.push({name:pageName});
            },
            logout(){
                console.log("logout")
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("userId");
                this.$router.push({name:"Login"})
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