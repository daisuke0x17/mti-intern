<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <form class="ui large form" v-on:submit="submit">
            <div class="field">
                <div class="ui left icon input">
                    <i class="user icon"></i>
                    <input type="email" placeholder="e-mail" v-model="email">
                </div>
            </div>
            <div class="field">
                <div class="ui left icon input">
                    <i class="lock icon"></i>
                    <input type="password" required placeholder="Password" v-model="password">
                </div>
            </div>
            <div class="field" v-if="!isLogin">
                <div class="ui left icon input">
                    <i class="tag icon"></i>
                    <input type="text" placeholder="Name" v-model="name">
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
import accountFunc from "../functions/accountFunc";
const {logIn,signUp} = accountFunc();
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
            name:null,
            age:null
        },
        email:null,
        password:null,
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
    toggleMode(){
        this.isLogin = !this.isLogin;
    },
    submit(){
        this.loading = true;
        console.log(this.loading)
        if(this.isLogin){
            //ログイン処理
            console.log("Login");
            logIn(this.email,this.password,()=>{
                this.$router.push({name:"Home"});
            });
            return;
        }
        //新規登録処理
        console.log("signup");
        if(this.name){
            signUp(
                this.email,
                this.password,
                {name:this.name},
                ()=>this.$router.push({name:"Home"})
            );
            this.loading = false;
        }else{
            alert("名前を入力してください");
            this.loading = false;
        }
    },
  },
}
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSは */

</style>