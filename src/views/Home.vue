<style scoped>
.ui image label{
  padding:48px;
  display:flex;
  
}
.details{
  display:block;
}
</style>
<template>
  <div class="ui main container">
    <div class="ui segment">
      <img src="" class="logo">
      <div class="content">
        <div>
          <div>
            <a class="ui image label">
              <!--アイコン-->
              <img src="">
              <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">
                  {{this.user.username}}
                </font>
              </font>
              <img src="../assets/images/health.png">
              <div class="detail">
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">{{this.user.extendedLifespan}}</font>
                </font>
              </div>
            </a>
          </div>
          <button>
            <div>
              <i class="user outline icon"></i>
              <h3>一人で作業</h3>
              <p>一人で作業を行います。</p>
            </div>
          </button>
          <button>
            <div>
              <i class="user outline icon"></i>
              <h3>みんなで作業</h3>
              <p>ルームのオーナーになって</p>
              <p>参加者を募集します</p>
            </div>
          </button>
          <button>
            <div>
              <i class="sign in alternate icon"></i>
              <h3>ルームに参加</h3>
              <p>教えてもらった</p>
              <p>ルームIDから参加する</p>
            </div>
          </button>
        </div>
        <!-- 左側の画面 -->
        <div class="">

          <div class="">
            <button>
              <div>
                <i class="question circle icon"></i>
                <p>使い方</p>
              </div>
            </button>
            <button class="">
              <i class="child icon"></i>
              <p>ストレッチ一覧</p>
            </button>
            <button class="">
              <div>
                <i class="cogs icon"></i>
                <p>設定</p>
              </div>
            </button>
            <button class="">
              <div>
                <i class="sign out alternate icon"></i>
                <p>ログアウト</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <Ranking></Ranking>
    <!--git hubの草-->
  </div>
</template>

<script>
  import accountFunc from "../functions/accountFunc";
  const { getMyUserData, getMyHistories } = accountFunc();
  import Ranking from "../components/Ranking.vue";
  export default {
    name: 'Home',
    data() {
      // Vue.jsで使う変数はここに記述する
      return {
        user: {
          userId: null,
          username: null,
          icon: null,
          extendedLifespan: null,
        },
        isLoading: false,
      };
    },
    component:{
      Ranking
    },
    computed: {
      // 計算した結果を変数として利用したいときはここに記述する
    },
    created() {
      // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
      this.user.userId = window.localStorage.getItem("userId");
      console.log("userId is:", this.user.userId);
      console.log("is logined?:", this.user.userId ? true : false);
      if (!this.user.userId) {
        this.$router.push({ name: "Login" });
      }
      else {
        //ユーザーデータを取得

        getMyUserData(this.user.userId).then((value) => {
          console.log("userData is", value)
          this.user.username = value.userName;
          this.user.icon = value.icon;
          this.user.extendedLifespan = value.extendedLifespan;
        })

        getMyHistories(this.user.userId).then((value) => {
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
