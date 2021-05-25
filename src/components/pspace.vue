<template>
    <div>
        <div v-if="head">
            <van-grid :column-num="1">
                <van-grid-item >
                    <van-image
                            round
                            cover
                            width="5rem"
                            height="5rem"
                            :src="head"
                            @click="pspace"
                    />
                    <br><div>{{this.$store.state.user}}</div>
                </van-grid-item>
            </van-grid>
            <van-grid clickable :column-num="3">
                <van-grid-item icon="new-o" text="动态" />
                <van-grid-item icon="envelop-o" text="消息" dot />
                <van-grid-item icon="star-o" text="收藏" />
            </van-grid>
            <van-grid clickable :column-num="2">
                <van-grid-item @click="ppost" text="投稿后台" />
                <van-grid-item @click="logOut" text="登出" />
            </van-grid>            
        </div>
        <div v-if="!head">
            <van-grid clickable :column-num="2">
                <van-grid-item text="注册" to="/reg" />
                <van-grid-item  text="登陆" to="/login"/>
            </van-grid>
            <br><br><br>
            <van-grid :border=false :column-num="1">
                <van-grid-item text="请登陆后再次进入当前页面" />
            </van-grid>
        </div>
        <van-collapse v-if="head" v-model="activeNames">
            <van-collapse-item :name="index" v-for="(item, index) in askdata" :key="index">
                <template #title>
                    <van-image :src="item.faceurl" />
                    <div>
                        {{`当前热度`+item.dHot}}
                    </div>
                </template>
                <van-cell :title="item.name" :value="item.author" size="large" :label="item.words" />
                <br><van-button type="primary" size="small" @click="detail(item.ssNum)" block round >详细内容</van-button><br>
            </van-collapse-item>
        </van-collapse>
        <div v-if="!head"><br><br><br>
            <van-grid :border=false :column-num="1">
                <van-grid-item text="未找到浏览历史" />
            </van-grid>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            activeNames:[],
            head:this.$store.state.head,
            askdata:[],
            phis:[]
        }
    },
    methods:{
        logOut(){            
            window.sessionStorage.head=''
            this.$root.$emit('global::changeHead')
            this.$store.commit('GET_PCARD',0)            
            this.$router.go(0)         
        },
        pspace(){
            this.$router.go(0)
        },
        ppost(){
            this.$router.push({name:'ppost'})
        },
        detail(v){//为了防止未能成功进入页面（如后台删除了某篇文章导致直接页面失效）但增加历史导致数据出错，只有成功进入页面后才会更新用户历史
            this.$store.commit('SET_DTARGET',v)
            this.$router.push({name:'sdetail'}).catch(() =>{console.log('sdetail跳转失败')})
        }
    },
    components:{
    },
    mounted:function(){
        axios.post('/userHistory',{
            ask:window.sessionStorage.user
        }).then(res=>{
            this.phis = res.data[0].phistory       
            axios.post('/phistory',{
                    sta:"get",
                    ask:this.phis
                }).then(res=>{
                this.askdata = res.data
            })
        })        
    }
}
</script>
<style>

</style>