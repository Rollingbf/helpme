<template>
  <div>
    <van-sticky>
      <td width=10% align=right>
      <van-button 
        plain
        type="primary"
        @click="show = true">
        选择功能
      </van-button>
      </td>
    </van-sticky>
    <van-action-sheet v-model="show" :actions="actions"  @select="onSelect" />
    <dice v-if="showDice" @closeDice="closeDice"></dice>
    <shortCut v-if="showShortcut" @closeShortcut="closeShortcut"></shortCut>
  </div>
</template>

<script>
import Vue from 'vue';
import { ActionSheet } from 'vant';
import Dice from './dice.vue';
import ShortCut from './shortCut';
import { Sticky } from 'vant';
import { Button } from 'vant';


Vue.use(ActionSheet);

Vue.use(Sticky);
Vue.use(Button);

export default {
  name: 'Options',
   data() {
    return {
      show: false,
      showDice:false,
      showShortcut:false,
      actions: [{ name: '骰点' }, { name: '快捷语句' }],
    };
  },
  methods: {
    closeDice(e){
      this.showDice = false;
      console.log(e);
    },
    closeShortcut(){
      this.showShortcut = false;
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      if(item.name=="骰点"){
        this.showDice = true;
        this.showShortcut = false;
      }
      else if(item.name == "快捷语句"){
        this.showShortcut = true;
        this.showDice = false;
      }
    },
  },
  components: {
    Dice,
    ShortCut
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>