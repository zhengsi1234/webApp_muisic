<template>
    <div class="SearchList">
        <div class="SearchList_title">
            <span class="iconfont icon-xiangzuo backBtn"></span>
            <strong>{{searchName}}</strong>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            searchList:[],
            searchName:""
        }
    },
    mounted(){
        let name =this.$route.params.name;
        this.searchName=name;
        this.getHostSearch(name);
    },
    methods:{
        //搜索接口
        getHostSearch(word){
            // this.isLoadd=true;
            // if(this.showHostSearch){
            //     this.showHostSearch=!(this.showHostSearch);
            // }
            // if(!this.isShowList){
            //     this.isShowList=true;
            // }
            // if(this.searchList.length>0){
            //     this.searchList.splice(0,this.searchList.length);
            // }
            let url="https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.center&searchid=51092793577276447&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=20&w="+word+"&g_tk=1567556135&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0";
            this.$http.jsonp(url,{
                    //请求参数
                    jsonp:'jsonpCallback'
            }).then(function(res){ 
                let search=JSON.parse(res.bodyText);
                this.searchList=search.data.song.list;
                // this.isLoadd=false;
            },function(){
                //console.log(1)
            });
        }
    }
}
</script>
<style scoped>
    .SearchList{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: #ffffff;
    }
    .SearchList_title{
        height: 1rem;
        background: red;
        position: relative;
        text-align: center;
        line-height: 1rem;
        font-size: 15px;
    }
    .backBtn{
        position: absolute;
        left: 0.2rem;
        top: 50%;
        font-size: 18px;
        transform: translateY(-50%);
    }   
</style>

