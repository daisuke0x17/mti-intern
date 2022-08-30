<template>
  <div class="rankingStyle">
    <div class="ui segment">
      <h1>ランキング</h1>

      <div v-for="(member, index) in userlist" :key="index" class="member">
        <div class="leftContent">
          <i class="circular user icon"></i>
          <p class="memberName">{{ member.userName }}</p>
        </div>
        <div class="leftContent">
          <img width="24px" src="../assets/images/health.png" />
          <p class="lifespan">{{ member.extendedLifespan }}</p>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>
<script>
import {
  limit,
  getDocs,
  collection,
  getFirestore,
  query,
  orderBy,
} from "firebase/firestore";

export default {
  name: "RankingUserList",
  components: {
    // 読み込んだコンポーネント名をここに記述する
  },
  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      //user_list=[{extendedLifspan:1,icon:"aiueo",userId:"aiueoId",userName:"namae"}]
      userlist: [],
    };
  },
  created() {
    const db = getFirestore();
    getDocs(
      query(
        collection(db, "users"),
        orderBy("extendedLifespan", "desc"),
        limit(3)
      )
    ).then((data) => {
      data.forEach((user) => {
        this.userlist.push(user.data());
      });
    });

    console.log("userlist is", this.userlist);
  },
  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
  },
  methods: {
    // Vue.jsで使う関数はここで記述する
  },
};
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSは */
.rankingStyle {
  margin-top: 70px;
}
.member {
  background-color: white;
  padding: 8px;
  margin: 4px;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.memberName {
  font-size: 16px;
  padding: 4px;
}
.lifespan {
  padding-right: 24px;
  padding-left: 12px;
  font-weight: bold;
  font-size: 20px;
}
.leftContent {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
