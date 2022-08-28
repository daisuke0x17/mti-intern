<style scoped>
/* このコンポーネントだけに適用するCSSは */
.container{
    padding:48px;
    display: flex;
    flex-direction:row;
    width:100%;
    align-content:center;
}
.containerLeft{
    width:50%;
    padding:25px;
    padding-top: 60px;
    align-items:center;
    justify-content:center;
    position: relative;
}
.containerRight{
    display: block;
    width: 50%;
    border:15px solid #bfbfbf;
    border-radius: 10px;
}
.hajimeruContainer{
    margin-top: 80px;
    display: flex;
    width:100%;
    justify-content:center;
}
h1{
    font-size: 48px;
    color:white;
}

</style>
<template>
  <div>
      <Menu></Menu>
    <div class="container">
      <!-- 基本的なコンテンツはここに記載する -->
      
        <div class="containerLeft">
            <h1>
                キャッチコピー
                <br/>丸々しませんか？？？<br/>
                実は座りすぎにはこんなに<br/>
                良くないものが！！
            </h1>
            <div class="hajimeruContainer">
                <HajimeruModal></HajimeruModal>
            </div>
        </div>
        <img src="../assets/images/appImg.png" class="containerRight">
    </div>
  </div>
</template>
<script>
import accountFunc from "../functions/accountFunc";
import HajimeruModal from "../components/HajimeruModal.vue";
import Menu from "@/components/Menu.vue";
const {logIn,signUp} = accountFunc();
export default {
  name: 'Login',
  components: {
   // 読み込んだコンポーネント名をここに記述する
   HajimeruModal,
   Menu
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

