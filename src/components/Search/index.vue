<template>
    <div class="search">
        <div class="search_input">
            <input type="text" placeholder="请输入要搜索的歌曲或者歌手" v-model="searchTxt" @keyup="searchDownUp($event)"/>
            <img src="../../../static/img/search.png"/>
        </div>
        <div class="Hot_search" v-show="showHostSearch">
            <h2>热门搜索</h2>
            <ul class="Hot_search_list">
                <li v-for="(item,index) in HostTxt" :key="index"><a @click="clickHostSearch(item.k)">{{item.k}} </a></li>
            </ul>
        </div>
        <!--搜索列表-->
        <mu-dialog transition="slide-bottom" fullscreen :open.sync="openFullscreen">
            <div>
            <div class="search_list_title">
                <span class="iconfont icon-xiangzuo backBtn" @click="closeFullscreenDialog"></span>
                <strong>{{searchTxt}}</strong>
            </div>
            <div class="search_list">
                <mu-load-more :loading="loading" @load="load" :loading-text="loadingTxt" :loaded-all="isAllLoading">
                    <ul>
                        <li v-for="(item,index) in searchList" :key="index" @click="playMusic(item)">
                            <h4 v-html="item.name" class="songName"></h4>
                            <div class="songSinger">
                                <span v-for="(items,indexs) in item.singer" v-if="indexs!=(item.singer.length)-1" :key="indexs" v-html="items.name+'/'"></span>
                                <span v-for="(items,indexs) in item.singer" v-if="indexs==(item.singer.length)-1" :key="indexs" v-html="items.name"></span>
                                <span class="songAlbum" v-html="'­­­─'+item.album.name"></span>
                            </div>
                        </li>
                    </ul>
                </mu-load-more>
            </div>
            </div>
        </mu-dialog>
    </div>
</template>
<style scoped>
    .search{
        padding: 0 0.3rem;
        box-sizing: border-box;
    }
    .search_input{
        width: 100%;
        position: relative;
        margin: 0.2rem 0;
    }
    .search_input input{
        background: none;
        border: 0;
        width: 100%;
        height: 1rem;
        padding: 0;
        margin: 0;
        /* line-height: 80px; */
        border: 1px solid #FC9D10;
        border-radius: 10px;
        text-indent: 1rem;
        color: #f1f1ff;
        outline: none;
    }
    .search_input img{
        position: absolute;
        left: 0.2rem;
        top: 0.2rem;
        width: 0.7rem;
        height:0.7rem;
    }
    .Hot_search h2{
        color: #f1f1ff;
        font-size: 14px;
        margin: 0.5rem 0;
    }
    .Hot_search_list{
        display: block;
        width: 100%;
    }
    .Hot_search_list li{
        display: inline-block;
        margin-bottom: 0.6rem;
        margin-right: 0.15rem;
    }
    .Hot_search_list li a{
        padding: 0.2rem 0.3rem;
        background: red;
        border-radius: 10px;
        font-size: 14px;
        background: rgba(255,255,255,0.3);
        color: #f1f1ff;
    }
    .search_list_title{
        width: 100%;
        height: 1.2rem;
        background: #FC9D10;
        position: relative;
        z-index: 1;
        text-align: center;
        line-height: 1.2rem;
        font-size: 16px;
        color: #ffffff;
    }
    .backBtn{
        position: absolute;
        left: 0.2rem;
        top: 50%;
        font-size: 18px;
        transform: translateY(-50%);
        color: #ffffff;
    }
    .search_list{
        position: fixed;
        left: 0;
        top: 1.2rem;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        padding-bottom: 1.2rem;
        box-sizing: border-box;
    }
    .search_list ul{
        width: 100%;
    }
    .search_list ul li{
        border-bottom: 1px solid #eeeeee;
        padding: 0.3rem 0;
        text-indent: 0.3rem;
    }
    .search_list ul li .songName{
        font-size: 17px;
        padding-bottom: 0.2rem;
    }
    .songSinger{
        font-size: 12px;
        color: #999999;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .songAlbum{
        color: #666666;
    }
</style>
<script>
import BScroll from 'better-scroll';
import Loading from './../base/loading'
export default {
    data(){
        return{
            searchTxt:"",
            HostTxt:[],
            searchList:[],
            showHostSearch:true,
            isShowList:false,
            isLoadd:false,
            openFullscreen:false,
            total:0,
            loading: false,
            num:1,
            loadingTxt:"正在加载...",
            isAllLoading:false
        }
    },
    created(){
        this.getSearch();
    },
    components:{
        Loading
    },
    computed:{
        bottom(){
            return this.$store.state.bottom;
        }
    },
    mounted(){
        setTimeout(() => {
            this._initScroll();
        }, 20);

        this.$nextTick(()=>{
            
        });
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
                this.scrollY = pos.y;
            })
        },
        //热门搜索
        getSearch(){
            let url="https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&uin=0&needNewCode=1&platform=h5";
            this.$http.jsonp(url,{
                    //请求参数
                    jsonp:'jsonpCallback'
            }).then(function(res){ 
                let search=JSON.parse(res.bodyText);
                for(let i in search.data.hotkey){
                    if(i<10){
                        this.HostTxt.push(search.data.hotkey[i]);
                    }
                }
            },function(){
                //console.log(1)
            });
        },
        //搜索接口
        getHostSearch(word){
            this.isLoadd=true;
            if(this.showHostSearch){
                this.showHostSearch=!(this.showHostSearch);
            }
            let url="https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.center&searchid=51092793577276447&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=20&w="+word+"&g_tk=1567556135&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0";
            this.$http.jsonp(url,{
                    //请求参数
                    jsonp:'jsonpCallback'
            }).then(function(res){
                let search=JSON.parse(res.bodyText);
                this.searchList=search.data.song.list;
                this.total=(search.data.song.totalnum%20);
                this.openFullscreen=true;
            },function(){
                console.log("搜索失败!")
            });
        },
        //分页上拉加载
        PullUpLoadd(word){
            ++(this.num);
            if(this.num>this.total){
                this.isAllLoading=true
            }else{
                let url="https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.center&searchid=51092793577276447&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p="+this.num+"&n=20&w="+word+"&g_tk=1567556135&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0";
                this.$http.jsonp(url,{
                        //请求参数
                        jsonp:'jsonpCallback'
                }).then(function(res){
                    let search=JSON.parse(res.bodyText);
                    let searchList=search.data.song.list;
                    for(let a=0;a<searchList.length;a++){
                        this.searchList.push(searchList[a]);
                    }
                    this.loading = false;
                },function(){
                    console.log("分页加载错误")
                });
            }
        },
        searchDownUp(ev){
            if(ev.keyCode==13){
                this.getHostSearch(this.searchTxt);
            //    this.$router.push({name:'SearchList',params:{name:this.searchTxt}});
            }
            if(this.searchTxt.length==0){
                this.isShowList=false;
                this.showHostSearch=true;
            }
        },
        clickHostSearch(name){
            this.searchTxt=name;
            this.getHostSearch(name);
        },
        closeFullscreenDialog(){
            this.openFullscreen=false;
            this.isAllLoading=false;
        },
        load(){
            this.loading = true;
            this.PullUpLoadd(this.searchTxt);
        },
        playMusic(item){
            this.getvkey(item.mid,item.title,item.singer[0].name,item.album.id);
            this.openFullscreen=false;
            this.isAllLoading=false;
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
                for(let i=0;i<this.searchList.length;i++){
                    let objs={
                        songName:this.searchList[i].title,
                        singer:this.searchList[i].singer[0].name,
                        songmid:this.searchList[i].mid,
                        albumid:this.searchList[i].album.id
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
