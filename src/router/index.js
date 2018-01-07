import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Admin from '@/views/Admin'
import UserList from '@/views/UserList'
import ArticleNew from '@/views/ArticleNew'
import ArticleList from '@/views/ArticleList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: 'userList',
          name: 'UserList',
          component: UserList
        },
        {
          path: 'articleNew',
          name: 'articleNew',
          component: ArticleNew
        },
        {
          path: 'articleList',
          name: 'articleList',
          component: ArticleList
        }
      ]
    }
  ]
})
