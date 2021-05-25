import Vue from 'vue';
import Vuex from 'vuex';
import scriptPool from './scriptPool'

Vue.use(Vuex);

const modules={scriptPool}
const state={
    user: window.sessionStorage.getItem('user'),
    token: window.sessionStorage.getItem('token'),
    head: window.sessionStorage.getItem('head'),
    pcard: window.sessionStorage.getItem('pcard'),//控制判断用户信息是否存在从而决定是否启用登陆口
    dtarget:window.sessionStorage.getItem('dtarget'),
    psearch:window.sessionStorage.getItem('psearch'),
    isAdmin:window.sessionStorage.getItem('isAdmin'),
    //phistory:window.sessionStorage.getItem('phistory'),
    pubText:"",
    priText:"<br>"
}
const mutations={
    //将token保存到sessionStorage里，token表示登陆状态
  SET_TOKEN: (state, data) => {
    state.token = data
    window.sessionStorage.setItem('token', data) 
  },
  //获取用户名
  GET_USER: (state, data) => {
    // 把用户名存起来
    state.user = data
    window.sessionStorage.setItem('user', data)
  },
  GET_HEAD: (state, data) => {
    // 把头像存起来
    state.head = data
    window.sessionStorage.setItem('head', data)
  },
  GET_PCARD: (state, data) => {
    // 把用户卡状态存起来
    state.pcard = data
    window.sessionStorage.setItem('pcard', data)
  },
  /*SET_PHISTORY:(state,data)=>{
    state.phistory = data
    window.sessionStorage.setItem('phistory',data)
  },*/
  SET_DTARGET:(state,data)=>{
    state.dtarget = data
    window.sessionStorage.setItem('dtarget',data)
  },
  SET_PSEARCH:(state,data)=>{
    state.psearch = data
    window.sessionStorage.setItem('psearch',data)
  },
  SET_ISADMIN:(state,data)=>{
    state.isAdmin = data
    window.sessionStorage.setItem('isAdmin',data)
  },


  GET_KP: (state, data) => {
    // 把用户名存起来
    state.kp = data
    window.sessionStorage.setItem('kp', data)
  },
  //登出
  LOGOUT: (state) => {
    // 登出的时候要清除token
    state.token = null
    state.user = null
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('user')
  },
  addPubSentence:(state,word)=>{
    state.pubText += word.targetId+":"+state.scriptPool.scripts[word.messageCode]+"<br>";
    console.log("addPub被调用");
},
  addPriSentence:(state,word)=>{
    state.priText += word.targetId+":"+state.scriptPool.scripts[word.messageCode]+"<br>";
    console.log("addPri被调用");
},
}
const actions={
    
}

export default new Vuex.Store({
    modules,
    state,
    mutations,
    actions
    /* *state:{
        mainPageText:"<br>",
        user:window.sessionStorage.getItem('user'),
        token:window.sessionStorage.getItem('token'),
    },
    mutations:{
        addText(state,text){
            
            state.mainPageText += text+"<br>";
            console.log("addText被调用");
            var a = state.mainPageText;
            //var b = state.scriptPool.scripts[0];
            console.log(a);
        },
        addSentence(state,sentenceNum){
            state.mainPageText += state.scriptPool.scripts[sentenceNum]+"<br>";
            console.log("addSentence被调用");
        },
        //将token保存到sessionstorage中
        
    },
    actions:{

    }* */
});