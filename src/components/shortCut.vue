<template>
    <div>
    <van-picker 
        show-toolbar 
        title="快捷语句" 
        :columns="columns" 
        @confirm="onConfirm"
        @cancel="onCancel"
    />
    
    </div>
</template>

<script>
import Vue from 'vue';
import { Picker } from 'vant';

Vue.use(Picker);

export default {    
    name:"ShortCut",
    data() {
        return {
            values:'',
            columns: [
                {
                    text: '湖边',
                    children: [
                        {
                        text: '聆听',
                        children: [{ text: '成功' }, { text: '失败' }],
                        },
                        {
                        text: '侦察',
                        children: [{ text: '成功' }, { text: '失败' }],
                        },
                    ],
                },
                {
                    text: '甲板上',
                    children: [
                        {
                        text: '聆听',
                        children: [{ text: '成功' }, { text: '失败' }],
                        },
                        {
                        text: '说服',
                        children: [{ text: '成功' }, { text: '失败' }],
                        },
                        {
                        text: '人类学',
                        children: [{ text: '成功' }, { text: '失败' }],
                        }
                    ],
                },
            ],
        };
    },
    
    methods:{
        onConfirm(value){
            this.values = value;
            console.log(this.values[0]);
            var check = this.values;
            var sentenceNum = 0;
            if(check[0]=="湖边"){
                if(check[1]=="聆听"){
                    if(check[2]=="成功"){
                        sentenceNum = 0;
                    }
                    else if(check[2]=="失败"){
                        sentenceNum = 1;
                    }
                }
                else if(check[1]=="侦察"){
                    if(check[2]=="成功"){
                        sentenceNum = 2;
                    }
                    else if(check[2]=="失败"){
                        sentenceNum = 3;
                    }
                }
            }
            else if(check[0]=="甲板上"){
                if(check[1]=="聆听"){
                    if(check[2]=="成功"){
                        sentenceNum = 4;
                    }
                    else if(check[2]=="失败"){
                        sentenceNum = 5;
                    }
                }
                else if(check[1]=="说服"){
                    if(check[2]=="成功"){
                        sentenceNum = 6;
                    }
                    else if(check[2]=="失败"){
                        sentenceNum = 7;
                    }
                }
                else if(check[1]=="人类学"){
                    if(check[2]=="成功"){
                        sentenceNum = 8;
                    }
                    else if(check[2]=="失败"){
                        sentenceNum = 9;
                    }
                }
            }
            this.$store.commit('addSentence',sentenceNum);
            this.$emit('closeShortcut');
        },
        onCancel(){
            this.$emit('closeShortcut');
        }
            

    }
}
</script>

<style scoped>

</style>