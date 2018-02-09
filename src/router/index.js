import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Admin from '@/views/Admin'
import Index from '@/views/Index'
import UserList from '@/views/User/UserList'
import UserInfo from '@/views/User/UserInfo'
import Upload from '@/views/User/Upload'
import ArticleNew from '@/views/Article/ArticleNew'
import ArticleList from '@/views/Article/ArticleList'
import ArticleDetail from '@/views/Article/ArticleDetail'
import ArticleCategory from '@/views/Article/ArticleCategory'
import Comment from '@/views/Comments/Comment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect: '/admin/index',
      children: [
        {
          path: 'index',
          name: 'index',
          component: Index
        },
        {
          path: 'userList',
          name: 'userList',
          component: UserList
        },
        {
          path: 'userInfo/:id',
          name: 'userInfo',
          component: UserInfo
        },
        {
          path: 'upload',
          name: 'upload',
          component: Upload
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
        },
        {
          path: 'comment',
          name: 'comment',
          component: Comment
        },
        {
          path: '*',
          redirect: '/admin'
        }
      ]
    }
  ]
})
