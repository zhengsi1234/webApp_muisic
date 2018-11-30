<template>
    <div style="color:#ffffff">测试</div>
</template>
<script>
export default {
    created(){
        this.getJsonp();
    },
    methods:{
        getJsonp(){
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
                songmid: '001btP1d28Phdt',  //歌曲的id
                filename:"C400"+ '001btP1d28Phdt' +".m4a",  
                guid:8129517694
            }
            this.$http.jsonp(url,{
                    params:postData,
                    //请求参数
                    jsonp:'callback'
            }).then(function(res){ 
                let search=JSON.parse(res.bodyText);
            },function(){
                //console.log(1)
            });
        }
    }
}
</script>
