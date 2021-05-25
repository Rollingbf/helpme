<template>
    <div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" duration="1000">
            <van-swipe-item>希望剧本杀能给你快乐</van-swipe-item>
            <van-swipe-item>跑团也挺不错</van-swipe-item>
            <van-swipe-item>功能尚需完善请见谅</van-swipe-item>
            <van-swipe-item>这一句话只是为了填充</van-swipe-item>
        </van-swipe>

        <van-tabs v-model="active">
            <van-tab title="用户注册口" name="1">
                <van-form id="reg" >
                    <van-field v-model="userName" name="userName" label="用户名" placeholder="请输入用户名"
                        :rules="[{ validator: asyncCheck }]" />
                    <van-field v-model="pwd" type="password" name="pwd" label="密码" placeholder="请输入密码"
                        :rules="[{ validator: asyncCheckPwd }]" />
                    <van-field v-model="repwd" type="password" name="repwd" label="验证密码" placeholder="请再次输入密码"
                        :rules="[{ validator: asyncFirm }]" />
                    <van-button @click="send" round block type="info" native-type="button">
                        提交
                    </van-button>
                </van-form>
            </van-tab>
        </van-tabs>
        <van-dialog v-model="show" title="注册成功" show-cancel-button @confirm="useGo">
            <pre>是否以注册信息登陆且前往主页</pre>
        </van-dialog>

    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:"reg",
    data(){
        return{
            active: 1,
            userName: '',
            pwd: '',
            repwd:'',
            show:false
        }
    },
    methods:{
        asyncCheck(v){
            return new Promise((resolve)=>{
                if(v!=''){
                    if(/^(?!\d).*/.test(v)){
                        axios.post('regCheck',{
                            sta:'begin',
                            ask:v
                        }).then(res=>{
                            console.log(res.data)
                            if(res.data==false){
                                this.$toast({
                                    message: '该用户名已被注册',
                                    position: 'top',
                                });
                                resolve(false);
                            }else{
                                resolve(true)
                            }                        
                        })
                    }else{
                        this.$toast({
                            message:'请输入字符开头用户名',
                            position:'top'
                        })
                        resolve(false)
                    }
                }
            })
        },
        asyncCheckPwd(v){
            return new Promise((resolve)=>{
                if(v!=''){
                    if(/^[a-zA-Z]\w{5,17}$/.test(v)){
                        //resolve(true)
                    }else{
                        this.$toast({
                            message:'密码应为字母开头且长度为6-18位',
                            position:'top'
                        })
                        resolve(false)
                    }
                }
            })
        },
        asyncFirm(v){
            return new Promise((resolve)=>{
                if(v!=''){
                    if(v==this.pwd){
                        resolve(true)
                    }else{
                        this.$toast({
                            message:'请再次输入相同密码',
                            position:'top'
                        })
                        resolve(false)
                    }
                }
            })
        },
        send(){
            axios.post('regCheck',{
                sta:'end',
                name:this.userName,
                pwd:this.pwd,
            }).then(res=>{
                console.log(res.data)
                if(res.data){
                    this.show = true
                }
                
            })
        },
        useGo(){
            this.$store.commit('GET_USER',this.userName)
            this.$store.commit('SET_ISADMIN',false)
            this.$store.commit('GET_PCARD',1)              
            this.$router.push({name:'showScripts'})
            this.$root.$emit('global::changeHead')
        }
    }
}
</script>
<style>

</style>