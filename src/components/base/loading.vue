<template>
  <div class="loading">
    <img width="30" height="30" src="./../../../static/img/loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入'
      }
    }
  }
</script>
<style scoped>
.loading{
  width: 100%;
  text-align: center;
}
.loading .desc{
    line-height: 30px;
    font-size: 16px;
    color:#ffffff;
    margin-top: 0.3rem;
  }
</style>
