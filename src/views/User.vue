<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      
      <div class="ui segment">
        <form class="ui form">
          <div class="field">
            <label>ユーザー名</label>
            <input type="text" placeholder="Nickname" v-model="nickname">
          </div>
          <div class="field">
            <label>年齢</label>
            <div class="inline fields">
              <div class="field">
                <input type="text" v-model="start">
                <label>歳から</label>
              </div>
              <div class="field">
                <input type="text" v-model="end">
                <label>歳まで</label>
                
              </div>
            </div>
          </div>
          <!--<button class="ui button" @click="filter">フィルターをかける</button>-->
        </form>
      </div>
      <div v-if="loading">
      <div class="ui active loader"></div>
      </div>
      
      <template v-for="(user,index) in filteredUsers">
        <div class="ui segment" :key="index">
          <p>{{user.nickname}}</p>
          <p>{{user.age}}</p>
          <p>{{user.userId}}</p>
        </div>
      </template>
      
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
  name: 'User',
  components: {
   // 読み込んだコンポーネント名をここに記述する
  },
  data() {
  // Vue.jsで使う変数はここに記述する
    return {
      users:[],
      nickname:null,
      start:0,
      end:20,
      loading:true,
    };
  },
  created(){
    axios.get(baseUrl+"/users")
      .then((response)=>{
        console.log(response.data.users);
        this.users = response.data.users;
        this.loading=false;
      })
      .catch(()=>{
        this.loading=false;
        this.err = '予期せぬエラーが発生しました';
      })
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
    filteredUsers(){
      
      let result = this.users;
      if(this.nickname){
        result = result.filter(target=>{
          if(!target.nickname){
            return
          }
          return target.nickname.match(this.nickname);
        })
      }
      if(this.start){
        result = result.filter(target=>{
          return target.age >= this.start;
        });
      }
      if(this.end){
        result = result.filter(target=>{
          return target.age<= this.end;
        });
      }
      return result;
    }
  },
  methods: {
  // Vue.jsで使う関数はここで記述する
  },
}
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSは */
</style>