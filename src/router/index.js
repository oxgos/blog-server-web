import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Admin from '@/views/Admin'
import Index from '@/views/Index'
import UserList from '@/views/User//UserList'
import ArticleNew from '@/views/Article/ArticleNew'
import ArticleList from '@/views/Article/ArticleList'
import ArticleDetail from '@/views/Article/ArticleDetail'
import ArticleCategory from '@/views/Article/ArticleCategory'

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
          path: '/',
          name: 'Index',
          component: Index
        },
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
        },
        {
          path: 'articleDetail',
          name: 'articleDetail',
          component: ArticleDetail
        },
        {
          path: 'articleCategory',
          name: 'articleCategory',
          component: ArticleCategory
        }
      ]
    }
  ]
})
