<template>
    <div>
        <span v-if="onBoard == 1"><pcard /></span>
        <span v-else><pcardOut /></span><br>
        <van-collapse v-model="activeNames">
            <van-collapse-item :name="index" v-for="(item, index) in askdata" :key="index">
                <template #title>
                    <van-image :src="item.faceurl" />
                    <div>{{`当前热度`+item.dHot}}</div>
                </template>
                <van-cell :title="item.name" :value="item.author" :label="item.date" size="large"  />
                <br><van-button type="primary" size="small" @click="detail(item.ssNum)" block round >详细内容</van-button><br>
            </van-collapse-item>
        </van-collapse>
        <van-pagination v-model="currentPage" @change="jump" :total-items="8" :items-per-page="5" >
            <template #prev-text>
                <van-icon name="arrow-left" />
            </template>
            <template #next-text>
                <van-icon name="arrow" />
            </template>
        </van-pagination>
    </div>
</template>

<script>
    import axios from 'axios';
    import pcard from './pcard.vue'
    import pcardOut from './pcardOut.vue'
    export default {
        name: "showScripts",
        data() {
            return {
                onBoard:this.$store.state.pcard,    
                activeNames: [],
                askdata: [],                
                currentPage: 1,
            };
        },
        methods: {
            jump(){
                console.log('pageChanging')
                axios.post('res/resScriptsLess',{pageNum:this.currentPage,author:''                 
                    }).then(res => {
                        this.askdata = res.data;
                        console.log(this.askdata);
                        
                    }).catch(() => {
                        alert('wrong 2');
                    })
            },
            detail(v){
                this.$store.commit('SET_DTARGET',v)//为了防止未能成功进入页面（如后台删除了某篇文章导致直接页面失效）但增加历史导致数据出错，只有成功进入页面后才会更新用户历史
                this.$router.push({name:'sdetail'}).catch(() =>{console.log('sdetail跳转失败')})
            }
        },
        mounted: function () {
            axios.post('res/resScriptsLess',{pageNum:this.currentPage,author:''        
            }).then(res => {
                console.log('前端post成功')
                this.askdata = res.data;
                console.log(this.askdata);
                
            }).catch(() => {
                alert('home wrong 1');
            })
        },
        components:{
            pcard,
            pcardOut
        },
        

    }
</script>

<style>
.back{background-color: gainsboro;}
</style>