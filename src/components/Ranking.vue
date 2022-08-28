<template>
  <div>
    <div class="ui main container">
      <user_list></user_list>
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import user_list from '@/components/RankingUserList.vue';

export default {
  name: 'Ranking',
  components: {
   // 読み込んだコンポーネント名をここに記述する
  },
  data() {
  // Vue.jsで使う変数はここに記述する
    return {
        ranking:[],
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

</style>