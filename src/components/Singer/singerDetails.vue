<template>
    <div id="singerDetails" :style="{bottom:bottom}">
        <div class="singDae"  ref="wrapper">
            <div class="singerSongr_content">
                <div class="singer_img" :style="{background: 'url(https://y.gtimg.cn/music/photo_new/T001R300x300M000'+singer_img+'.jpg?max_age=2592000) no-repeat',}"></div>
                <ul>
                    <li v-for="(item,index) in singerSongList" :key="index" @click="playMusic(item)">
                        <a v-html="item.musicData.songname"></a>
                        <p v-html="item.musicData.albumname"></p>
                    </li>
                </ul>
            </div>
            <div class="singerLoadd" v-show="isShowLoaddr">
                <div class="singerLoadd_box">
                    <loadd></loadd>
                </div>
            </div>
        </div>
        <div class="header_title" :style="{background: 'rgba(255, 255, 255,'+opcity+')'}">
            <img src="../../../static/img/back.png" @click="goback"/>
            <h2 v-html="singerName" :style="{color:scroll_txt}"></h2>
        </div>
    </div>
</template>
<style scoped>
    #singerDetails{
        position: fixed;
        top: 0;
        width: 100%;
        background: #ffffff;
    }
    .singDae{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background:rgba(0,0,0,0.8);
    }
    .singerLoadd{
        position: fixed;
        left: 0;
        top: 0;
        background: rgba(0,0,0,0.8);
        width: 100%;
        height: 100%;
    }
    .singerLoadd_box{
        position: absolute;
        left: 0;
        top: 45%;
        width: 100%;
    }
    .singer_img{
        width: 100%;
        height: 6rem;
        position: relative;
        overflow: hidden;
        background-size:cover!important;
    }
    .header_title{
        position: fixed;
        left: 0;
        top: 0;
        height: 1.3rem;
        width: 100%;
    }
    .header_title img{
        position: absolute;
        left: 0.2rem;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        z-index: 1;
    }
    .header_title h2{
        position: absolute;
        left: 0;
        top: 0;
        height: 1.3rem;
        line-height: 1.4rem;
        width: 100%;
        text-align: center;
        font-size: 16px;
    }
    .singerSongr_content ul{
        padding: 0.2rem 0 0;
    }
    .singerSongr_content ul li{
        padding-bottom: 0.3rem;
    }
    .singerSongr_content ul li a{
        display: block;
        padding: 0 0.5rem;
        width: 100%;
        height: 0.8rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        box-sizing: border-box;
        line-height: 0.8rem;
        color: #f1f1f1;
        font-size: 16px;
    }
    .singerSongr_content ul li p{
        padding: 0 0.5rem;
        box-sizing: border-box;
        line-height: 0.7rem;
        color: rgba(255,255,255,0.3);
    }
</style>
<script>
import loadd from '../base/loading';
import BScroll from 'better-scroll';
export default {
    data(){
        return{
            singer_img:"",
            singerName:"",
            isShowLoaddr:true,
            opcity:0,
            scroll_txt:"#ffffff",
            singerSongList:[]
        }
    },
    computed:{
        bottom(){
            // this.$store.state
            return this.$store.state.bottom;
        }
    },
    created(){
        this.getSongList(this.$route.params.id);
    },
    mounted(){
        this.$nextTick(()=>{
            this._initScroll();
        });
    },
    components:{
        loadd
    },
    methods:{
        _initScroll(){
            if(!this.$refs.wrapper){
                return;
            }
            this.scroll=new BScroll(this.$refs.wrapper,{
                probeType:3,
                click:true
            });
             // 监听Y轴偏移的值
            this.scroll.on('scroll', (pos) => {
                if(pos.y>-200){
                    this.opcity=0.005*((pos.y)*(-1));
                    if(pos.y>-100){
                        this.scroll_txt="#ffffff";
                    }else{
                        this.scroll_txt="#666666";
                    }
                }else{
                    this.opcity=1;
                    this.scroll_txt="#666666";
                }
            })
        },
        getSongList(id){
            let url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
            let params={
                hostUin: 0,
                needNewCode: 0,
                platform: 'yqq',
                order: 'listen',
                begin: 0,
                num: 50,
                songstatus: 1,
                singermid: id
            }
            this.$http.jsonp(url,{
                //请求参数
                params:params,
                jsonp:'jsonpCallback'
            }).then((res)=>{ 
                let singerList=JSON.parse(res.bodyText).data;
                this.singer_img=singerList.singer_mid;
                this.singerName=singerList.singer_name;
                this.singerSongList=singerList.list;
                this.isShowLoaddr=false;
            },function(){
            });
        },
        goback(){
            this.$router.back(-1);
        },
        playMusic(item){
            this.getvkey(item.musicData.songmid,item.musicData.songname,item.musicData.singer[0].name,item.musicData.albumid);
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
                for(let i=0;i<this.singerSongList.length;i++){
                    let objs={
                        songName:this.singerSongList[i].musicData.songname,
                        singer:this.singerSongList[i].musicData.singer[0].name,
                        songmid:this.singerSongList[i].musicData.songmid,
                        albumid:this.singerSongList[i].musicData.albumid
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


