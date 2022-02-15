// 需要鉴权的业务路由

const asyncRoutes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '',
      icon: '',
    },
    component: () => import('@/views/home/index.vue'),
  },
];

export default asyncRoutes;
