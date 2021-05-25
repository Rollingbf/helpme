<template>
    <div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" duration="1000">
            <van-swipe-item>希望剧本杀能给你快乐</van-swipe-item>
            <van-swipe-item>跑团也挺不错</van-swipe-item>
            <van-swipe-item>功能尚需完善请见谅</van-swipe-item>
            <van-swipe-item>这一句话只是为了填充</van-swipe-item>
        </van-swipe>

        <van-tabs v-model="active">
            <van-tab title="用户登陆口" name="1">
                <van-form id="sub" @submit="onSubmit">
                    <van-field v-model="userName" name="userName" label="用户名" placeholder="请输入用户名"
                        :rules="[{ required: true, message: '请填写用户名' }]" />
                    <van-field v-model="pwd" type="password" name="pwd" label="密码" placeholder="请输入密码"
                        :rules="[{ required: true, message: '请填写密码' }]" />
                    <van-button round block type="info" native-type="submit">
                        提交
                    </van-button>
                </van-form>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>    
import axios from 'axios';    
export default {
    name: "Login",
    data() {
        return {
            active: 1,
            userName: '',
            pwd: '',
        }
    },
    methods: {
        onSubmit(v) {
            axios.post('login/login_user', {
                    userName: v.userName,
                })
                .then(res=>{
                    if(res.status == 200){
                        console.log("res ok")
                        console.log(res.data[0])
                        if(res.data[0].pwd == v.pwd&&res.data[0].name == v.userName){
                            this.$store.commit('GET_USER', res.data[0].name)
                            this.$store.commit('GET_HEAD', res.data[0].headurl)  
                            this.$store.commit('SET_ISADMIN',res.data[0].isAdmin)
                            this.$store.commit('GET_PCARD',1)              
                            this.$router.push({name:'showScripts'})
                            this.$root.$emit('global::changeHead')

                        }
                        else{
                            console.log("用户名或密码错误")
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })

        },
    }
}
</script>

<style scoped>
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
    }
</style>