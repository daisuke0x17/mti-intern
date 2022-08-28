<template>
  
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <button v-on:click="show" class="button">show!</button>
  <modal name="hello-world" :draggable="true" :resizable="true">
    <div class="modal-header">
      <h2>Modal title</h2>
    </div>
    <div class="modal-body">
      <p>you're reading this text in a modal!</p>
      <button v-on:click="hide">閉じる</button>
    </div>
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