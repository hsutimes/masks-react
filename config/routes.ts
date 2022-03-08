const isDev = process.env.NODE_ENV === 'development';

var routes = [
  // { exact: false, path: '*', redirect: '/login' },
  { exact: true, path: '/', component: '@/pages/Index' },
  { exact: true, path: '/login', component: '@/pages/Login' },
  { exact: true, path: '/chat', component: '@/components/Chat' },
  { component: '@/pages/404' },
];

if (isDev) {
  routes = [
    { exact: true, path: '/test', component: '@/pages/Dev' },
    ...routes,
  ];
}

export default routes;
