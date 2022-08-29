<style scoped>
/* このコンポーネントだけに適用するCSSは */
.memberList {
  width: 300px;
  padding: 12px;
  border-radius: 20px;
  background-color: #c4c4c4;
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
  font-size: 24px;
  padding: 4px;
}
.leftContent {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.lifespan {
  padding-right: 24px;
  padding-left: 12px;
}
.title {
  color: black;
}
.mainContent {
  display: flex;
  flex-direction: row;
  padding: 12px;
  flex: 1;
}
h1 {
  color: white;
}
.roomID {
  padding: 12px;
}
.buttonroom {
  background-color: #1ca5cb;
  padding: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  width: 160px;
}
.roomText {
  color: white;
  font-weight: bold;
  font-size: 16px;
}
.haittemorau {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.haitte {
  padding: 12px;
  font-size: 20px;
  color: white;
  font-weight: bold;
}
.center {
  width: 40%;
}
.left {
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  height: 100%;
}
.oya {
  height: 100vh;
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>
<template>
  <div class="oya">
    <!-- 基本的なコンテンツはここに記載する -->
    <div class="mainContent">
      <div class="left" v-if="!isAlone">
        <div class="memberList">
          <h1 class="title">メンバー</h1>
          <div
            v-for="(member, index) in roomMembers"
            :key="index"
            class="member"
          >
            <div class="leftContent">
              <i class="circular big user icon"></i>
              <p class="memberName">{{ member.userName }}</p>
            </div>
            <div class="leftContent">
              <img width="32px" src="../assets/images/health.png" />
              <p class="lifespan">{{ member.extendedLifespan }}</p>
            </div>
          </div>
        </div>
        <div class="roomID">
          <h1>roomID {{ currentRoomId }}</h1>
          <div class="haittemorau">
            <div class="buttonroom">
              <i class="inverted big sign in alternate icon"></i>
              <p class="roomText">ルームに参加</p>
            </div>
            <p class="haitte">から入ってもらう</p>
          </div>
        </div>
      </div>
      <div class="center">
        <Timer> </Timer>
      </div>
      <div>
        <button @click="getoutRoom" class="ui button">ルームを出る</button>
      </div>
    </div>
  </div>
</template>
<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import Timer from "../components/Timer.vue";
import RoomFunc from "../functions/RoomFunc";
const { startTask, endTask, getOutRoom } = RoomFunc();
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
export default {
  name: "Room",
  components: {
    // 読み込んだコンポーネント名をここに記述する
    Timer,
  },
  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      userId: null,
      currentRoomId: null,
      extendedLifespan: 0,
      isAlone: null,
      isRest: false,
      pomodoroTime: 50,
      taskTime: null,
      restTime: null,
      roomMembers: [],
      iconName: [
        "chess bishop icon",
        "chess board icon",
        "chess king icon",
        "chess knight icon",
        "chess pawn icon",
        "chess queen icon",
        "chess rook icon",
      ],
    };
  },
  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
  },
  mounted() {
    window.addEventListener("beforeunload", this.confirmSave);
  },
  unmounted() {
    window.removeEventListener("beforeload", this.confirmSave);
  },
  methods: {
    // Vue.jsで使う関数はここで記述する
    confirm() {
      return window.confirm("ページを離脱してもよろしいですか？");
    },
    setTime() {},
    endTask() {
      endTask();
    },
    getoutRoom() {
      if (this.confirm() === false) return;
      if (this.isAlone === "true") {
        console.log("eeeeeee");
        endTask(this.userId, () => this.$router.push({ name: "Home" }));
      } else {
        console.log("uuuuuu");
        getOutRoom(this.userId, this.currentRoomId, () =>
          this.$router.push({ name: "Home" })
        );
      }
    },
  },
  created() {
    console.log("created!!");
    startTask(() => {});
    this.userId = window.localStorage.getItem("userId");
    this.isAlone = window.localStorage.getItem("isAlone");
    this.taskTime = window.localStorage.getItem("taskTime");
    this.restTime = window.localStorage.getItem("restTime");
    if (!this.taskTime || !this.restTime) {
      this.$router.push({ name: "Home" });
    }
    if (this.isAlone === "false") {
      this.currentRoomId = window.localStorage.getItem("roomId");
      const db = getFirestore();
      onSnapshot(
        collection(db, "rooms", `${this.currentRoomId}`, "roomMembers"),
        (docs) => {
          let tmp2 = [];
          docs.forEach((doc) => {
            tmp2.push(doc.data());
          });
          this.roomMembers = tmp2;
        }
      );
      console.log("メンバーが入室しました！");
    }
  },
};
</script>
