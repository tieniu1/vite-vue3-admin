<template>
  <div class="not-found">
    <img class="icon" :src="img" />
    <div class="title">
      <h2>网站维护中...</h2>
      <h4>为了让您更好的使用系统，我们正在对服务器进行升级，升级期间暂时无法访问。</h4>
      <h4>给您带来的不便，敬请谅解！</h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAssetsImg } from '@/utils/utils';
const img = getAssetsImg('404.png');
</script>

<style lang="less" scoped>
.not-found {
  background-color: #7897f8;
  height: 100%;
  text-align: center;
  .icon {
    margin-top: 15vh;
    width: 500px;
  }
  .title {
    h2 {
      color: #fff;
      font-size: 36px;
      letter-spacing: 4px;
      text-align: center;
      line-height: 120px;
    }
    h4 {
      color: #fff;
      font-size: 18px;
      line-height: 38px;
      text-align: center;
    }
  }
}
</style>
