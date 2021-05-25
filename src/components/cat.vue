<template>
    <div>
        <van-grid clickable :border=false :column-num="4">
            <van-grid-item @click="jingsong" text="惊悚" />
            <van-grid-item @click="xingzhen" text="刑侦" />
            <van-grid-item @click="shejiao" text="社交" />
            <van-grid-item @click="chaoziran" text="超自然" />
        </van-grid><br>
        <div v-if="blank"><br><br><br>
            <van-grid :border=false :column-num="1">
                <van-grid-item text="请选择分类" />
            </van-grid>
        </div>
        <van-collapse v-model="activeNames" v-if="!blank">
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
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name:"cat",
    data(){
        return{
            activeNames:[],
            blank:1,
            askdata:[]
        }
    },
    methods:{
        jingsong(){
            this.blank=0
            axios.post('cat',{
                ask:"惊悚"
            }).then(res=>{
                this.askdata=res.data
            }).catch(()=>{
                console.log('惊悚请求失败')
            })
        },
        xingzhen(){
            this.blank=0
            axios.post('cat',{
                ask:"刑侦"
            }).then(res=>{
                this.askdata=res.data
            }).catch(()=>{
                console.log('刑侦请求失败')
            })
        },
        shejiao(){
            this.blank=0
            axios.post('cat',{
                ask:"社交"
            }).then(res=>{
                this.askdata=res.data
            }).catch(()=>{
                console.log('社交请求失败')
            })
        },
        chaoziran(){
            this.blank=0
            axios.post('cat',{
                ask:"超自然"
            }).then(res=>{
                this.askdata=res.data
            }).catch(()=>{
                console.log('超自然请求失败')
            })
        },
        detail(v){
                console.log(v)
                this.$store.commit('SET_DTARGET',v)
                this.$router.push({name:'sdetail'}).catch(() =>{console.log('sdetail跳转失败')})
            }
    }
    
}
</script>
<style>

</style>