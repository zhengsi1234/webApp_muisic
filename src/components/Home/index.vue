<template>
    <div class="home_box" :style="{bottom:bottom}">
        <scroll :data="listData" id="home">
            <div class="home_content">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="(item,index) in bannerList" :key="index">
                        <a :href="item.linkUrl" target="_blank">
                            <img :src="item.picUrl"/>
                        </a>
                    </swiper-slide>
                    <div class="swiper-pagination"  slot="pagination"></div>
                </swiper>
                <!---->
                <div class="songlist">
                    <h1 class="list-title">新歌推荐</h1>
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
                <div class="loading-container" v-show="!listData.length">
                    <loading></loading>
                </div>
            </div>
        </scroll>
    </div>
</template>
<style scoped>
    .home_box{
        position: fixed;
        top: 1.35rem;
        width: 100%;
        z-index: 1;
    }
    #home{
        height: 100%;
        overflow: hidden;
    }
    .swiper-container{
        min-height: 3rem;
    }
    .swiper-container{
       min-height: 3rem;
    }
    .swiper-container .swiper-slide a{
        display: block;
        width: 100%;
    }
    .swiper-container .swiper-slide img{
        display: block;
        width: 100%;
    }
    .list-title{
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-size: 15px;
        color: #ffcd32;
    }
    #home ul{
        padding: 0 0.3rem;
    }
    #home ul li{
        padding: 10px 0;
        border-bottom: 1px solid #555555;
    }
    #home ul li:first-child{
        padding-top: 0;
    }
    #home ul li img{
        position: absolute;
        left: 0;
        top: 0;
        width: 2.5rem;
        height: 2.5rem;
    }
    .songlist_new{
        position: relative;
        padding-left: 2.7rem;
        box-sizing: border-box;
        
    }
    .songlist_new h2{
       font-size: 15px;
       height:1.5rem;
       color: #ffffff; 
    }
    .songlist_new p{
       font-size: 14px;
       height:1rem;
       color: #dddddd; 
    }
    .loading-container{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
        
</style>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Scroll from './../base/scroll.vue';
import Loading from './../base/loading'
export default {
    data(){
        return{
            swiperOption: {
                // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
                notNextTick: true,
                // swiper configs 所有的配置同swiper官方api配置
                // autoplay:3000,
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,//如果设置为true，当切换到最后一个slide时停止自动切换。（loop模式下无效）。
                    disableOnInteraction: false,//如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay。操作包括触碰，拖动，点击pagination等。
                },
                effect:"coverflow",//slide的切换效果，默认为"slide"（位移切换），可设置为'slide'（普通切换、默认）,"fade"（淡入）"cube"（方块）"coverflow"（3d流）"flip"（3d翻转）。
                grabCursor : true,//设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状。（根据浏览器形状有所不同）
                // autoHeight: true,
                // paginationType:"bullets",
                pagination: {
                    el: '.swiper-pagination',
                }
            },
            bannerList:"",
            listData:[]
        }
    },
    components: {
        swiper,
        swiperSlide,
        Scroll,
        Loading
    },
    computed:{
        bottom(){
            return this.$store.state.bottom;
        }
    },
    created(){
        this.getBanner();
        this.getSonglist();
    },
    methods:{
        getBanner(){
            this.$http.jsonp("https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",{
                //请求参数
                params: {
                    g_tk: 1928093487,
                    inCharset: "utf-8",
                    outCharset: "utf-8",
                    notice: 0,
                    format: "jsonp",
                    platform: "h5",
                    uin: 0,
                    needNewCode: 1
                },
                jsonp:'jsonpCallback'
            }).then(function(res){
                let bannerData=JSON.parse(res.bodyText);
                this.bannerList=bannerData.data.slider;
            },function(){
                //console.log(1)
            });
        },
        getSonglist(){
            let url="https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923"
            // let url="https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?picmid=1&rnd=0.7856482015246229&g_tk=1567556135&loginUin=845548367&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&categoryId=10000000&sortId=2&sin=0&ein=29";
            this.$http.jsonp(url,{
                // params:{
                //     g_tk: 102900707,
                //     loginUin: 845548367,
                //     hostUin: 0,
                //     format: "jsonp",
                //     inCharset: "utf8",
                //     outCharset: "utf-8",
                //     notice: 0,
                //     platform: "yqq",
                //     needNewCode: 0,
                //     data: {"albumlib":{"method":"get_album_by_tags","param":{"area":1,"company":-1,"genre":-1,"type":-1,"year":-1,"sort":2,"get_tags":1,"sin":0,"num":20,"click_albumid":0},"module":"music.web_album_library"}}
                // },
                //请求参数
                jsonp:'jsonpCallback'
            }).then(function(res){ 
                let songList=JSON.parse(res.bodyText);
                // console.log(res);
                this.listData=songList.songlist;
            },function(){
                //console.log(1)
            });
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
                 // //处理歌曲信息
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

