const isDev = process.env.NODE_ENV === 'development';

var routes = [
  // { exact: false, path: '*', redirect: '/login' },

  { exact: true, path: '/login', component: '@/pages/Login' },
  { exact: true, path: '/chat', component: '@/pages/Chat' },
  {
    path: '/',
    redirect: '/app',
  },
  {
    // exact: false,
    layout: false,
    path: '/app',
    component: '@/layouts/Index',
    routes: [
      {
        path: '/app',
        redirect: '/app/home',
      },
      { path: '/app/home', component: '@/pages/Home' },
      { path: '/app/friend', component: '@/pages/Friends' },
      { component: '@/pages/404' },
    ],
  },
  { component: '@/pages/404' },
];

if (isDev) {
  routes = [
    { exact: true, path: '/test', component: '@/pages/Test' },
    ...routes,
  ];
}

export default routes;
