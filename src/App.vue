<template>
  <div id="app">
    <!-- * <van-sticky>x
    <Options></Options>
    </van-sticky>
    <div v-html="word">{{word}}</div>
    -->
    <mainToolCard></mainToolCard>

    <router-view />
  </div>
</template>

<script>
import mainToolCard from './components/mainToolCard.vue';
//* import Vue from 'vue';
//import VueSocketIO from 'vue-socket.io';
//import { Popup } from 'vant';
//* import Options from './components/options.vue'
//* import { Sticky } from 'vant';
//import Dice from './components/dice.vue'
//Vue.use(Popup);
//* Vue.use(Sticky);
export default {
  
  name: 'App',
   data() {
     return{
      // word:""
     }
  },
  computed:{
      word(){
        return this.$store.state.mainPageText;
      }
  },
  methods: {

  },
  components: {
    mainToolCard,
    //* Options,
  },
  sockets:{
    connect:function(){
      console.log('socket connected from App')
    },
    STREAM_STATUS(data){
      console.log('App: '+data)
    }
  },
  mounted(){
    console.log('App mounted')
    //this.$socket.emit('STREAM_STATUS',{ subscribe: true})
  }
}
</script>

<style>
  html,body,#app{
    height: 100%;
  }
</style>
