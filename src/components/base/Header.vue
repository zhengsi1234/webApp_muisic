<template>
    <div id="header">
        <ul class="header_tab">
            <li v-for="(item,index) in nav" :key="index">
                <router-link :to="item.path">{{item.name}}</router-link>
            </li>
        </ul>
    </div>
</template>
<style scoped>
    #header{
        width: 100%;
        height: 1.3rem;
    }
    .header_tab{
        display: flex;
    }
    .header_tab li{
        flex: 1;
        height: 100%;
        text-align: center;
    }
    .header_tab li a{
        display: inline-block;
        height: 100%;
        line-height: 1.3rem;
        font-size: 15px;
        color: #ffffff;
        font-weight: bold;
        /* font-family: "黑体"; */
    }
    .header_tab li a.active{
        border-bottom: 1px solid #FC9D10;
        color: #FC9D10;
    }
</style>
<script>
export default {
    data(){
        return{
            indexID:0,
            nav:[
                {
                    path:"/home",
                    name:"推荐"
                },
                {
                    path:"/singer",
                    name:"歌手"
                },
                {
                    path:"/rankings",
                    name:"排行"
                },
                {
                    path:"/search",
                    name:"搜索"
                },
                // {
                //     path:"/my",
                //     name:"我的"
                // }
            ]
        }
    },
    methods:{
        actives(index){
            alert(index);
            this.indexID=index;
        }
    }
}
</script>


