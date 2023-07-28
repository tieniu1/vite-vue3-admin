<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse">
    <template v-for="menu in rawPermissions" :key="menu.code">
      <el-sub-menu :index="menu.code">
        <template #title>
          <el-icon>
            <component :is="iconObj[menu.icon]"></component>
          </el-icon>
          <span>{{ menu.name }}</span>
        </template>
        <template v-if="menu.children?.length > 0">
          <template v-for="menuItem in menu.children" :key="menuItem.code">
            <el-menu-item :index="menuItem.code" @click="handleMenuItemClick(menuItem)">{{
              menuItem.name
            }}</el-menu-item>
          </template>
        </template>
        <template v-else> </template>
      </el-sub-menu>
    </template>
  </el-menu>
</template>
<script lang="ts" setup>
import { useLoginStore } from '@/stores/login/login';
import { IObj } from '@/types/common.ts';
import router from '@/router';
import { Lock, Help, User, Setting, Location, PictureRounded, Menu } from '@element-plus/icons-vue';

const props = defineProps({
  rawPermissions: {
    type: Array,
    default: () => [],
  },
  isCollapse: {
    type: Boolean,
  },
});
const iconObj: IObj = {
  'icon-location': Location,
  'el-icon-user': User,
  'el-icon-picture-outline-round': PictureRounded,
  'el-icon-help': Help,
  'el-icon-lock': Lock,
  'el-icon-setting': Setting,
};
const handleMenuItemClick = (MenuItem) => {
  router.push(MenuItem.url);
};
</script>
<style lang="less" scoped></style>
