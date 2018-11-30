<template>
    <div id="rankings_box" :style="{bottom:bottomNum}" >
        <scroll :data="listData" id="rankings" @showDropDown="showDropDown">
            <div class="rankings_content">
                <!---->
                <div class="songlist">
                    <ul>
                        <li v-for="(item,index) in listData" :key="index" @click="playMusic(item)">
                            <div class="songlist_new">
                                <img v-lazy='"http://imgcache.qq.com/music/photo/album_300/"+(item.data.albumid%100)+"/300_albumpic_"+item.data.albumid+"_0.jpg"'/>
                                <h2 v-html="item.data.songname"></h2>
                                <p v-html="item.data.singer[0].name"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
        <p class="drop-upn" v-show="isShow" v-html="shpwDroptxt"></p>
        <div class="loading-container" v-show="!listData.length">
            <loading></loading>
        </div>
        <div class="drop-upn-loadd" v-show="isUpnLoadd">
            <div class="loading-container">
                <loading></loading>
            </div>
        </div>
        
    </div>
</template>
<style scoped>
    #rankings_box{
        position: fixed;
        top: 1.31rem;
        width: 100%;
    }
     #rankings{
        height: 100%;
        overflow: hidden;
    }
    .list-title{
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 20px;
        color: #ffcd32;
    }
    #rankings ul{
        padding: 0 0.3rem;
    }
    #rankings ul li{
        padding: 0.3rem 0;
        border-bottom: 1px solid #444444;
    }
    #rankings ul li img{
        position: absolute;
        left: 0;
        top: 0;
        width: 2.4rem;
        height: 2.4rem;
    }
    .songlist_new{
        position: relative;
        padding-left: 3rem;
        box-sizing: border-box;
        
    }
    .songlist_new h2{
       font-size: 14px;
       height:1.4rem;
       line-height: 1rem;
       color: #ffffff; 
    }
    .songlist_new p{
       font-size: 14px;
       height:1rem;
       line-height: 1rem;
       color: #ffffff; 
    }
    .loading-container{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
    .drop-upn-loadd{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
    }
    .drop-upn{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1rem;
        line-height:1rem;
        text-align: center;
        font-size:14px;
        color:#ffffff;
    }
</style>
<script>
import Scroll from './RankScroll.vue';
import BScroll from 'better-scroll'
import Loading from './../base/loading'
export default {
    data(){
        return{
            listData:[],
            isShow:false,
            isUpnLoadd:false,
            shpwDroptxt:"释放加载更多"
        }
    },
    components: {
        Scroll,
        Loading
    },
    computed:{
        bottomNum(){
            return this.$store.state.bottom;
        }
    },
    created(){
        this.getSonglist();
    },
    methods:{
        getSonglist(){
           let url="https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2018_33&topid=26&type=top&song_begin=0&song_num=15&g_tk=1567556135&loginUin=845548367&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0";
           this.$http.jsonp(url,{
                //请求参数
                jsonp:'jsonpCallback'
            }).then(function(res){ 
                let songList=JSON.parse(res.bodyText);
                this.listData=songList.songlist;
            },function(){
                //console.log(1)
            });
        },
        showDropDown(blore,data,isShow){
            this.isShow=blore;
            this.isUpnLoadd=isShow;
            if(data==null||data==undefined){

            }else{
                for(let i in data){
                    this.listData.push(data[i]);
                }
                //添加歌曲到歌曲列表
                let songList=[];
                for(let i=0;i<this.listData.length;i++){
                    let objs={
                        songName:this.listData[i].data.songname,
                        singer:this.listData[i].data.singer[0].name,
                        songmid:this.listData[i].data.songmid,
                        albumid:this.listData[i].data.albumid
                    }
                    songList.push(objs);
                }
                this.$store.commit('songList',JSON.stringify(songList));
            }
        },
        playMusic(item){
            this.getvkey(item.data.songmid,item.data.songname,item.data.singer[0].name,item.data.albumid);
        },
        //获取歌曲的vkey参数
        getvkey(songmid,songname,singerName,albumid){
            let url="https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg";
            var postData={
                g_tk:195219765,
                loginUin:2967779251,
                hostUin:0,
                format:"json",
                inCharset:"utf8",
                outCharset:"utf-8",
                notice:0,
                platform:"yqq",
                needNewCode:0,
                cid:205361747,
                uin:2967779251, 
                songmid: songmid,  //歌曲的id
                filename:"C400"+ songmid+".m4a",  
                guid:8129517694
            }
            this.$http.jsonp(url,{
                    params:postData,
                    //请求参数
                    jsonp:'callback'
            }).then(function(res){ 
                let newVkey=JSON.parse(res.bodyText);
                let obj={
                    songName:songname,
                    singer:singerName,
                    songUrl:"//dl.stream.qqmusic.qq.com/"+newVkey.data.items[0].filename+"?vkey="+newVkey.data.items[0].vkey+"&guid=8129517694&uin=2967779251&fromtag=66",
                    songImg:"http://imgcache.qq.com/music/photo/album_300/"+(albumid%100)+"/300_albumpic_"+albumid+"_0.jpg"
                }
                if(this.$store.state.bottom=="0"&&(!this.$store.state.player)){
                    this.$store.commit('changeBottom',"1.6rem");
                    this.$store.commit('changePlayerState',true);
                }
                this.$store.commit('changeSongNew',JSON.stringify(obj));
                //处理歌曲信息
                let songList=[];         
                for(let i=0;i<this.listData.length;i++){
                    let objs={
                        songName:this.listData[i].data.songname,
                        singer:this.listData[i].data.singer[0].name,
                        songmid:this.listData[i].data.songmid,
                        albumid:this.listData[i].data.albumid
                    }
                    songList.push(objs);
                }
                this.$store.commit('songList',JSON.stringify(songList));
            },function(){
                console.log("歌曲信息获取失败!");
            });
        }
    }
}
</script>

