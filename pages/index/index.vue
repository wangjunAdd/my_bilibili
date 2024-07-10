<script setup lang="ts">
import type { VideoItem } from '@/types/video';

//
const { data: channelList} = await useFetch("/api/channel")

const { data: videoList} = await useFetch("/api/video")

const chanId = ref("1")
watch(chanId, (newValue, oldValue) => {
  // 监听的回调逻辑
  console.log(`新值: ${newValue}, 旧值: ${oldValue}`);
});
useHead({
  meta: [
    {
      name: 'referrer',
      content: 'no-referrer'
    }
  ]
})



const loading = ref(false)
const finished = ref(false)
let pageIndex = 1
let pageList = 20
const showList = ref<any[]>([])
const onLoad = ()=>{

      //表示正在加载
      loading.value = false;

      const data = videoList.value?.slice((pageIndex - 1)*pageList,pageIndex) as VideoItem[]

      showList.value.push(...data)
      pageIndex++
      
      if(showList.value.length == videoList.value?.length){
        finished.value = true
      }
}

onLoad()
</script>

<template>
  <!-- 公共头部 -->
<AppHeader/>
  <!-- 频道模块 -->
  <van-tabs v-model:active="chanId">
    <van-tab v-for="item in channelList" :key="item.id" :title="item.name" />
  </van-tabs>
  <!-- 视频列表 -->
   
  <van-list
       v-model:loading="loading"
       :finished="finished"
       finished-text="去 bilibili App 看更多"
       @load="onLoad">
       <div class="video-list">
          <AppVideo v-for="item in videoList" :key = "item.aid" :item="item" />
       </div>
</van-list>
 
</template>

<style lang="scss">

// 视频列表
.video-list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 5px;
}

// 视频卡片
.v-card {
  width: 50%;
  padding: 0 5px 10px;
  .card {
    position: relative;
    background: #f3f3f3 url(@/assets/images/default.png) center no-repeat;
    background-size: 36%;
    border-radius: 2px;
    overflow: hidden;
    .card-img {
      .pic {
        height: 100px;
        width: 100%;
        object-fit: cover;
      }
    }
    .count {
      background-image: linear-gradient(0deg, #000000d9, #0000);
      color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 6px;
      span {
        .iconfont {
          font-size: 12px;
        }
      }
    }
  }
  .title {
    margin-top: 5px;
    font-size: 12px;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>