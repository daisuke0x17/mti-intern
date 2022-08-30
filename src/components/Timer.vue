<template>
  <div id="timer">
    <div class="timer">
      <div v-if="currentMode === 'task'"><h1>残り作業時間</h1></div>
      <div v-else>
        <h1>残り休憩時間</h1>
        <h1>ここになんか置く</h1>
      </div>
      <div class="time">
        {{ formatTime }}
      </div>
      <div class="timer-btn">
        <!-- <button class="ui primary button" @click="start">Start</button>
        <button class="ui red button" @click="stop">Stop</button> -->
      </div>
    </div>
  </div>
</template>
<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
import { getFirestore, getDoc, doc } from "firebase/firestore";
export default {
  name: "Timer",
  components: {
    // 読み込んだコンポーネント名をここに記述する
  },
  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      min: 0,
      sec: 0,
      timerOn: false,
      timerObj: null,
      taskTime: null,
      restTime: null,
      currentMode: null,
    };
  },
  created() {
    const tmp = {
      task: window.localStorage.getItem("taskTime"),
      rest: window.localStorage.getItem("restTime"),
    };
    this.currentRoomId = window.localStorage.getItem("roomId");

    if (tmp.task === "null" || tmp.rest === "null") {
      console.log("getted");
      const db = getFirestore();
      const data = getDoc(doc(db, "rooms", `${this.currentRoomId}`));
      console.log("data is", this.currentRoomId);
      data.then((room) => {
        console.log(room.data());
        this.taskTime = room.data().taskTime;
        this.restTIme = room.data().restTime;
        console.log(this.taskTime, ":", this.restTime);
      });
    } else {
      this.taskTime = tmp.task;
      this.restTime = tmp.rest;
    }
    this.startTask();
  },
  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    formatTime: function () {
      let timeStrings = [this.min.toString(), this.sec.toString()].map(
        function (str) {
          if (str.length < 2) {
            return "0" + str;
          } else {
            return str;
          }
        }
      );
      return timeStrings[0] + ":" + timeStrings[1];
    },
  },
  methods: {
    count: function () {
      if (this.sec <= 0 && this.min >= 1) {
        this.min--;
        this.sec = 59;
      } else if (this.sec <= 0 && this.min <= 0) {
        this.complete();
      } else {
        this.sec--;
      }
    },

    startTask: function () {
      this.currentMode = "task";
      this.min = this.taskTime;
      let self = this;
      this.timerObj = setInterval(function () {
        self.count();
      }, 1000);
      this.timerOn = true; //timerがONであることを状態として保持
    },
    startRest: function () {
      this.min = this.restTime;
      this.currentMode = "rest";
      let self = this;
      this.timerObj = setInterval(function () {
        self.count();
      }, 1000);
      this.timerOn = true; //timerがONであることを状態として保持
    },
    stop: function () {
      clearInterval(this.timerObj);
      this.timerOn = false; //timerがOFFであることを状態として保持
    },

    complete: function () {
      clearInterval(this.timerObj);
      if (this.currentMode === "task") {
        this.startRest();
      } else {
        this.startTask();
      }
    },
  },
};
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSは */
.timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;
}
.time {
  font-size: 10rem;
  color: #fff;
}
</style>
