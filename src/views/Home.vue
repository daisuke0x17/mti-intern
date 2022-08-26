<template>
  <div>
   <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      
      <!--投稿セグメント-->
      <div class="ui segment">
        <form class="ui form">
            <div class="inline fields">
              <div class="field">
                <label>投稿内容</label>
                <textarea rows="4" type="text" v-model="text"></textarea>
              </div>
              <div class="field">
                <label>カテゴリー</label>
                <input type="text" v-model="category">
              </div>
            </div>
          <button class="ui button" @click="postArticle">投稿</button>
        </form>
      </div>
      <!--検索セグメント-->
      <div class="ui segment">
        <form class="ui form">
          <div class="field">
            <label>ユーザー名</label>
            <input type="text" placeholder="Nickname" v-model="nickname">
          </div>
          <div class="field">
            <label>カテゴリー名</label>
            <input type="text"  v-model="nickname">
          </div>
          <div class="field">
            <label>投稿日時</label>
            <div class="inline fields">
              <div class="field">
                <input type="date" v-model="start">
                <label>から</label>
              </div>
              <div class="field">
                <input type="date" v-model="end">
                <label>まで</label>
              </div>
            </div>
          </div>
          <button class="ui button" @click="searchArticle">検索</button>
        </form>
      </div>
      <div v-if="isLoading">
        <div class="ui active loader"></div>
      </div>
      
      <template v-for="(data,index) in articles">
        <div class="ui segment" :key="index">
          <p>{{data.timestamp}}</p>
          <p>{{data.text}}</p>
          <p>{{data.category}}</p>
        </div>
      </template>
      
    </div>
  </div>
</template>

<script>
// import { baseUrl } from '@/assets/config.js';
// import axios from "axios";
// 必要なものはここでインポートする
// @は/srcと同じ意味です
// import something from '@/components/something.vue';
import axios from "axios";
import {baseUrl} from "@/assets/config.js";
export default {
  name: 'Home',
  data() {
    // Vue.jsで使う変数はここに記述する
    const newdate = new Date();
    return {
      post: {
        text: null,
        category: null,
        err: null
      },
      search: {
        username: null,
        category: null,
        start: null,
        end: null,
        err: null,
      },
      query: {
        start: null,
        end: null
      },
      articles: [
        {
        userId:"aiueo",
        timestamp:newdate,
        text:"texttext",
        category:"カテゴリー"
        }
        ],
      iam: null,
      isLoading:false,
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
    /*
    sortedArticles() {
    }
    */
  },
  created() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    this.iam = window.localStorage.getItem("userId");
    // apiからarticleを取得する
    const isLogined = window.localStorage.getItem("token");
    if(!isLogined){
      this.$router.push({name:"Login"});
    }else{
      
      // this.getArticles();
    
    }
  },
  methods: {
    // Vue.jsで使う関数はここで記述する
    getArticles() {
      this.isLoading = true;
      axios.get(baseUrl+"/users")
      .then((response)=>{
        console.log(response.data.articles);
        this.articles = response.data.articles;
        this.isLoading=false;
      })
      .catch(()=>{
        this.isLoading=false;
        this.err = '予期せぬエラーが発生しました';
      })
    },
    postArticle() {
      const requestBody = {
          userId:this.userId,
          text:this.text,
          category:this.category,
      }
      console.log(requestBody)
      axios.post(baseUrl+"",requestBody)
          .then((response)=>{
              console.log(response.data)
              this.text = null;
              this.category =  null;
          })
          .catch(()=>{
              this.err = "予期せぬエラーが発生しました";
          })
    },
    searchArticle() {
      const requestBody = {
          userId:this.userId,
          start:this.start,
          end:this.end,
          category:this.category,
      }
      console.log(requestBody)
      axios.post(baseUrl+"",requestBody)
          .then((response)=>{
              console.log(response.data)
          })
          .catch(()=>{
              this.err = "予期せぬエラーが発生しました";
          })
    },
    deleteArticle(article) {
      axios.delete(baseUrl + "/user", {
            data: {
              userId: article.userId,
              timestamp: article.timestamp,
            }
          })
          .then(() => {
            this.getArticles();
          })
          .catch((e) => {
            throw new Error(e);
          })
    },
    // fromUnixtoDate(timestamp) {
      
    // }
    
  }
}
</script>
<style scoped>
</style>