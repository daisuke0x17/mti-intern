<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <form class="ui large form" v-on:submit="submit">
            <div class="field">
                <div class="ui left icon input">
                    <i class="user icon"></i>
                    <input type="text" placeholder="ID" v-model="user.userId">
                </div>
            </div>
            <div class="field">
                <div class="ui left icon input">
                    <i class="lock icon"></i>
                    <input type="password" placeholder="Password" v-model="user.password">
                </div>
            </div>
            <div class="field" v-if="!isLogin">
                <div class="ui left icon input">
                    <i class="tag icon"></i>
                    <input type="text" placeholder="Nickname" v-model="user.nickname">
                </div>
            </div>
            <div class="field" v-if="!isLogin">
                <div class="ui left icon input">
                    <i class="calendar icon"></i>
                    <input type="text" placeholder="age" v-model="user.age">
                </div>
            </div>
            <li v-if="err" class="err-msg">{{err}}</li>
            <button class="ui huge green fluid button" type="submit">{{submitText}}</button>
        </form>
      </div>
      <button v-on:click="toggleMode()" class="ui huge grey fluid button" >{{toggleText}}</button>
    </div>
    <div v-if="loading">
      <div class="ui active loader"></div>
      </div>
  </div>
</template>
<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import {baseUrl} from "@/assets/config.js";
import axios from "axios";
export default {
  name: 'Login',
  components: {
   // 読み込んだコンポーネント名をここに記述する
  },
  data() {
  // Vue.jsで使う変数はここに記述する
    return {
        isLogin:true,
        user:{
            userId:null,
            password:null,
            nickname:null,
            age:null
        },
        err:null,
        loading:false,
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
      submitText(){
          return this.isLogin? "ログイン":"新規登録";
      },
      toggleText(){
          return this.isLogin? "新規登録":"ログイン";
      }
  },
  methods: {
  // Vue.jsで使う関数はここで記述する
    toggleMode(){
        this.isLogin = !this.isLogin;
    },
    submit(){
        this.loading = true;
        if(this.isLogin){
            if(!this.user.userId){
                this.err = "userIdを入力してください";
            }else if(!this.user.password){
                this.err = "パスワードを入力してください"
            }else{
                //ログイン処理
                console.log("Login");
                const requestBody = {
                    userId:this.user.userId,
                    password:this.user.password,
                }
                console.log(requestBody)
                axios.post(baseUrl+"/user/login",requestBody)
                    .then((response)=>{
                        console.log(response.data)
                        localStorage.setItem("token",response.data.token);
                        localStorage.setItem("userId",this.user.userId);
                        this.$router.push({name:"Home"});
                    })
                    .catch(()=>{
                        this.err = "予期せぬエラーが発生しました";
                    })
            }
            this.loading = false;
            return
        }
        if(!this.user.userId){
            this.err = "userIdを入力してください";
        }else if(!this.user.password){
            this.err = "パスワードを入力してください"
        }else if(!this.user.nickname){
            this.err = "ニックネームを入力してください"
        }else if(!this.user.age){
            this.err = "年齢を入力してください"
        }else{
            //新規登録処理
            console.log("signup");
            const requestBody = {
                userId:this.user.userId,
                password:this.user.password,
                nickname:this.user.nickname,
                age:this.user.age
            }
            axios.post(baseUrl + "/user/signup", requestBody)
                .then((response) => {
                    // 成功したときの処理はここに記述する
                    console.log(response);
                    window.localStorage.setItem("token",response.data.token);
                    window.localStorage.setItem("userId",this.user.userId);
                    this.$router.push({name:"Home"});
                })
                .catch(() => {
                // レスポンスがエラーで返ってきたときの処理はここに記述する
                  this.loading = false;
                });
        }
        this.loading = false
    },
  },
}
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSは */
</style>