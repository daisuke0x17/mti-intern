<template>
    <div id="timer">
        <div class="timer">
            <div class="time">
                {{ formatTime }}
            </div>
            <div class="timer-btn">
              <button class="ui primary button" @click="start">Start</button>
              <button class="ui red button" @click="stop">Stop</button>
            </div>
        </div>
    </div>
</template>
<script>
  // 必要なものはここでインポートする
  // @は/srcの同じ意味です
  export default {
    name: 'Timer',
    components: {
      // 読み込んだコンポーネント名をここに記述する

    },
    data() {
      // Vue.jsで使う変数はここに記述する
      return {
        min: 50,
        sec: 0,
        timerOn: false,
        timerObj: null,
      };
    },
    computed: {
      // 計算した結果を変数として利用したいときはここに記述する
      formatTime: function() {
      let timeStrings = [
        this.min.toString(),
        this.sec.toString()
      ].map(function(str) {
        if (str.length < 2) {
          return "0" + str
        } else {
          return str
        }
      })
      return timeStrings[0] + ":" + timeStrings[1]
    }
    },
    methods: {
        count: function() {
            if (this.sec <= 0 && this.min >= 1) {
                this.min --;
                this.sec = 59;
            } else if(this.sec <= 0 && this.min <= 0) {
                this.complete();
            } else {
                this.sec --;
            }
        },

        start: function() {
        let self = this;
        this.timerObj = setInterval(function() {self.count()}, 1000)
        this.timerOn = true; //timerがONであることを状態として保持
        },

        stop: function() {
        clearInterval(this.timerObj);
        this.timerOn = false; //timerがOFFであることを状態として保持
        },

        complete: function() {
        clearInterval(this.timerObj)
        }
    },
  }
</script>
<style scoped>
  /* このコンポーネントだけに適用するCSSは */
.timer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap:5rem;
}
.time {
    font-size: 10rem;
    color:#fff;
}
</style>
