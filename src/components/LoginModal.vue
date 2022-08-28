<template>
  
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <button v-on:click="show" class="button">show!</button>
  <modal name="hello-world" :draggable="true" :resizable="true">
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
            <button class="ui huge green fluid button" type="submit">{{submitText}}</button>
        </form>
  </modal>
    </div>
 
</template>
<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
export default {
  name: 'LoginModal',
  components: {
   // 読み込んだコンポーネント名をここに記述する
  },
  data() {
  // Vue.jsで使う変数はここに記述する
    return {
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  },
    methods:{
      show:function(){
        this.$modal.show('hello-world')
      },
      hide:function(){
        this.$modal.hide('hello-world')
      }
    }
}
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSは */
.modal-header, .modal-body {
  padding: 5px 25px;
}
.modal-header {
  border-bottom: 1px solid #ddd;
}
</style>