<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
export default {
    props:{
        probeType:{
            type:Number,
            default:1
        },
        click:{
            type:Boolean,
            default:true
        },
        data:{
            type:Array,
            default:null
        }
    },
    data(){
        return{
            page:15
        }
    },
    mounted(){
        setTimeout(()=>{
            this._initScroll();
        },20);
    },
    methods:{
        _initScroll(){
            if(!this.$refs.wrapper){
                return;
            }
            this.scroll=new BScroll(this.$refs.wrapper,{
                probeType:this.probeType,
                click:this.click
            });

            this.scroll.on('scroll', (pos) => {
                //如果下拉超过50px 就显示下拉刷新的文字
                if(parseInt(pos.y)+30<parseInt(this.scroll.maxScrollY)){
                    // this.dropDown = true
                    this.$emit("showDropDown",true,null,false);
                }else{
                    this.$emit("showDropDown",false,null,false);
                }
            });

            /*
            * @ touchend:滑动结束的状态
            * @ maxScrollY:屏幕最大滚动高度
            */ 
           this.scroll.on('touchEnd', (position) => {
                if(parseInt(position.y)+30<parseInt(this.scroll.maxScrollY)){
                    this.$emit("showDropDown",false,true);
                    let url="https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2018_33&topid=26&type=top&song_begin="+this.page+"&song_num=15&g_tk=1567556135&loginUin=845548367&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0";
                    this.$http.jsonp(url,{
                        //请求参数
                        jsonp:'jsonpCallback'
                    }).then(function(res){ 
                        let datas=JSON.parse(res.bodyText);
                        // this.listData=songList.songlist;
                        this.$emit("showDropDown",false,datas.songlist,false);
                        this.page=this.page+15;
                    },function(){
                    });
                }
            });
        },
        enable(){
            this.scroll&&this.scroll.enable();
        },
        disable(){
            this.scroll&&this.scroll.disable();
        },
        refresh(){
            this.scroll&&this.scroll.refresh();
        }
    },
    watch:{
        data(newdata){
            setTimeout(()=>{
                this.refresh();
            },20);
        }
    }
}
</script>

