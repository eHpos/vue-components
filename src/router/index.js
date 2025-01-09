import { createRouter, createWebHistory } from 'vue-router';

// 定义路由
const routes = [
    {
        path: '/CountdownModal',
        name: 'CountdownModal',
        component: () => import('@/pages/CountdownModalDemo.vue'), 
    },
];

// 创建路由实例
const router = createRouter({
    history: createWebHistory(), // HTML5 模式
    routes,
});

export default router;
