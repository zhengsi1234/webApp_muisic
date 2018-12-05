<template>
    <div style="color:#ffffff">测试</div>
</template>
<script>
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    created(){
        this.getJsonp();
    },
    methods:{
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

            let url='/api/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
            let data ={
                type: 1,
                json: 1,
                utf8: 1,
                onlysong: 0,
                nosign:1,
                g_tk:"1453933548",
                disstid: "3717256718",
                format: 'json',
                needNewCode: 0,
                platform:"yqq",
                inCharset:"utf8",
                outCharset:"utf8",
                notice:0,
                hostUin:0
            }
            axios.get(url,{
                params:data
            }).then((res)=>{
                console.log(res);
            });

        }
    }
}
</script>
