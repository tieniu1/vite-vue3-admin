<template>
  <div class="common-layout" min-w-1000 h-screen>
    <el-container flex h-full>
      <el-aside w="!200" h-full :class="{ mini: isCollapse }">
        <div class="logo" h-80 text-20 flex-center-center box-border>
          <span> LOGO </span>
        </div>
        <baseMenu :rawPermissions="rawPermissions" :isCollapse="isCollapse"></baseMenu>
      </el-aside>
      <el-container flex>
        <el-header flex-center-between border-b-1>
          <div flex-items-center class="left">
            <div leading-0 mr-10 cursor-pointer @click="changeCollapse">
              <el-icon :size="20" v-if="isCollapse"><Expand /></el-icon>
              <el-icon :size="20" v-else><Fold /></el-icon>
            </div>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
              <el-breadcrumb-item><a href="/">我的</a></el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <el-dropdown>
            <span class="el-dropdown-link" outline-none>
              用户名
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <el-main bg-sky-1> <router-view></router-view> </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { useLoginStore } from '@/stores/login/login';
import { ArrowDown, Expand, Fold } from '@element-plus/icons-vue';
import baseMenu from '@/components/base-ui/base-menu';
import { ref } from 'vue';
const { logOutFn, rawPermissions } = useLoginStore();

/**
 * @description:  退出登录
 * @return {*}
 */
const logOut = () => {
  logOutFn();
};

const isCollapse = ref(false);

const changeCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
</script>
<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.el-menu {
  border-right: none;
}
.el-aside {
  transition: all 0.3s ease;
  .logo {
    transition: all 0.3s ease;
  }
  &.mini {
    width: 68px !important;
    font-size: 20px;
    .logo {
      font-size: 16px;
    }
  }
}
</style>
