import Vue from 'vue'
import {Button,Radio,Container,Main,Header,Aside,Menu,Submenu,MenuItem,MenuItemGroup,
  Dropdown,DropdownMenu,DropdownItem,Row,Col,Card,Table,TableColumn,Breadcrumb,BreadcrumbItem,Tag,
  Form,FormItem,Input,Select,Switch,DatePicker,Option,Dialog,Pagination} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import store from './store/index'
import router from './router/index'
import http from 'axios'
import './api/mock.js'



Vue.use(Button);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Switch);
Vue.use(DatePicker);
Vue.use(Option);
Vue.use(Radio);
Vue.use(Container);
Vue.use(Main);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tag);

Vue.prototype.$http = http;
Vue.config.productionTip = false

router.beforeEach((to,from,next) =>{
  store.commit('getToken')
  const token = store.state.user.token
  if(!token && to.name !== 'login'){
    next({name:'login'})
  }else{
    next()
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
