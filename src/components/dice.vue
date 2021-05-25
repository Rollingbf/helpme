<template>
    <div>
    <van-field
        readonly
        clickable
        label="骰点"
        :value="value"
        placeholder="选择骰子"
        @click="showPicker = true"
    >
    </van-field>
    <van-button size="small" type="primary" @click="subDice">确认骰点</van-button>
    <van-button size="small" type="primary" @click="cancelDice">取消骰点</van-button>
    <van-popup v-model="showPicker" round position="bottom">
        <van-picker
            title="骰子"
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="onCancel"
        />
    </van-popup>
    
    </div>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';

import { Picker } from 'vant';
import { Field } from 'vant';
import { Popup } from 'vant';
import { Button } from 'vant';

Vue.use(Vuex);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Field);
Vue.use(Button);

export default {
    name:"Dice",
    data() {
        return {
            value: '',
            showPicker: false,
            columns: [
                //骰子数
                {
                    values:['1','2','3'],
                    defaultIndex:0
                },
                //骰子类型（n面骰）
                {
                    values:['100','6']
                }
            ],
            };
    },
    methods: {
        subDice(){
            //这个方法控制组件隐藏和计算
            this.$emit('closeDice',this.value);

            var dice = 0;
            var num = 0;
            var result = 0;
            var text = "本次骰点结果为 ";
            dice=this.value[1];
            num=this.value[0];
            result=0;

            if(dice==100){
                if(num==1){
                    result = 1+Math.round(Math.random()*99);
                }
                else if(num==2){
                    result = 2+Math.round(Math.random()*99)+Math.round(Math.random()*99);
                }
                else if(num==3){
                    result = 3+Math.round(Math.random()*99)+Math.round(Math.random()*99)+Math.round(Math.random()*99);
                }
            }
            else if(dice==6){
                if(num==1){
                    result = 1+Math.round(Math.random()*5);
                }
                else if(num==2){
                    result = 2+Math.round(Math.random()*5)+Math.round(Math.random()*5);
                }
                else if(num==3){
                    result = 3+Math.round(Math.random()*5)+Math.round(Math.random()*5)+Math.round(Math.random()*5);
                }
            }
            console.log(result);
            text += result;
            console.log(text);
            this.$store.commit('addText',text);
            
        },
        onConfirm(value) {
            this.value = value;
            this.showPicker = false;
        },
        onCancel() {
        this.showPicker = false;
        },
        cancelDice(){
            this.$emit('closeDice',this.value);
        }
  },
}
</script>

<style scoped>

</style>