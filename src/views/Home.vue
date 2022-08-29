<style scoped>
  .ui main container{
    height:100vh;
    background-color: #424242;
    margin-top:100px;
  }
  /* 画面上部 */
  .top-wrapper{
    height:50vh;
  }
  /* 画面上部左側 */
    .my-profile-wrapper{
      height: 90%;
    }
    .top-btn-wrapper{
      display:flex;
      justify-content: space-around;
      margin-top:5%;
    }
    .top-btn{
      display:inline-block;
      height:130px;
      width: 130px;
      background-color: #fff;
      color: #666666;
      font-size: 3rem;
      text-align: center;
      border-radius: 10%;
    }
    .top-btn-chr{
      color: #666666;
      font-size: 1.1rem;
      font-weight: bold;
    }
    /* 画面上部右側 */
    .top-right-btn-wrapper{
      height: 100%;
    }
    .top-right-btn {
      display: block;
      height:30%;
      margin-bottom:8%;
    }
    .mode-btn-flex{
      display: flex;
      justify-content: center;
    }
    .mode-name {
      font-size: 1.5rem;
      color:#fff;
    }
    .mode-icon{
      color:#fff;
    }
    .mode-describe{
      color:#fff;
    }

  /* 画面下部 */
  .bottom-wrapper{
    height: 50vh;
  }

  .ui image label {
    display: flex;
  }

  /* テスト */
  .inputTest{
    position:absolute;
    top:100px;
    right:200px;
  }
</style>
<template>
  <div class="ui main container">
    <div class="top-wrapper">
      <div class="ui grid stackable">
        <!-- 左側の画面 -->
        <div class="eleven wide column">
          <div class="ui segment my-profile-wrapper">
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
          <div class="top-btn-wrapper">
            <button class="top-btn">
              <div>
                <i class="question circle icon"></i>
                <p class="top-btn-chr">使い方</p>
              </div>
            </button>

            <button class="top-btn">
              <div>
                <i class="child icon"></i>
                <p class="top-btn-chr">ストレッチ一覧</p>
              </div>
            </button>
            <button class="top-btn">
              <div>
                <i class="cogs icon"></i>
                <p class="top-btn-chr">設定</p>
              </div>
            </button>
            <button class="top-btn">
              <div>
                <i class="sign out alternate icon"></i>
                <p class="top-btn-chr">ログアウト</p>
              </div>
            </button>
          </div>
        </div>
        <!-- 右側の画面 -->
        <div class="five wide column top-right-btn-wrapper">
          <!--自分のプロフィール-->
          <div class="ui orange button top-right-btn" @click="gotoRoom">
              <div class="ui header mode-icon">
                <i class="user outline icon"></i>
                <div class="content mode-name">
                  一人で作業
                  <div class="sub header">
                    一人で作業を行います。
                  </div>
                </div>
              </div>
            </div>
          <div class="ui green button top-right-btn" @click="createRoom">
            <div class="ui header">
              <i class="user outline icon mode-icon"></i>
              <div class="content mode-name">
                みんなで作業
                <div class="sub header">
                  ルームのオーナーになって<br>
                  参加者を募集します
                </div>
              </div>
            </div>
          </div>
          <div class="ui blue button top-right-btn" @click="joinRoom">
            <div class="ui header">
              <i class="sign in alternate icon mode-icon"></i>
              <div class="content mode-name">
                ルームに参加
                <div class="sub header">
                  教えてもらった
                  ルームIDから参加する
                </div>
              </div>
            </div>
          </div>
          <input class="inputTest" type="text" placeholder="roomId" v-model="joinRoomId">
        </div>
      </div>
    </div>
    <div class="bottom-wrapper">
      <div class="ui grid stackable">
        <div class="four wide column">
          <!--ランキング画面-->
          <RankingUserList></RankingUserList>
        </div>
        <div class="eleven wide column">
          <!--git hubの草-->
          <Heatmap></Heatmap>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import accountFunc from "../functions/accountFunc";
  import RoomFunc from "../functions/RoomFunc";
  import Heatmap from "../components/Heatmap.vue";
  import RankingUserList from "../components/RankingUserList.vue";
  const { getMyUserData, getMyHistories, logout } = accountFunc();
  const {createRoom,joinRoom,gotoRoom} = RoomFunc();
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
          taskTime:50,
          restTime:10,
        },
        isLoading: false,
        joinRoomId:null,
      };
    },
    components: {
      Heatmap,
      RankingUserList,
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
      logout() {
        logout(() => this.$router.push({ name: "Login" }));
      },
      createRoom(){
        this.setTimes();
        createRoom(this.user.userId,this.user.taskTime,this.user.restTime,()=>this.$router.push({ name: "Room" }));
      },
      joinRoom(){
        if(this.joinRoomId){
        this.setTimes();
        joinRoom(this.joinRoomId,this.user.userId,()=>this.$router.push({ name: "Room" }));
        }else{
          alert("ルームIDを入力してください！")
        }
      },
      gotoRoom(){
        this.setTimes();
        gotoRoom(() => this.$router.push({ name: "Room" }))
      },
      setTimes(){
        window.localStorage.setItem("taskTime",this.user.taskTime);
        window.localStorage.setItem("restTime",this.user.restTime);
      },
      show: function() {
        this.$modal.show('hello-world')
      },
      hide: function() {
        this.$modal.hide('hello-world')
      },

      // joinRoom(){
      //   joinRoom()
      // }
    }
  }
</script>
<style scoped>

</style>
