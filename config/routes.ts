const isDev = process.env.NODE_ENV === 'development';

var routes = [
  // { exact: false, path: '*', redirect: '/login' },
  { exact: true, path: '/', component: '@/pages/Index2' },
  { exact: true, path: '/login', component: '@/pages/Login' },
  { exact: true, path: '/chat', component: '@/pages/Chat' },
  { exact: true, path: '/friend', component: '@/components/Friends' },
  { component: '@/pages/404' },
];

if (isDev) {
  routes = [
    { exact: true, path: '/test', component: '@/pages/Test' },
    ...routes,
  ];
}

export default routes;
