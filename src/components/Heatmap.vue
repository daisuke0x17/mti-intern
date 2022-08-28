<template>
  <div  class="heatmapStyle">
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <calendarHeatmap tooltip-unit="分寿命を伸ばしました！" :values="histories" :end-date="today" :max="110" :range-color="[                                                                                                                     '#ebedf0',
  'rgba(255,202,43,0.4)',
  'rgba(255,202,43,0.6)',
  'rgba(255,202,43,0.8)',
  'rgba(255,202,43,1.0)',
]"></calendarHeatmap>
      <button @click="print">print</button>
    </div>
  </div>
</template>
<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import accountFunc from "../functions/accountFunc";
const {getMyHistories} = accountFunc();
import {CalendarHeatmap} from "vue-calendar-heatmap";
export default {
  name: 'Heatmap',
  components: {
   // 読み込んだコンポーネント名をここに記述する
    CalendarHeatmap
  },
  data() {
  // Vue.jsで使う変数はここに記述する
    return {
        userId:null,
        isLoading:false,
        histories:[],
        today:null,
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
    
  },
  mounted(){
      this.today = this.formatday(new Date());
      this.userId = window.localStorage.getItem("userId");
      console.log("userId is:",this.userId)
      getMyHistories(this.userId).then((value)=>{
        this.histories = value;
        console.log("value is:",value);
      })
  },
  methods: {
  // Vue.jsで使う関数はここで記述する
        print(){
            console.log("histories is:",this.histories);
            console.log("today is:",this.today);
        },
        formatday(date){
            const formattedday = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
            console.log("today is:",formattedday);
            return formattedday;
        }
  },
}
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSは */
.heatmapStyle{
    width:600px;
}
</style>