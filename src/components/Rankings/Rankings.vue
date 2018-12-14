<template>
    <div class="ranking" :style="{bottom:bottomNum}">
        <scroll :data="rankTop" id="ranking">
            <div class="ranking_content">
                <div>
                    <ul class="rankTop">
                        <li class="rankTop_item_Box" v-for="(item,index) in rankTop" :key="index">
                            <router-link :to="'/Rankings/RankingsDetails/'+item.id">
                                <div class="rankTop_item">
                                    <img :src="item.picUrl"/>
                                    <h3 v-html="item.topTitle"></h3>
                                    <ul class="rankTop_item_list">
                                        <li v-for="(items,indexs) in item.songList" :key="indexs+'0'">{{indexs+1}} {{items.songname}} -- {{items.singername}}</li>
                                    </ul>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
        <div class="loading-container" v-show="!rankTop.length">
            <loading></loading>
        </div>
        <router-view></router-view>
    </div>
</template>
<style scoped>
    .ranking{
        position: fixed;
        top: 1.35rem;
        width: 100%;
        padding-bottom: 0.2rem;
    }
    #ranking{
        height: 100%;
        overflow: hidden;
    }
    .rankTop .rankTop_item_Box{
        width: 100%;
        height: 2.4rem;
        padding: 0 0.3rem;
        box-sizing: border-box;
        margin-bottom: 0.7rem;
    }
    .rankTop_item_Box a{
        display: block;
    }
    .rankTop_item{
        width: 100%;
        height: 100%;
        position: relative;
        padding-left: 2.6rem;
        box-sizing: border-box;
    }
    .rankTop_item img{
        width: 2.4rem;
        height: 2.4rem;
        position: absolute;
        left: 0;
        top: 0;
    }
    .rankTop_item h3{
        color: #dddddd;
        font-size: 14px;
    }
    .rankTop_item_list{
        margin-top: 0.1rem;
    }
    .rankTop_item_list li{
        color: #dddddd;
        font-size: 12px;
        padding-bottom: 0.1rem;
    }
    .loading-container{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
</style>

<script>
import Scroll from './RankScrollTop.vue'
import Loading from './../base/loading'
export default {
    data(){
        return{
            rankTop:[]
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
        this.getRankTop();
    },
    methods:{
        getRankTop(){
            let url="https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg";
            let postData ={
                uin: 0,
                needNewCode: 1,
                platform: 'h5',
                g_tk: 1928093487,
                inCharset: 'utf-8',
                outCharset: 'utf-8',
                notice: 0,
                format: 'jsonp'
            }
            this.$http.jsonp(url,{
                    params:postData,
                    //请求参数
                    jsonp:'jsonpCallback'
            }).then(function(res){ 
                let rankTop=JSON.parse(res.bodyText);
                this.rankTop=rankTop.data.topList;
            },function(){
                //console.log(1)
            });
        },
        getRankList(id){
            console.log(id);
        }
    }
}
</script>

