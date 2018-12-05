<template>
    <div id="player" v-if="showPlayer">
        <audio :src="MusicObj.songUrl" autoplay ref="player"></audio>
        <!--全屏播放-->
        <transition-group enter-active-class="bounceIn" leave-active-class="zoomOut">
            <div class="FullPlayer_box animated" v-show="isShowFullPlayer" :key="1">
                <img src="../../../static/img/down.png" class="updown" @click="FullPlayer_updown"/>
                <div class="FullPlayer" :style="{background:'url('+MusicObj.songImg+') center'}">
                    <div class="bg-cover"></div>
                </div>
                <!--标题-->
                <div class="FullPlayer_title">
                    <div class="music-info">
                        <div class="song" id="songName" v-html="MusicObj.songName"></div>
                        <div class="artist" id="artist" v-html="MusicObj.singer"></div>
                    </div>
                </div>
                <!--中间主体-->
                <div class="play-board">
                    <img id="needle" class="play-needle" :class="{resumeNeedle:isPlay,pauseNeedle:isPlaue}" src="./../../../static/img/play_needle.png"/>
                    <div class="disk-bg"></div>
                    <div class="disk-cover disk-cover-animation" :class="{diskPaly:isPlay,diskPaused:isPlaue}" >
                        <img class="album" :src="MusicObj.songImg"/>
                        <img class="disk-border" src="./../../../static/img/play_disc.png"/>
                    </div>
                    <div class="footer">
                        <div class="process" id="process">
                            <span id="currentTime" v-html="cTime"></span>
                            <div class="process-bar" ref="musicBar">
                                <mu-slider class="demo-slider" color="secondary" :disabled="isSlider" v-model="sliderVal" :display-value="false" :step="1" @touchstart.native="touchendStart"  @touchend.native="touchendEnd"></mu-slider>
                            </div>
                            <span id="totalTime" v-html="dTime"></span>
                        </div>
                        <div class="control">
                            <div>
                                <img src="./../../../static/img/download.png" class="sumall" @click="download"/>
                            </div>
                            <div>
                                <img src="./../../../static/img/play_btn_prev.png" @click="upperListSong" class="caozuo"/>
                            </div>
                            <div>
                                <img :src="playImg" class="palyCaozuo" @click="play"/>
                            </div>
                            <div>
                                <img src="./../../../static/img/play_btn_next.png" @click="nextSong" class="caozuo"/>
                            </div>
                            <div>
                                <img src="./../../../static/img/play_icn_src.png" class="sumall" @click="showSongList"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </transition-group>
        <!--底部歌曲弹出列表-->
        <transition-group enter-active-class="bounceInUp" leave-active-class="fadeOutDown">
            <div class="sheetBox" v-show="showSheet" :key="0" @click="hideSheet">
                <div class="sheetList" ref="wrapper">
                    <ul>
                        <li :class="{activity:isactivityindex==index}" v-for="(item,index) in songList" :key="index" @click="playListSong(item,index)">
                            <strong class="iconfont icon-laba" v-if="isactivityindex==index"></strong>
                            <strong>{{item.songName}}</strong>
                            <span>-</span>
                            <span>{{item.singer}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </transition-group>
        <!--底部播放器-->
        <div class="bottom_musicBox" v-show="isShowbottomPlayer">
            <img :src="MusicObj.songImg" class="bottom_pic" @click="BottomPlay"/>
            <div class="bottom_musicNew" @click="BottomPlay">
                <h2 v-html="MusicObj.songName"></h2>
                <p v-html="MusicObj.singer"></p>
            </div>
            <div class="play_state">
                <img :src="playImg" @click="play"/>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .sheetBox{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1001;
        background: rgba(0,0,0,0.5);
    }
    .sheetList{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 8rem;
        background: #ffffff;
        overflow: hidden;
    }
    .sheetList ul{
        width: 100%;
    }
    .sheetList ul li{
        width: 100%;
        height: 1.2rem;
        line-height:  1.2rem;
        font-size: 16px;
        padding: 0 0.2rem;
        box-sizing: border-box;
        color: #333333;
        border-bottom: 1px solid #eeeeee;
    }
    .sheetList ul li span{
        color: #666666;
        font-size: 14px;
    }
    .sheetList ul li.activity span{
        color: #ff0000;
    }
    .sheetList ul li.activity strong{
        color: #ff0000;
    }
    @keyframes rotate-disk{
        100%{
            -webkit-transform: rotateZ(360deg);
        }
    }
    
    @-webkit-keyframes rotate-disk{
        100%{
            -webkit-transform: rotateZ(360deg);
        }
    }
    
    @keyframes rotate-needle-pause {  
        100% {  
            transform: rotateZ(-20deg);  
        }  
    }  
    
    @keyframes rotate-needle-resume {  
        0% {  
            transform: rotateZ(-20deg);  
        }  
        100% {  
            transform: rotateZ(3deg);  
        }  
    }
    .FullPlayer_box{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
    }
    .FullPlayer_box .updown{
        position: absolute;
        left: 0.2rem;
        top: 0.3rem;
        width: 1rem;
        height: 1rem;
        z-index:1000;
    }
    .FullPlayer{ 
        background: #a0a0a0 center;
        position: absolute;  
        top: 0px;  
        left: 0px;  
        height: 110%;  
        width: 110%;  
        margin: -5%;  
        background-size: cover;   
        -webkit-filter: blur(15px) brightness(0.6);  
        -moz-filter: blur(15px) brightness(0.6);  
        filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false); /* IE6~IE9 */  
        z-index: -1;  
    }
    .bg-cover{
        background: rgba(0, 0, 0, 0.7);
        height: 100%;
        width: 100%;
    }
    .FullPlayer_title{
        color: #fff;
        position: absolute;
        top: 0px;
        left: 0px;
        height: 9%;
        width: 100%;
        z-index: 11;
        background-color: rgba(253, 253, 253, 0.05);
    }
    .music-info{
        width: 100%;
        overflow: hidden;
    }
    .music-info .song, .artist {
        text-align: center;
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 16px;
        font-weight: lighter;
        margin-top: 0.15rem;
        font-weight: bold;
    }
    .music-info .artist {
        font-size: 14px;
        color: #C8C0CC;
        margin-top: 0.03rem;
    }
    .play-board{
        position: absolute;
        overflow: hidden;
        top: 10%;
        width: 100%;
        height: 91%;
        color: #ffffff;
    }
    .play-needle {
        position: absolute;
        top: -0.6rem;
        left: 50%;
        z-index: 10;
        width: 2.8rem;
        margin-left: -0.3rem;
        transform-origin: 0.7rem 0.7rem;
        transition: transform 0.4s;
        -webkit-transform-origin: 0.7rem 0.7rem;
        -webkit-transition: -webkit-transform 0.4s;
    }
    .disk-bg{
        width: 7rem;
        height: 7rem;
        position: absolute;
        left: 50%;
        top: 2.1rem;
        transform: translateX(-50%);
        background-color: rgba(251, 251, 251, 0.2);
        border-radius: 50%;
    }
    .disk-cover {
        width: 7rem;
        height: 7rem;
        position: absolute;
        left: 50%;
        top: 2.101rem;
        margin-left: -3.5rem;
    }

    .disk-cover-animation {
        animation: rotate-disk 20s infinite normal linear;
        animation-play-state: paused;
        -webkit-animation: rotate-disk 20s infinite normal linear;
        -webkit-animation-play-state: paused;
    }
    .disk-cover img {
        display: block;
        width: 100%;
    }

    .disk-cover .album {
        width: 68%;
        margin: 16%;
    }
    .disk-cover .disk-border {
        position: absolute;
        top: 0px;
    }
    /***进度条**/
    .footer{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding-bottom: 0.6rem;
    }
    .process {
        padding: 0 1.6rem;
        box-sizing: border-box;
        width: 100%;
        height: 1rem;
        font-size: 12px;
        font-family: Arial, Helvetica, sans-serif;
    }
    .process #currentTime {
        position: absolute;
        left: 0.3rem;
        top: 0.05rem;
        font-size: 13px;
    }
    .process #totalTime {
        position: absolute;
        right: 0.3rem;
        top: 0.05rem;
        font-size: 13px;
    }
    .process .process-bar {
        width: 100%;
        position: relative;
    }
    .process-bar .cur {
        background-color: #FB0D0D;
        height: 6px;
        position: absolute;
        top: 0;
        left: 0;
    }
    #processBtn{
        cursor: pointer;
        background-size: cover;
        position: absolute;
        top: -12px;
        width: 26px;
        height: 26px;
        background: #ffffff;
        border-radius: 50%;
        text-align: left;
        line-height: 27px;
        overflow: hidden;
    }
    #processBtn .diandian{
        display: block;
        color: #FB0D0D;
        font-size:30px;
        margin-left: -2px;
        
    }

    /***底部按钮**/
    .control{
        display: flex;
        /* position: absolute;
        left: 0;
        bottom: 0.6rem; */
        width: 100%;
    }
    .control div{
        flex: 1;
    }
    .control div img{
        display: block;
        width: 60%;
        /* height: 100%; */
        margin: 0 auto;
        
    }
    .control div img.caozuo{
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
    .control div img.palyCaozuo{
        width: 80%;
    }
    .control div img.sumall{
        width: 40%;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
    .diskPaused {
        animation: rotate-disk 20s infinite normal linear;
        animation-play-state: paused;
        -webkit-animation: rotate-disk 20s infinite normal linear;
        -webkit-animation-play-state: paused;
    }
    .diskPaly{
        animation: rotate-disk 20s infinite normal linear;
        animation-play-state: running;
        -webkit-animation: rotate-disk 20s infinite normal linear;
        -webkit-animation-play-state: running;
    }

    .pauseNeedle {  
        animation: rotate-needle-pause 0.5s 1 normal linear;  
        animation-fill-mode: forwards;  
    }  
    
    .resumeNeedle {  
        animation: rotate-needle-resume 0.5s 1 normal linear;  
        animation-fill-mode: forwards;  
    }  
    /***底部播放器**/
    .bottom_musicBox{
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 180;
        width: 100%;
        height: 1.7rem;
        border: 1px solid #eeeeee;
        padding: 0.2rem 0;
        box-sizing: border-box;
        background: #dddddd;
    }
    .bottom_musicNew{
        width: 100%;
        height: 100%;
        padding-left: 1.8rem;
        padding-right: 1.5rem;
        box-sizing: border-box;
    }
    .bottom_pic{
        position: absolute;
        left: 0.2rem;
        top: 50%;
        z-index: 1;
        width: 1.5rem;
        height: 1.3rem;
        transform: translateY(-50%);
    }
    .bottom_musicNew h2{
        font-size: 16px;
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .bottom_musicNew p{
        font-size: 14px;
        height: 0.4rem;
        line-height: 0.4rem;
        width: 100%;
        color: #666666;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .play_state{
        position: absolute;
        right: 0.2rem;
        top: 50%;
        transform: translateY(-50%);
        width: 1rem;
        height: 1rem;
    }
    .play_state img{
        display: block;
        width: 100%;
        height: 100%;
    }
</style>
<script>
import {mapGetters} from 'vuex'
import BScroll from 'better-scroll'
export default {
    data(){
        return{
            isactivityindex:0,
            showSheet:false,
            showPlayer:false,
            isShowFullPlayer:false,
            isShowbottomPlayer:true,
            MusicObj:"",
            cTime:"00:00",
            dTime:"00:00",
            LastTime:0,
            isPlay:true,
            isPlaue:false,
            speedWidth:"0",
            isMove:true,
            playImg:"./../../../static/img/play_pause.png",
            initBScroll:true,
            songList:"",
            sliderVal:0,
            isState:true,
            isSlider:true
        }
    },
    computed:{
        ...mapGetters([
            'getSongNew',
            'getPlayState',
            'getsongList'
        ])
    },
    watch:{
        getSongNew(newData){
            let songNew=JSON.parse(newData);
            this.MusicObj=songNew;
            if(this.isState){
                setTimeout(()=>{
                    this.addEventListeners();
                },20);
                this.isState=false;
            }
        },
        getPlayState(newData){
            this.showPlayer=newData;
        },
        getsongList(newData){
            let songList=JSON.parse(newData);
            this.songList=songList;
        }
    },
    methods:{
        touchendStart(){
            this.isMove=false;
        },
        touchendEnd(){
            let vaule=(this.LastTime/100)*(this.sliderVal);
            let audios=this.$refs.player;
            audios.currentTime=vaule;
            this.isMove=true;
        },
        //下载歌曲
        download(){
            let songUrl=this.MusicObj.songUrl;
            window.open(songUrl);
        },
        //开启歌曲监听事件
        addEventListeners(){
            const self = this;
            //监听音频加载发生错误时触发
            self.$refs.player.addEventListener('error', self._error);
            //监听当前的播放位置发送改变
            self.$refs.player.addEventListener('timeupdate', self._currentTime);
            //监听开始播放时触发
            self.$refs.player.addEventListener('canplay', self._durationTime);
            //播放结束时触发
            self.$refs.player.addEventListener('ended', self._endedPlay);
            //当前播放时触发
            self.$refs.player.addEventListener('play', self._Play);
            //当前暂停时触发
            self.$refs.player.addEventListener('pause', self._pause);
        },
        _error(){
            console.log("歌曲播放失败");
            this.isSlider=true;
            this.isPlay=false;
            this.isPlaue=true;
            this.playImg="./../../../static/img/play_play.png";
            this.nextSong();
        },
        //当前播放
        _Play(){
            this.isPlay=true;
            this.isPlaue=false;
            this.playImg="./../../../static/img/play_pause.png";  
        },
        //当前暂停
        _pause(){
            this.isPlay=false;
            this.isPlaue=true;
            this.playImg="./../../../static/img/play_play.png";
        },
        //移除监听事件
        removeEventListeners(){
            const self = this;
            self.$refs.player.removeEventListener('timeupdate', self._currentTime)
            self.$refs.player.removeEventListener('canplay', self._durationTime)
        },
        //当前播放歌曲的时间
        _currentTime(){
            this.isSlider=false;
            const self = this;
            var s=parseInt(self.$refs.player.currentTime);
            // console.log(s);
            var time="";
            if(s >0){
                var min = Math.floor(s/60) % 60;
                var sec = s % 60;
                if(min < 10){
                    time += "0";
                }
                time += min + ":";
                if(sec < 10){
                time += "0";
                }
                time += sec;
                self.cTime =time;
            }else{
                self.cTime="00:00"
            }
            if(this.isMove){
                this.sliderVal=(((1/this.LastTime)*s)*100);
            }

        },
        //歌曲的总时间
        _durationTime(){
            const self = this;
            var time="";
            var s=parseInt(self.$refs.player.duration);
            this.LastTime=s;
            if(s >0){
                var min = Math.floor(s/60) % 60;
                var sec = s % 60;
                if(min < 10){
                    time += "0";
                }
                time += min + ":";
                if(sec < 10){
                time += "0";
                }
                time += sec;
                self.dTime =time;
            }else{
                self.dTime="00:00"
            } 
        },
        //歌曲播放完毕事件
        _endedPlay(){
            let songListIndex=this.songList.length-1;
            if(songListIndex==this.isactivityindex){
                this.isactivityindex=0;
                // this.MusicObj=this.songList[0];
                this.getvkey(this.songList[0].songmid,this.songList[0].songName,this.songList[0].singer,this.songList[0].albumid);
            }else{
                this.isactivityindex=(this.isactivityindex)+1;
                // this.MusicObj=this.songList[this.isactivityindex];
                this.getvkey(this.songList[this.isactivityindex].songmid,this.songList[this.isactivityindex].songName,this.songList[this.isactivityindex].singer,this.songList[this.isactivityindex].albumid);
            }
        },
        //播放/暂停事件
        play(){
            let audios=this.$refs.player;
            if(audios.paused){
                this.$refs.player.play();
            }else{
                this.$refs.player.pause();
            }
        },
        //底部播放器点击全屏播放器
        BottomPlay(){
            this.isShowbottomPlayer=false;
            this.isShowFullPlayer=true;
        },
        //关闭全屏播放器
        FullPlayer_updown(){
            this.isShowFullPlayer=false;
            this.isShowbottomPlayer=true;
        },
        //显示播放列表
        showSongList(){
            //选中当前播放的歌曲    
            for(let j=0;j<this.songList.length;j++){
                if(this.songList[j].songName==this.MusicObj.songName&&this.songList[j].singer==this.MusicObj.singer){
                    this.isactivityindex=j;
                    break;
                }
            }
            this.showSheet=true;
            //初始化BScroll
            if(this.initBScroll){
                setTimeout(()=>{
                    this.scroll=new BScroll(this.$refs.wrapper,{
                        probeType:1,
                        click:true
                    });
                    this.initBScroll=false;
                    // this.scroll.on('scroll', (pos) => {
                    //     console.log(pos);
                    // })
                    this.scroll.scrollTo(0,(-1)*(43*this.isactivityindex),300);
                },200);
            }else{
                setTimeout(()=>{
                    this.scroll.refresh();
                    this.scroll.scrollTo(0,(-1)*(43*this.isactivityindex),300);
                },200);
            }
        },
        //隐藏播放列表
        hideSheet(e){
            e.preventDefault();
            if(e.target.className=="sheetBox"){
                this.showSheet=false;
            }
        },
        //点击播放列表的歌曲
        playListSong(item,index){
            this.isactivityindex=index;
            this.getvkey(item.songmid,item.songName,item.singer,item.albumid);
        },
        //下一曲
        nextSong(){
            let songListIndex=this.songList.length-1;
            if(songListIndex==this.isactivityindex){
                this.isactivityindex=0;
                this.getvkey(this.songList[0].songmid,this.songList[0].songName,this.songList[0].singer,this.songList[0].albumid);
            }else{
                this.isactivityindex=(this.isactivityindex)+1;
                this.getvkey(this.songList[this.isactivityindex].songmid,this.songList[this.isactivityindex].songName,this.songList[this.isactivityindex].singer,this.songList[this.isactivityindex].albumid);
            }
        },
        //上一曲
        upperListSong(){
            if(this.isactivityindex==0){
                this.isactivityindex=this.songList.length-1;
                this.getvkey(this.songList[this.songList.length-1].songmid,this.songList[this.songList.length-1].songName,this.songList[this.songList.length-1].singer,this.songList[this.songList.length-1].albumid);
                // this.MusicObj=this.songList[this.songList.length-1];
            }else{
                this.isactivityindex=(this.isactivityindex)-1;
                this.getvkey(this.songList[this.isactivityindex].songmid,this.songList[this.isactivityindex].songName,this.songList[this.isactivityindex].singer,this.songList[this.isactivityindex].albumid);
                // this.MusicObj=this.songList[this.isactivityindex];
            }
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
                this.MusicObj=obj;
            },function(){
                console.log("歌曲信息获取失败!");
            });
        }
    }
}
</script>


