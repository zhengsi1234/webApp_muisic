import Vue from 'vue'
import Router from 'vue-router'
import Home from './../components/Home/index';
import My from './../components/My/index';
import Search from './../components/Search/index';
import Singer from './../components/Singer/index';
import Rankings from './../components/Rankings/Rankings';
import RankingsDetails from './../components/Rankings/index';
import singerDetails from './../components/Singer/singerDetails';
import SearchList from './../components/Search/SearchList';
import textjsonp from './../components/textjsonp'
Vue.use(Router);

export default new Router({
  linkActiveClass:'active',
  routes: [
    {
      path:'/',           //这个表示的是根目录，即一进入的页面
      redirect:'/home'    //设置页面一进来就显示的页面，即重定向到goods组件，这里写的内容是对应组将的component的值
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      children:[
        { path: '/singer/singerDetails/:id', name:"singerDetails",component: singerDetails},
      ]
    },
    {
      path: '/rankings',
      name: 'Rankings',
      component: Rankings,
      children:[
        { path: '/Rankings/RankingsDetails/:id', name:"RankingsDetails",component: RankingsDetails},
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/my',
      name: 'My',
      component: My
    },
    {
      path: '/SearchList/:name',
      name: 'SearchList',
      component: SearchList
    },
    {
      path: '/textjsonp',
      name: 'textjsonp',
      component: textjsonp
    }
  ]
})
