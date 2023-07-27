import type { RouteRecordRaw } from 'vue-router';
export const allRoutes: RouteRecordRaw[] = [
  {
    path: '/organization', // 人力资源/组织架构
    name: 'organization',
    component: () => import('@/views/main/organization/organization.vue'),
  },
  {
    path: '/employee', // 人力资源/员工管理
    name: 'employee',
    component: () => import('@/views/main/organization/employee.vue'),
  },
  {
    path: '/courseManage', // 人力资源/员工管理
    name: 'courseManage',
    component: () => import('@/views/main/teaching/courseManage.vue'),
  },
];
