<template>
    <div>
        <van-grid clickable :border=false :column-num="4">
            <van-grid-item @click="jingsong" text="惊悚" />
            <van-grid-item @click="xingzhen" text="刑侦" />
            <van-grid-item @click="shejiao" text="社交" />
            <van-grid-item @click="chaoziran" text="超自然" />            
        </van-grid>
        <van-grid class="tran1" clickable :border=false :column-num="1">
            <van-grid-item @click="chexiao" text="撤销选择" />
        </van-grid>
        <br>
        <div>{{"日榜"}}</div>
        <van-collapse v-model="activeNames">
                <van-collapse-item :name="index" v-for="(item, index) in showask" :key="index">
                    <template #title>
                        <van-image :src="item.faceurl" />
                        <div>{{`当前热度`+item.dHot}}</div>
                    </template>
                    <van-cell :title="item.name" :value="item.author" size="large" :label="item.words" />
                    <br><van-button type="primary" size="small" @click="detail(item.ssNum)" block round >详细内容</van-button><br>
                </van-collapse-item>
            </van-collapse>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'rank',
    data(){
        return{
            activeNames:[],
            askdata:[],
            showask:[]
        }
    },
    methods:{
        jingsong(){
            this.showask=[]
            for(let i=0;i<this.askdata.length;i++){
                if(this.askdata[i].ptype[0]=="惊悚"||this.askdata[i].ptype[1]=="惊悚"){
                    this.showask.push(this.askdata[i])
                }
            }
        },
        xingzhen(){
            this.showask=[]
            for(let i=0;i<this.askdata.length;i++){
                if(this.askdata[i].ptype[0]=="刑侦"||this.askdata[i].ptype[1]=="刑侦"){
                    this.showask.push(this.askdata[i])
                }
            }
        },
        shejiao(){
            this.showask=[]
            for(let i=0;i<this.askdata.length;i++){
                if(this.askdata[i].ptype[0]=="社交"||this.askdata[i].ptype[1]=="社交"){
                    this.showask.push(this.askdata[i])
                }
            }
        },
        chaoziran(){
            this.showask=[]
            for(let i=0;i<this.askdata.length;i++){
                if(this.askdata[i].ptype[0]=="超自然"||this.askdata[i].ptype[1]=="超自然"){
                    this.showask.push(this.askdata[i])
                }
            }
        },
        chexiao(){
            this.showask=this.askdata
        },
        detail(v){
                console.log(v)
                this.$store.commit('SET_DTARGET',v)
                this.$router.push({name:'sdetail'}).catch(() =>{console.log('sdetail跳转失败')})
            }
    },
    mounted:function(){//将会加入日榜、周榜、月榜等区分，暂时数据量较少不添加
        axios.post('rank').then(res=>{
            let ask = res.data 
            ask.sort(function(a,b){
                return a.dHot<b.dHot?1:-1
            })
            this.askdata=ask
            this.showask=this.askdata
        })
    }
}
</script>

<style>
.tran1{color:red}
</style>