<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <h1>ルーム</h1>
      <Timer>

      </Timer>
      <div v-for="member in roomMembers" :key="member.userId">
        <p>{{member.userId}}</p>
        <p>{{member.userName}}</p>
        <p>{{member.icon}}</p>
        <p>{{member.extendedLifespan}}</p>
      </div>
      <button @click="getoutRoom" class="ui button">ルームから出る</button>
    </div>
  </div>
</template>
<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import Timer from  '../components/Timer.vue';
import RoomFunc from "../functions/RoomFunc";
const {onMembersChage,
startTask,
endTask,getOutRoom} = RoomFunc();
export default {
  name: 'Room',
  components: {
   // 読み込んだコンポーネント名をここに記述する
   Timer
  },
  data() {
  // Vue.jsで使う変数はここに記述する
    return {
      userId:null,
      currentRoomId:null,
      extendedLifespan:0,
      isAlone:null,
      isRest: false,
      pomodoroTime: 50,
      taskTime:null,
      restTime:null,
      roomMembers:[],
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  },
  mounted(){
    window.addEventListener("beforeunload", this.confirmSave);
  },
  unmounted(){

    window.removeEventListener("beforeload",this.confirmSave);
  },
  methods: {
  // Vue.jsで使う関数はここで記述する
		confirm(){return window.confirm('ページを離脱してもよろしいですか？');
    },
    setTime(){

    },
    endTask(){
      endTask()
    },
    getoutRoom(){
      if (this.confirm() === false) return;
      if(this.isAlone === "true"){
        console.log("eeeeeee")
            endTask(this.userId,()=>this.$router.push({ name: "Home" }));
        }else{
          console.log("uuuuuu")
            getOutRoom(this.userId,this.currentRoomId,()=>this.$router.push({ name: "Home" }));
        }
    }
  },
  created(){
    startTask(()=>{});
    this.userId = window.localStorage.getItem("userId");
    this.isAlone = window.localStorage.getItem("isAlone");
    this.taskTime = window.localStorage.getItem("taskTime");
    this.restTime = window.localStorage.getItem("restTime");
    if(!this.taskTime || !this.restTime){
      this.$router.push({ name: "Home" })
    }
    if(this.isAlone === "false"){
      this.currentRoomId = window.localStorage.getItem("roomId");
      this.roomMembers = onMembersChage(this.currentRoomId);
      console.log("メンバーが入室しました！");
    }

    console.log("currentRoomId is:",this.currentRoomId);

  }
}
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSは */
</style>
