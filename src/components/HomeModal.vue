<template>
  <div>
    <div class="right menu">
      <button v-on:click="show" class="ui inverted basic button">
        ログイン
      </button>
    </div>
            <modal name="hello-world" :draggable="true" :resizable="true">
        <div class="modal-header">
          <h2>ログイン</h2>
        </div>
        <div class="modal-body">
          <form class="ui large form" v-on:submit="submit">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="email" placeholder="e-mail" v-model="email">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" required placeholder="Password" v-model="password">
              </div>
            </div>
            <div class="field" v-if="!isLogin">
              <div class="ui left icon input">
                <i class="tag icon"></i>
                <input type="text" placeholder="Name" v-model="name">
              </div>
            </div>
            <li v-if="err" class="err-msg">{{err}}</li>
            <button class="ui huge gray fluid button" type="submit">{{submitText}}</button>
            <button class="ui huge gray fluid button" v-on:click="hide">閉じる</button>
          </form>
        </div>
      </modal>
    </div>
</template>
<script>
  import accountFunc from "../functions/accountFunc";
  const { logIn, signUp } = accountFunc();

  export default {

    name: 'LoginModal',
    components: {
      // 読み込んだコンポーネント名をここに記述する

    },
    data() {
      // Vue.jsで使う変数はここに記述する
      return {
        isLogin: true,
        user: {
          userId: null,
          password: null,
          name: null,
          age: null
        },
        email: null,
        password: null,
        err: null,
        loading: false,
      };
    },
    computed: {
      // 計算した結果を変数として利用したいときはここに記述する
      submitText() {
        return this.isLogin ? "ログイン" : "新規登録";
      },
      toggleText() {
        return this.isLogin ? "新規登録" : "ログイン";
      }
    },
    methods: {
      toggleMode() {
        this.isLogin = !this.isLogin;
      },
      show: function() {
        this.$modal.show('hello-world')
      },
      hide: function() {
        this.$modal.hide('hello-world')
      },
      submit() {
        this.loading = true;
        console.log(this.loading)
        if (this.isLogin) {
          //ログイン処理
          console.log("Login");
          logIn(this.email, this.password, () => {
            this.$router.push({ name: "Home" });
          });
          return;
        }
        //新規登録処理
        console.log("signup");
        if (this.name) {
          signUp(
            this.email,
            this.password, { name: this.name },
            () => this.$router.push({ name: "Home" })
          );
          this.loading = false;
        }
        else {
          alert("名前を入力してください");
          this.loading = false;
        }
      },
    },
  }
</script>
<style scoped>
  /* このコンポーネントだけに適用するCSSは */
  .modal-header,
  .modal-body {
    padding: 5px 25px;
  }

  .modal-header {
    border-bottom: 1px solid #ddd;
  }

</style>
