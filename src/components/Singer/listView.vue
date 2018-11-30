<template>
    <div id="singer" :style="{bottom:bottom}">
        <div class="singer_list" ref="wrapper">
            <div class="singer_content">
                <ul>
                    <li v-for="(item,index) in singerList" :key="index" ref="listGroup">
                        <h2 class="singer_index" v-html="item.title"></h2>
                        <ul class="singList">
                            <li v-for="(items,indexs) in item.item" :key="indexs">
                                <!-- <router-link :to="{name:'singerDetails',params:{id:items.id}}"> -->
                                <router-link :to="'/singer/singerDetails/'+items.id">
                                    <img v-lazy="items.avatar"/>
                                    <p class="singer_name" v-html="items.name"></p>
                                </router-link>
                            </li>  
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="list-shortcut">
                <ul>
                    <li v-for="(item,index) in shortcutList" class="item" :data-index="index" :key="item.id" @touchstart="onShortcutStart" @touchmove.stop.prevent="onShortcutMove">
                        {{ item }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="loading_singer" v-show="isShowLoad">
            <div class="loading-container">
                <loading></loading>
            </div>
        </div>
    </div>
</template>
<style scoped>
    #singer{
        position: fixed;
        top: 1.32rem;
        width: 100%;
    }
    .singer_list{
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;
    }
    .singer_index{
        height: 0.7rem;
        background: rgba(0, 0, 0, 0.7);
        color: #ffffff;
        font-size: 12px;
        line-height: 0.7rem;
        text-indent: 15px;
    }
    .singList li{
        position: relative;
        padding: 0.2rem 0;
    }
    .singList li a{
        display: block;
    }
    .singList li img{
        position: absolute;
        left: 0.5rem;
        top: 0.2rem;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
    }
    .singer_name{
        height: 1.5rem;
        padding-left: 2.4rem;
        box-sizing: border-box;
        line-height: 1.5rem;
        color: #ffffff;
        font-size: 14px;
        font-weight: bold;
    }

    .list-shortcut{
        position: absolute;
        z-index: 30;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.6rem;
        padding: 0.4rem 0;
        border-radius: 10px;
        text-align: center;
        background: rgba(0,0,0,0.3);
        /* background: red; */
        font-family: Helvetica;
    }
    .list-shortcut .item{
        padding: 3px;
        line-height: 1;
        color: #ffffff;
        font-size: 12px;
    }
    .list-shortcut .item.current{
        color: #ffcd32;
    }
    .loading_singer{
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.3);
    }
    .loading-container{
        position: absolute;
        left: 0;
        top:50%;
        width: 100%;
    }
</style>

<script>
import BScroll from 'better-scroll';
import Loading from './../base/loading'
export default {
    data(){
        return{
            isShowLoad:true,
            scrollY: -1,
            currentIndex: 0,
            diff: -1,
            singerList:[]
        }
    },
    components: {
        Loading
    },
    computed:{
        shortcutList () {
            return this.singerList.map((group) => {
                return group.title.substr(0, 1)
            })
        },
        bottom(){
            return this.$store.state.bottom;
        }
    },
    created() {
      this.touch = {};
      this.getSingerList();
    },
    mounted(){
        setTimeout(() => {
            this._initScroll();
        }, 20);
    },
    methods:{
        getSingerList(){
            let url="https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq";
            this.$http.jsonp(url,{
                //请求参数
                jsonp:'jsonpCallback'
            }).then((res)=>{ 
                let singerLists=JSON.parse(res.bodyText);
                this.singerList=this._normaliszSinger(singerLists.data.list);
                this.isShowLoad=false;
            },function(){
            });
        },
        _normaliszSinger(list){
            let map={
                hot:{
                    title:"热门",
                    item:[]

                }
            }
            list.forEach((item,index) => {
                if(index<10){
                    map.hot.item.push({
                        id:item.Fsinger_mid,
                        name:item.Fsinger_name,
                        avatar:"https://y.gtimg.cn/music/photo_new/T001R300x300M000"+item.Fsinger_mid+".jpg?max_age=2592000"
                    });
                }
                const key=item.Findex;
                if(!map[key]){
                    map[key]={
                        title:key,
                        item:[]
                    }
                }
                map[key].item.push({
                    id:item.Fsinger_mid,
                    name:item.Fsinger_name,
                    avatar:"https://y.gtimg.cn/music/photo_new/T001R300x300M000"+item.Fsinger_mid+".jpg?max_age=2592000"
                });
                
            });
            //排序一下
            let hot=[];
            let ret=[];
            for(let key in map){
                let val=map[key];
                if(val.title.match(/[a-zA-z]/)){
                    ret.push(val);
                }else if(val.title==="热门"){
                    hot.push(val);
                }
            }
            ret.sort((a,b)=>{
                return a.title.charCodeAt(0)-b.title.charCodeAt(0);
            });
            return hot.concat(ret);
        },
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
        onShortcutStart(e){
            
            // 获取到绑定的 index
            let index = e.target.getAttribute('data-index');
            // 使用 better-scroll 的 scrollToElement 方法实现跳转
            this.scroll.scrollToElement(this.$refs.listGroup[index]);
            // 记录一下点击时候的 Y坐标 和 index
            let firstTouch = e.touches[0].pageY
            this.touch.y1 = firstTouch;
            this.touch.anchorIndex = index;
        },
        onShortcutMove(e){
            // 再记录一下移动时候的 Y坐标，然后计算出移动了几个索引
            let touchMove = e.touches[0].pageY;
            this.touch.y2 = touchMove;

            // 这里的 16.7 是索引元素的高度
            let delta = Math.floor((this.touch.y2 - this.touch.y1) / 18);

            // 计算最后的位置
            // * 1 是因为 this.touch.anchorIndex 是字符串，用 * 1 偷懒的转化一下
            let index = this.touch.anchorIndex * 1 + delta;
            this.scroll.scrollToElement(this.$refs.listGroup[index]);
        }
    }
}
</script>

