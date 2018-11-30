<template>
  <div id="app">
    <div class="app_Mask">
      <Header/>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <player/>
    </div>
  </div>
</template>
<style>
  #app{
    height: 100%;
    background:url('https://open.saintic.com/api/bingPic?picSize=2') no-repeat top center;
    background-size: cover;
  }
  .app_Mask{
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
  }
</style>
<script>
import Header from './components/base/Header';
import player from './components/base/player'
  export default {
    name: 'App',
    data(){
      return{
        
      }
    },
    mounted(){
        
    },
    methods:{
      
    },
    components:{
      Header,
      player
    }
  }
</script>

<style>

