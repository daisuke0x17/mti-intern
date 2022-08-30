<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: #444444;
}
.ui main container {
  height: 100vh;
  background-color: #424242;
}
/* 画面上部 */
.top-wrapper {
  height: 50vh;
}
/* 画面下部 */
.bottom-wrapper {
  height: 50vh;
}
/* テスト */
.profile-wrapper {
  height: 250px;
  width: 100%;
  margin: 10px;
  border-radius: 2rem;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 10px 10px -6px rgba(0, 0, 0, 0.3);
}
.profile-name {
  font-size: 3rem;
}
.life-minutes {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.extend-life {
  font-size: 1.3rem;
  text-align: end;
}
font {
  font-size: 3rem;
}
.common-btn {
  display: inline-block;
  height: 100px;
  width: 100px;
  background-color: #fff;
  font-size: 1.5rem;
  text-align: center;
  border-radius: 5%;
  transition: all 0.3s;
}

.common-btn:hover {
  background: rgb(238, 238, 238);
}
.tutorial-border {
  border-color: rgb(204, 32, 41);
}
.stretch-border {
  border-color: rgb(240, 113, 44);
  font-size: 1.2rem;
}
.setting-border {
  border-color: rgb(249, 188, 46);
}
.logout-border {
  border-color: rgb(181, 202, 49);
}
.mode-wrapper {
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
.mode-btn-wrapper {
  height: 80px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.mode-btn-icon {
  font-size: 4.5rem;
  color: #fff;
  vertical-align: -3px;
  padding-top: 25px;
}
.alone-mode {
  background-color: #f7981c;
}
.together-mode {
  background-color: #39b54a;
}
.join-mode {
  background-color: #1ca5cb;
}
h3 {
  font-size: 2rem;
  margin: 10px 0;
}
.white {
  color: #fff;
}
.gray {
  color: #666666;
}
</style>
<template>
  <div class="ui main container">
    <!-- ここから -->
    <!-- 上側 -->
    <div class="ui grid stackable top-wrapper">
      <div class="eleven wide column">
        <div class="ui four column grid">
          <!-- プロフィール -->
          <div class="row">
            <div class="profile-wrapper">
              <div class="profile-name">
                <!-- アイコン挿入予定？<img src=""> -->
                <font style="vertical-align: inherit">
                  <font style="vertical-align: inherit">
                    {{ this.user.username }}
                  </font>
                </font>
              </div>

              <div class="profile-life">
                <p class="extend-life">伸びた寿命</p>
                <div class="life-minutes">
                  <div>
                    <img src="../assets/images/health.png" />
                  </div>
                  <div>
                    <font style="vertical-align: inherit">
                      {{ this.user.extendedLifespan }} </font
                    >分
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 設定ボタンなどのセクション -->
          <!-- 使い方ボタン -->
          <div class="column">
            <button class="common-btn tutorial-border">
              <div>
                <i class="question circle icon gray"></i>
                <p class="gray">使い方</p>
              </div>
            </button>
          </div>
          <!-- ストレッチ一覧ボタン -->
          <div class="column">
            <button class="common-btn stretch-border">
              <div>
                <i class="child icon gray"></i>
                <p class="gray">ストレッチ<br />一覧</p>
              </div>
            </button>
          </div>
          <!-- 設定ボタン -->
          <div class="column">
            <button class="common-btn setting-border">
              <div>
                <i class="cogs icon gray"></i>
                <p class="gray">設定</p>
              </div>
            </button>
          </div>
          <!-- ログアウトボタン -->
          <div class="column">
            <button class="common-btn logout-border" @click="logout">
              <div>
                <i class="sign out alternate icon gray"></i>
                <p class="gray">logout</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- ゲームモード -->
      <div class="five wide column stackable">
        <div class="mode-wrapper">
          <!-- 一人で作業ボタン -->
          <div class="ui button alone-mode" @click="show">
            <div class="mode-btn-wrapper">
              <div>
                <i class="user outline icon mode-btn-icon"></i>
              </div>
              <div>
                <h3 class="white">一人で作業</h3>
                <p class="white">一人で作業を行います</p>
              </div>
            </div>
          </div>

          <!-- みんなで作業ボタン -->
          <div class="ui button together-mode" @click="choise">
            <div class="mode-btn-wrapper">
              <div>
                <i class="users outline icon mode-btn-icon"></i>
              </div>
              <div>
                <h3 class="white">みんなで作業</h3>
                <p class="white">
                  ルームのオーナーになって<br />
                  参加者を募集します
                </p>
              </div>
            </div>
          </div>
          <!-- ルームに参加ボタン -->
          <div class="ui button join-mode" @click="joinRoom">
            <div class="mode-btn-wrapper">
              <div>
                <i class="sign in alternate icon mode-btn-icon"></i>
              </div>
              <div>
                <h3 class="white">ルームに参加</h3>
                <p class="white">
                  教えてもらった<br />
                  ルームIDから参加する
                </p>
              </div>
            </div>
          </div>
          <div class="ui input focus">
            <input
              type="text"
              v-model="joinRoomId"
              placeholder="Room IDを入力"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 下側 -->
    <div class="ui grid stackable bottom-wrapper">
      <div class="four wide column">
        <RankingUserList></RankingUserList>
      </div>
      <div class="twelve wide column git-hub">
        <Heatmap></Heatmap>
      </div>
    </div>
    <!--ここから北松がmodalの処理を書きました。-->
    <modal name="hello-world" :draggable="true" :resizable="true">
      <div class="modal-header">
        <h2>はじめますか</h2>
      </div>
      <div class="modal-body">
        <form class="ui large form" v-on:submit="submit">
          <div class="field">
            <div class="ui input">
              <p class="kakikukeko">作業時間</p>
              <select v-model="user.taskTime">
                <option disabled value=""></option>
                <option
                  v-for="minute in workMinute"
                  :value="minute.minute"
                  :key="minute.minute"
                >
                  {{ minute.work }}
                  <!--{{minute.minute}}時間の分数-->
                </option>
              </select>
            </div>
          </div>
          <div class="field">
            <div class="ui input">
              <p class="kakikukeko">休憩時間</p>
              <select v-model="user.restTime">
                <option disabled value=""></option>
                <option
                  v-for="minute in restMinute"
                  :value="minute.minute"
                  :key="minute.minute"
                >
                  {{ minute.rest }}
                </option>
              </select>
            </div>
          </div>
          <li v-if="err" class="err-msg">{{ err }}</li>
          <div class="fields">
            <div class="field">
              <button class="ui button" v-on:click="hide">閉じる</button>
            </div>
            <div class="field">
              <button class="ui button" @click="submit" type="submit">
                はじめる
              </button>
            </div>
          </div>
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
import accountFunc from "../functions/accountFunc";
import RoomFunc from "../functions/RoomFunc";
import Heatmap from "../components/Heatmap.vue";
import RankingUserList from "../components/RankingUserList.vue";
const { getMyUserData, getMyHistories, logout } = accountFunc();
const { createRoom, joinRoom, gotoRoom } = RoomFunc();
export default {
  name: "Home",
  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      user: {
        userId: null,
        username: null,
        icon: null,
        extendedLifespan: null,
        taskTime: null,
        restTime: null,
      },
      isLoading: false,
      joinRoomId: null,
      selectedJenre: null,
      workMinute: [
        { minute: 30, work: "30分" },
        { minute: 45, work: "45分" },
        { minute: 60, work: "60分" },
        { minute: 75, work: "75分" },
        { minute: 90, work: "90分" },
      ],
      restMinute: [
        { minute: 5, rest: "5分" },
        { minute: 10, rest: "10分" },
        { minute: 15, rest: "15分" },
        { minute: 20, rest: "20分" },
        { minute: 25, rest: "25分" },
      ],
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
    } else {
      //ユーザーデータを取得

      getMyUserData(this.user.userId).then((value) => {
        console.log("userData is", value);
        this.user.username = value.userName;
        this.user.icon = value.icon;
        this.user.extendedLifespan = value.extendedLifespan;
      });

      getMyHistories(this.user.userId).then((value) => {
        console.log(value);
      });
    }
  },
  methods: {
    submit() {
      if (this.selectedJenre === "multi") {
        this.createRoom();
      } else if (this.selectedJenre === "single") {
        this.gotoRoom();
      }
    },
    logout() {
      logout(() => this.$router.push({ name: "Login" }));
    },
    createRoom() {
      this.setTimes();
      createRoom(this.user.userId, this.user.taskTime, this.user.restTime, () =>
        this.$router.push({ name: "Room" })
      );
    },
    joinRoom() {
      if (this.joinRoomId) {
        this.setTimes();
        joinRoom(this.joinRoomId, this.user.userId, () =>
          this.$router.push({ name: "Room" })
        );
      } else {
        alert("ルームIDを入力してください！");
      }
    },
    gotoRoom() {
      this.setTimes();
      gotoRoom(() => this.$router.push({ name: "Room" }));
    },
    setTimes() {
      window.localStorage.setItem("taskTime", this.user.taskTime);
      window.localStorage.setItem("restTime", this.user.restTime);
    },
    show: function () {
      this.selectedJenre = "single";
      this.$modal.show("hello-world");
    },
    choise: function () {
      this.selectedJenre = "multi";
      this.$modal.show("hello-world");
    },
    hide: function () {
      this.$modal.hide("hello-world");
    },

    // joinRoom(){
    //   joinRoom()
    // }
  },
};
</script>
<style scoped>
.modal-header {
  margin: 8px;
  padding: 8px;
}
.modal-body {
  padding: 5px 25px;
}
.time {
  padding: 5px;
}
#close {
  margin-top: 6px;
}
.modal-header {
  border-bottom: 1px solid #ddd;
}
.kakikukeko {
  width: 80px;
  display: flex;
  align-items: center;
}
</style>
