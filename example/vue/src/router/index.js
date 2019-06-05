import Vue from 'vue'
import Router from 'vue-router'


const Page1 = () => import(/* webpackChunkName: "page1" */'../view/page1')
const Page2 = () => import(/* webpackChunkName: "page2" */'../view/page2')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Page1,
    },
    {
      path: '/page-2',
      component: Page2,
    }
  ],
})



export default router
