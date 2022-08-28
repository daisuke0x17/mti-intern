<template>
  <div>
   <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <h1>Home</h1>
        <p>{{this.user.userId}}</p>
        <p>{{this.user.username}}</p>
        <p>{{this.user.icon}}</p>
        <p>{{this.user.extendedLifespan}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import accountFunc from "../functions/accountFunc";
const {getMyUserData,getMyHistories} = accountFunc(); 
export default {
  name: 'Home',
  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      user:{
        userId:null,
        username:null,
        icon:null,
        extendedLifespan:null,
      },
      isLoading:false,
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
    
  },
  created() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    this.user.userId = window.localStorage.getItem("userId");
    console.log("userId is:",this.user.userId);
    console.log("is logined?:",this.user.userId?true:false);
    if(!this.user.userId){
      this.$router.push({name:"Login"});
    }else{
      //ユーザーデータを取得
      
      getMyUserData(this.user.userId).then((value)=>{
        console.log("userData is",value)
        this.user.username = value.userName;
        this.user.icon = value.icon;
        this.user.extendedLifespan = value.extendedLifespan;
      })
      
      getMyHistories(this.user.userId).then((value)=>{
        console.log(value)
      })
    }
  },
  methods: {
    
  }
}
</script>
<style scoped>



</style>