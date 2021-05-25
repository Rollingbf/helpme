import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import axios from 'axios'
import router from './router.js'


import { Button} from 'vant';
import { Cell, CellGroup } from 'vant';
import { Collapse,CollapseItem} from 'vant';
import { Dialog } from 'vant';
import { Tab,Tabs} from 'vant';
import { Field } from 'vant';
import { Form } from 'vant';
import { Icon } from 'vant';
import { Image as VanImage } from 'vant';
import { Col, Row } from 'vant';
import { Grid, GridItem } from 'vant';
import { Pagination } from 'vant';
import { Sticky } from 'vant';
import { Swipe,SwipeItem} from 'vant';
import { Toast } from 'vant';
import { Popup } from 'vant';



/*const instance = axios.create({
  baseURL:process.env.VUE_APP_URL
})*/
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.mixin(require('./event-mixin.js').default)
/*Vue.use(new VueSocketIO({
    debug:true,
    connection:'http://localhost:5000',
    vuex:{
      store,
      actionPrefix:'SOCKET_',
      mutationPrefix: 'SOCKET_'
    },
    options: { path: "/my-app/" }
}))*/

Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(Field);
Vue.use(Icon);
Vue.use(Col);
Vue.use(Row);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Pagination);
Vue.use(Popup);
Vue.use(Sticky);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tabs);
Vue.use(Tab);
Vue.use(Toast);
Vue.use(VanImage);


new Vue({
 
	router,
	store,
	render: h => h(App),
  
}).$mount('#app')
