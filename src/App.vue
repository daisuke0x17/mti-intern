<template>
  <div id="app">
    
    <Menu></Menu>
    <router-view/>
    <Loading v-show="loading"></Loading>
  </div>
</template>

<script>
  import Menu from "@/components/Menu.vue";
  export default {
    name:"App",
    components:{
      Menu,
    }
  }
</script>
