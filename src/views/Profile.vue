<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <form class="ui large form" v-on:submit="submit">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" v-model="emailNew" placeholder="新しいメアド">
            </div>
          </div>
          
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" placeholder="新しいパスワードを入力してください" v-model="passwordNew">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" placeholder="パスワード確認用" v-model="passwordAgain">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="tag icon"></i>
              <input type="text" placeholder="username" v-model="usernameNew">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="image icon"></i>
              <input type="text" placeholder="icon" v-model="iconNew">
            </div>
          </div>
          <li v-if="err" class="err-msg">{{err}}</li>
          <button class="ui huge green fluid button" type="submit">更新</button>

        </form>
      </div>
      <button v-on:click="deleteUser" class="ui huge grey fluid button">退会</button>
    </div>
    <div v-if="loading">
      <div class="ui active loader"></div>
    </div>
  </div>

</template>
<script>
  import accountFunc from "../functions/accountFunc";
  const {getMyUserData,getMyAccountData,
  changeEmail,
  changePassword,
  changeUserData
    
  } = accountFunc();
  export default {
    name: 'Profile',
    components: {
      // 読み込んだコンポーネント名をここに記述する
    },
    data() {
      // Vue.jsで使う変数はここに記述する
      return {
        user: {
          userId: window.localStorage.getItem("userId"),
          email:null,
          username: null,
          icon: null,
        },
        emailNew:null,
        passwordNew: null,
        passwordAgain:null,
        usernameNew:null,
        iconNew:null,
        err: null,
        loading: true,
      };
    },
    computed: {
      // 計算した結果を変数として利用したいときはここに記述する
    },
    created() {
      getMyUserData(this.user.userId).then((data)=>{
        console.log(data)
        this.user.username = data.userName;
        this.usernameNew = data.userName;
        this.user.icon = data.icon;
        this.iconNew = data.icon;
        console.log(this.user);
      });
      const acdata = getMyAccountData();
      this.user.email = acdata;
      this.emailNew = acdata;
    },
    methods: {
      // Vue.jsで使う関数はここで記述する
      submit() {

        if (this.passwordNew && this.passwordAgain) {
          if(this.passwordNew === this.passwordAgain){
            changePassword(this.user.password)
          }
          else{
            alert("パスワードが一致しません")
          }
        }else{
          alert("パスワードを入力してください")
        }
        if(this.emailNew){
          if(this.user.email !== this.emailNew){
            changeEmail(this.emailNew);
          }
        }
        if (this.user.username !== this.usernameNew || this.user.icon !== this.iconNew){
          console.log(this.usernameNew)
          changeUserData(this.user.userId,this.usernameNew,this.iconNew);
        }
        this.loading = true;
        
        // const requestBody = {
        //   userId: this.user.userId,
        //   password: this.user.password,
        //   nickname: this.user.nickname,
        //   age: this.user.age
        // };
        // axios.put(baseUrl + "/user", requestBody)
        //   .then(() => {
        //     this.$router.push({ name: "Home" });
        //     this.loading = false;
        //   })
        //   .catch((e) => {
        //     this.loading = false;
        //     throw new Error(e);
        //   })
      },
      deleteUser() {
        this.loading = true;
        // axios.delete(baseUrl + "/user", {
        //     data: {
        //       userId: this.user.userId
        //     }
        //   })
        //   .then(() => {
        //     this.$router.push({ name: "Login" });
        //   })
        //   .catch((e) => {
        //     throw new Error(e);
        //   })
      }
    },
  }
</script>
<style scoped>
  /* このコンポーネントだけに適用するCSSは */
</style>
