<template>
  <div class="common-layout" h-screen>
    <el-container flex h-full>
      <el-aside w="!200" h-full bg-red-3>
        <div class="logo" h-80 text-20 flex items-center justify-center bg-red-5>
          <h1 c-green>LOGO</h1>
        </div>
      </el-aside>
      <el-container flex>
        <el-header flex justify-between items-center bg-red-1>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">我的</a></el-breadcrumb-item>
          </el-breadcrumb>
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
        <el-main bg-red-2>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { useLoginStore } from '@/stores/login/login';
import { ArrowDown } from '@element-plus/icons-vue';
const { logOutFn, btnPermissions } = useLoginStore();
const logOut = () => {
  console.log('退出登录');
  console.log(btnPermissions);
  logOutFn();
};
</script>
<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
