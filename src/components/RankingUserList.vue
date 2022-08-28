<template>
  <div>
    <div class="ui main container">
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
  </div>
</template>
<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';

export default {
  name: 'user_list',
  components: {
   // 読み込んだコンポーネント名をここに記述する
  },
  data() {
  // Vue.jsで使う変数はここに記述する
    return {
      user_list:[],
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  },
  methods: {
  // Vue.jsで使う関数はここで記述する
  },
}
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSは */
</style>