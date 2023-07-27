<template>
  <div class="login-x" flex justify-center items-center h-full bg-gray>
    <div class="form-x" p="40 20 0 20" bg-white rounded-5 shadow>
    <div>帐号密码随便填,满3位就行.</div>
      <el-form label-width="80px" ref="ruleFormRef" :model="ruleForm" :rules="rules" w-300>
        <el-form-item label="用户名" size="default" prop="username">
          <el-input
            v-model.trim="ruleForm.username"
            placeholder=""
            size="default"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" size="default" prop="password">
          <el-input
            v-model.trim="ruleForm.password"
            type="password"
            placeholder=""
            size="default"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item class="submit-x" size="default" mb="!0" ml="!0">
          <div w-full text-center>
            <el-button
              type="primary"
              size="default"
              @click="onSubmit(ruleFormRef)"
              display="!block"
              w-200
              m-auto
              >登录</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
//   在 tsconfig.app.json 配置 "moduleResolution": "node",解决ts警告 'element-plus' 没有导出成员 问题
import { useLoginStore } from '@/stores/login/login';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
const { loginFn } = useLoginStore();
const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  username: '',
  password: '',
});
const rules = reactive<FormRules<typeof ruleForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, message: '请输入3位以上用户名', trigger: 'blur' },
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});
//提交
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate((valid, fields) => {
    console.log(valid);

    if (valid) {
      loginFn(ruleForm);
      console.log('submit!');
    } else {
      ElMessage.error('用户名或密码输入错误');
    }
  });
};
</script>
<style scoped lang="less">
/* 覆盖el-form-item__content的样式 */
.submit-x {
  :deep(.el-form-item__content) {
    /* 自定义样式 */
    margin-left: 0 !important;
  }
}
</style>
