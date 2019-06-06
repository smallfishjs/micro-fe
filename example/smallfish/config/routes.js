export const root = '';

export default [
  {
    path: root,
    component: '../layout',
    routes: [
      { path: '/', component: 'home' },
      { path: '/list', component: 'list' },
      { path: '/user', component: 'user' },
      { path: '/test', component: 'test' },
      { path: '/private', component: 'private', Routes: ['src/page/auth'] },
      {
        component: '404',
      },
    ],
  },
];
