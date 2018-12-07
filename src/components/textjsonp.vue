<template>
    <div>
        <div style="color:#ffffff">测试</div>
        <transition name="annimates" @enter="enter" @after-enter="afterEnter"  @leave="leave" @after-leave="afterLeave">
            <div class="showCont" v-show="showCont">
                <div class="showCont_box" ref="middleL">
                    <h2>我是标题</h2>
                    <div class="singerImg" ref="cdWrapper">
                        <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000001mTkmb4GJlh4.jpg?max_age=2592000"/>
                    </div>
                </div>
            </div>
        </transition>
        <div style="text-align: center">
            <button style="margin-top:1rem;padding:0.5rem" @click="clickBox">点击</button>
        </div>
    </div>
</template>
<style scoped>
    .showCont{
        /* position: fixed;
        left: 0;
        top: 0; */
        width: 100%;
    }
    .showCont_box{
        width: 100%;
        background: forestgreen;
    }
    .showCont_box h2{
        text-align: center;
        height: 1.5rem;
        line-height: 1.7rem;
        font-size: 16px;
    }
    .singerImg{
        width: 100%;
        padding: 0 1rem;
        box-sizing: border-box;
    }
    .singerImg img{
        display: block;
        width: 100%;
        border-radius: 50%;
        
    }
</style>

<script>
import axios from 'axios'
import animations from 'create-keyframe-animation'
axios.defaults.withCredentials = true
export default {
    data(){
        return{
            showCont:false
        }
    },
    created(){
        this.getJsonp();
    },
    methods:{
        clickBox(){
            this.showCont=!this.showCont;
        },
        enter(el, done){
            const {x, y, scale} = this._getPosAndScale();
            let animation = {
                0: {
                    transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
                },
                60: {
                    transform: `translate3d(0,0,0) scale(1.1)`
                },
                100: {
                    transform: `translate3d(0,0,0) scale(1)`
                }
            }
            animations.registerAnimation({
                name: 'move',
                animation,
                presets: {
                    duration: 400,
                    easing: 'linear'
                }
            })

            animations.runAnimation(this.$refs.cdWrapper, 'move', done)
        },
        afterEnter(){
            animations.unregisterAnimation('move')
            this.$refs.cdWrapper.style.animation = ''
        },
        leave(el, done){
            this.$refs.cdWrapper.style.transition = 'all 0.4s'
            const {x, y, scale} = this._getPosAndScale()
            this.$refs.cdWrapper.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`
            this.$refs.cdWrapper.addEventListener('transitionend', done)
        },
        afterLeave(){
            this.$refs.cdWrapper.style.transition = ''
            this.$refs.cdWrapper.style.transform= ''
        },
        _getPosAndScale() {
            const targetWidth = 40
            const paddingLeft = 40
            const paddingBottom = 30
            const paddingTop = 80
            const width = window.innerWidth * 0.8
            const scale = targetWidth / width
            const x = -(window.innerWidth / 2 - paddingLeft)
            const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
            return {
                x,
                y,
                scale
            }
        },
        getJsonp(){

            // let url="https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg";
            // let postData ={
            //     type: 1,
            //     json: 1,
            //     utf8: 1,
            //     onlysong: 0,
            //     nosign:1,
            //     g_tk:"1453933548",
            //     disstid: "1453933548",
            //     format: 'json',
            //     needNewCode: 0,
            //     platform:"yqq",
            //     inCharset:"utf8",
            //     outCharset:"utf8",
            //     notice:0,
            //     hostUin:0
            // }
            // this.$http.jsonp(url,{
            //         params:postData,
            //         //请求参数
            //         jsonp:'jsonpCallback'
            // }).then(function(res){ 
            //     // let search=JSON.parse(res.bodyText);
            //     console.log(res);
            // },function(){
            //     //console.log(1)
            // });


            // let url='/api/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
            // const data ={
            //     platform: 'yqq',
            //     hostUin: 0,
            //     sin: 0,
            //     ein: 29,
            //     sortId: 5,
            //     needNewCode: 0,
            //     categoryId: 10000000,
            //     rnd: Math.random(),
            //     format: 'json'
            // }
            // axios.get(url,{
            //     params:data
            // }).then((res)=>{
            //     console.log(res);
            // });


            // let url='/api/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
            // let data ={
            //     type: 1,
            //     json: 1,
            //     utf8: 1,
            //     onlysong: 0,
            //     nosign:1,
            //     g_tk:"1453933548",
            //     disstid: "3717256718",
            //     format: 'json',
            //     needNewCode: 0,
            //     platform:"yqq",
            //     inCharset:"utf8",
            //     outCharset:"utf8",
            //     notice:0,
            //     hostUin:0
            // }
            // axios.get(url,{
            //     params:data
            // }).then((res)=>{
            //     console.log(res);
            // });

        }
    }
}
</script>
