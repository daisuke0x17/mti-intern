<template>
  <div id="timer">
    <div class="timer">
      <div v-if="currentMode === 'task'">
        <h1>残り作業時間</h1></div>
      <div v-else>
        <div>
          <img :src="imgSrc" width="400px">
        </div>
      </div>
        <h1>残り休憩時間</h1>
      <div class="time">
        {{ formatTime }}
      </div>
    </div>
  </div>
</template>
<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
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
      numOfImg: 2
    };
  },
  created() {
    this.taskTime = window.localStorage.getItem(1);
    this.restTime = window.localStorage.getItem("restTime");

    console.log(this.taskTime, ":", this.restTime);
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
    imgSrc: function (){
      const index = Math.floor(Math.random() * this.numOfImg)+1
      return require("../assets/images/stretch"+ index +".png");
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
*{
  padding: 0;
  margin: 0;
}
.timer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.time {
  font-size: 10rem;
  color: #fff;
}

h1{
  color:#fff;
  margin-bottom: 3rem;
}
</style>
