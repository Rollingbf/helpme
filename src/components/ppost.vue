<template>
    <div>
        <van-sticky>
            <van-grid clickable :column-num="1">
                    <van-grid-item @click="goNew" text="创建新投稿" />
            </van-grid>
        </van-sticky>
        <div><br><br><br>
            <van-grid v-if="blank" :border=false clickable :column-num="1">
                    <van-grid-item text="未找到投稿" />
            </van-grid>
        </div>
        <van-collapse v-if="!blank" v-model="activeNames">
            <van-collapse-item :name="index" v-for="(item, index) in askdata" :key="index">
                <template #title>
                    <van-image :src="item.faceurl" />
                    <div>
                        {{`当前热度`+item.dHot}}
                    </div>
                </template>
                <van-cell :title="item.title" :value="item.author" size="large" :label="item.words" />
                <van-button type="primary" size="small" @click="detail(item.ssNum)" block round >详细内容</van-button><br>
                <van-button type="danger" size="small" @click="pdelete(item.ssNum)" block round >删除此剧本</van-button>
                <br>
            </van-collapse-item>
        </van-collapse>
        <van-popup v-model="pdel" position="bottom" :style="{ height: '15%' }" :close-on-click-overlay=false>
            <br><van-grid clickable :column-num="2" :gutter="20">
                <van-grid-item @click="yesDel" text="确认删除" />
                <van-grid-item @click="noDel" text="我再想想" />
            </van-grid>
        </van-popup>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:"ppost",
    data(){
        return{
            activeNames:[],
            askdata:[],
            blank:0,
            pdel:false,
            del:''
        }
    },
    methods:{
        goNew(){
            this.$router.push({name:"npost"})
        },
        detail(v){
            this.$store.commit('SET_DTARGET',v)//为了防止未能成功进入页面（如后台删除了某篇文章导致直接页面失效）但增加历史导致数据出错，只有成功进入页面后才会更新用户历史
            this.$router.push({name:'sdetail'}).catch(() =>{console.log('sdetail跳转失败')})
        },
        pdelete(v){
            this.pdel=true
            this.del=v
        },
        yesDel(){
            axios.post('/delsth',{
                sta:"delSc",
                del:this.del
            }).then(res=>{
                if(res){
                    console.log("已删除")
                    this.$router.go(0)
                }
            }).catch(()=>{
                console.log("del fail")
            })
        },
        noDel(){
            this.pdel=false
        }


    },
    mounted:function(){
        axios.post('res/resScriptsLess',{
            pageNum:'',
            author:this.$store.state.user
        }).then(res=>{
            this.askdata=res.data
            if(this.askdata.length==0){
                this.blank=1;
            }
        }).catch(()=>{
            console.log("请求作品序列失败")
        })
    }
}
</script>
<style>
.backG{background-color: aquamarine;}
</style>