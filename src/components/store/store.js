import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//初始化数据
const state = {
    count: 0,
    bottom:"0",
    player:false,
    songNew:"",
    songList:""
};

//改变状态的方法
const mutations = {
  changeBottom(state,data) {
    state.bottom=data;
  },
  changePlayerState(state,data) {
    state.player=data;
  },
  changeSongNew(state,data){
    state.songNew=data;
  },
  songList(state,data){
    state.songList=data;
  }
};

const getters={
  getSongNew: state => {
    return state.songNew;
  },
  getPlayState:state=>{
    return state.player;
  },
  getsongList:state=>{
    return state.songList;
  }
};

let vuexStore = new Vuex.Store({
    state,
    getters,
    mutations
});

// 使用 export default 封装，让外部可以访问
export default vuexStore;