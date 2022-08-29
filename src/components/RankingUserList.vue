<template>
  <div>
    <div>
      <div v-for="rank in 4" :key="rank">
        {{rank}}
        <a class="ui image label">
        <!--アイコン-->
        <img src="">
        <font style="vertical-align: inherit;">
          <font style="vertical-align: inherit;">
            {{user_list.username}}
          </font>
        </font>
        <img src="../assets/images/health.png">
        <div class="detail">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">{{user_list.extendedLifespan}}</font>
          </font>
        </div>
      </a>
      </div>
    </div>
    <br />
  </div>
</template>
<script>
import {limit,getDocs,collection,getFirestore,query,orderBy} from "firebase/firestore"

export default {
  name: 'RankingUserList',
  components: {
   // 読み込んだコンポーネント名をここに記述する
  },
  data() {
  // Vue.jsで使う変数はここに記述する
    return {
      //user_list=[{extendedLifspan:1,icon:"aiueo",userId:"aiueoId",userName:"namae"}]
      user_list:[{
        userId:null,
        username:"ddd",
        icon:null,
        extendedLifespan:0,
      },],
    };
  },
  created (){
    const db = getFirestore();
    this.user_list = getDocs(query(collection(db,"users"),orderBy("extendedLifespan","desc"),limit(4)));
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  },
  methods: {
  // Vue.jsで使う関数はここで記述する
  },
}
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSは */
</style>