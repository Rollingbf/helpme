<template>
    <div>
        <van-cell-group>
        <van-cell title="在线用户" :value="num" :label="list" size="large"/>
        </van-cell-group>
        <van-form id="sub" ref="sub" @submit="onSubmit" >
            <van-field v-model="userName" name="userName" label="用户名" placeholder="请输入目标用户名"
                :rules="[{ required: true }] "/>
            <van-field v-model="code" name="code" label="序号" placeholder="请输入序号"
                :rules="[{ required: true }] "
            >
            <template #button>
                <van-button plain type="primary" size="small" native-type="submit" >
                发送
                </van-button>
            </template>
            </van-field>
        </van-form>
        <van-cell-group>
            <van-cell title="公共线索" >
                <div v-html="wordPublic">
                {{wordPublic}}
                </div>
            </van-cell>

            <van-cell title="个人线索" >
                <div v-html="wordPrivate">
                {{wordPrivate}}
                </div>
            </van-cell>
        </van-cell-group>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            num:"",
            userName:"",
            code:"",
            list:[],
        }
    },
    methods:{
        onSubmit(v){
            console.log(v)
            axios.post('send/mock_send',{
                targetName:v.userName,
                msgCode:v.code,
            }).then(res=>{
                if(res.status == 200){
                    console.log("res2 ok")
                    console.log(res.data.targetId)
                    console.log(res.data.messageCode)
                    if(res.data.targetId == "public"){
                        this.$store.commit('addPubSentence',res.data)
                    }
                    else{
                        this.$store.commit('addPriSentence',res.data)
                    }                    
                }
            })
            .catch(function(error){
                console.log(error)
            })
        }
    },
    computed:{
        wordPublic(){
            return this.$store.state.pubText;
        },
        wordPrivate(){
            return this.$store.state.priText;
        },
    }
}
</script>

<style scoped>

</style>