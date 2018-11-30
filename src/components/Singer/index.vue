<template>
    <div>
        <!-- <div class="singer">歌手</div> -->
        <ListView/>
        <router-view></router-view>
    </div>
</template>
<script>
import ListView from './listView'
export default {
    data(){
        return{
            singers:[],
            isShowLoadd:true
        }
    },
    components:{
        ListView
    }
}
</script>

