<style scoped>
  /**{*/
  /*  box-sizing:border-box;*/
  /*}*/
  .ui main container{
    height:100vh;
    background-color: #424242;
    margin-top:100px;
  }
  
  .ui image label {
    display: flex;
  }

  .button {
    display: block;
    margin-left: auto;
    margin-bottom: 2em;
    height:100px;
  }

  .icon {
    position:relative;
    margin-left: auto;
    font-size:1.5em;
    flex-direction:row;
    text-align: left;
  }
 
  h3 {
    font-size: 10px;
    color: white;
  }

  p {
    font-size: 14px;
    color: white;
  }
  
  .inputTest{
    position:absolute;
    top:100px;
    right:200px;
  }
  .white{
    color:white;
  }
</style>
<template>
  <div class="ui main container">
    <!--<div class="ui segment">-->
    <img src="../assets/images/aimani.png" class="logo">
    <div class="ui grid">
      <!-- 左側の画面 -->
      <div class="eleven wide column">
        <div class="ui segment">
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
        <div class="">
          <button>
            <div>
              <i class="question circle icon"></i>
              <p>使い方</p>
            </div>
          </button>
          
          <button class="">
            <div>
              <i class="child icon"></i>
              <p>ストレッチ一覧</p>
            </div>
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
      <!-- 右側の画面 -->
      <div class="five wide column">
        <!--自分のプロフィール-->
        <div class="ui orange button" v-on:click="show">
          <!--@click="gotoRoom"-->
          <div class="ui header">
              <i class="user outline icon"></i>
              <div class="content white">
                一人で作業
                <div class="sub header">
                  <p>一人で作業を行います。</p>
                </div>
              </div>
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
                <div class="time">作業</div>
                <select v-model="selectMinute">
                  <option disabled value="時間"></option>
                  <option v-for="minute in workMinute" :value="minute.work" :key="minute.minute">
                    {{minute.work}}
                    <!--{{minute.minute}}時間の分数-->
                  </option>
                </select>
              </div>
            </div>
            <div class="field">
              <div class="ui input">
                <div class="time">休憩</div>
                <select v-model="selectMinute">
                  <option disabled value="時間"></option>
                  <option v-for="minute in restMinute" :value="minute.rest" :key="minute.minute">
                    {{minute.rest}}
                  </option>
                </select>
              </div>
            </div>
            <li v-if="err" class="err-msg">{{err}}</li>
                <button class="ui huge gray fluid button" v-on:click="hide">閉じる</button>
          </form>
          <button class="ui huge gray fluid button" @click="gotoRoom" type="submit">はじめる</button>
        </div>
      </modal>
      <!--ここまで北松-->
        <div class="ui green button" v-on:click="choise">
          <div class="ui header">
            <i class="user outline icon"></i>
            <div class="content white">
              みんなで作業
              <div class="sub header">
                <p>ルームのオーナーになって</p>
                <p>参加者を募集します</p>
              </div>
            </div>
          </div>
        </div>
      <!--ここから北松がmodalの処理を書きました。-->
      <modal name="choise_minute" :draggable="true" :resizable="true">
        <div class="modal-header">
          <h2>はじめますか</h2>
        </div>
        <div class="modal-body">
          <form class="ui large form" v-on:submit="submit">
            <div class="field">
              <div class="ui input">
                <div class="time">作業</div>
                <select v-model="selectMinute">
                  <option disabled value="時間"></option>
                  <option v-for="minute in workMinute" :value="minute.work" :key="minute.minute">
                    {{minute.work}}
                    <!--{{minute.minute}}時間の分数-->
                  </option>
                </select>
              </div>
            </div>
            <div class="field">
              <div class="ui input">
                <div class="time">休憩</div>
                <select v-model="selectMinute">
                  <option disabled value="時間"></option>
                  <option v-for="minute in restMinute" :value="minute.rest" :key="minute.minute">
                    {{minute.rest}}
                  </option>
                </select>
              </div>
            </div>
            <li v-if="err" class="err-msg">{{err}}</li>
                <button class="ui huge gray fluid button" v-on:click="hide">閉じる</button>
          </form>
          <button class="ui huge gray fluid button" @click="createRoom" type="submit">はじめる</button>
        </div>
      </modal>
        <div class="ui blue button" @click="joinRoom">
          <div class="ui header">
            <i class="sign in alternate icon"></i>
            <div class="content white">
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
    <div class="ui grid">
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
        selectedMinute:'時間',
        workMinute:[
          {minute:30, work:'30分'},
          {minute:45, work:'45分'},
          {minute:60, work:'60分'},
          {minute:75, work:'75分'},
          {minute:90, work:'90分'},
        ],
        restMinute:[
          {minute:5 , rest:'5分'},
          {minute:10, rest:'10分'},
          {minute:15, rest:'15分'},
          {minute:20, rest:'20分'},
          {minute:25, rest:'25分'},
        ]
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
      choise: function(){
        this.$modal.show('choise_minute')
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
  .modal-header{
    margin: 8px;
    padding: 8px;
  }
  .modal-body {
    padding: 5px 25px;
  }
  .time {
    padding: 5px;
  }
  #close{
    margin-top: 6px;
  }
  .modal-header {
    border-bottom: 1px solid #ddd;
  }
</style>
