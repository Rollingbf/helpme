<template>
    <van-form >
        <van-field
            v-model="scene"
            name="场景"
            label="场景与状态"
            placeholder="请模仿此格式输入：场景一，侦察成功"
            :rules="[{ required: true, message: '请输入文本' }]"
        />
        <van-field
            v-model="sentence"
            type="textarea"
            name="句子"
            label="句子"
            placeholder="请输入快捷语句文本"
            :rules="[{ required: true, message: '请输入文本' }]"
        />
        
    </van-form>
</template>

<script>
import Vue from 'vue';
import { Form } from 'vant';
import { Field } from 'vant';

Vue.use(Form);
Vue.use(Field);

export default {
    name:"Seel",
    data() {
    return {
      scene: '',
      sentence: '',
    };
  },
    
}
</script>

<style>

</style>