<template>
    <div>
        <van-sticky>
            <van-collapse v-model="activeNames">
                <van-collapse-item title="整体故事" name="1">
                    <div v-html="total"></div>
                </van-collapse-item>
                <van-collapse-item title="人物故事" name="2">
                    <van-tabs v-model="active">
                        <van-tab :name="index" v-for="(item, index) in player" :key="index" :title="item.player" >
                            <van-collapse v-model="activeNames1" style="overflow-y:scroll;overflow-x:hidden;height:100%;-webkit-overflow-scrolling: touch;">
                                <van-collapse-item :name="index1" v-for="(item1, index1) in item.playerStory" :key="index1" :title="index1">
                                    <van-cell :title="item1" size="large" />
                                </van-collapse-item>
                            </van-collapse>
                        </van-tab>
                    </van-tabs>
                </van-collapse-item>
                <van-collapse-item title="游戏线索" name="3">
                    
                </van-collapse-item>
            </van-collapse>
        </van-sticky>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'sdetail',
    data(){
        return{
            active:0,
            askdata:[],
            total:'',
            playerStory:[],
            clue:[],
            player:[],
            activeNames:['1'],
            activeNames1:[],
        }
    },
    methods:{
    },
    mounted:function(){//此处将第二个post（更新用户历史）放入前一个的then中可以防止用户数据不匹配
        axios.post('sdetail',{
            ask:window.sessionStorage.dtarget
        }).then(res=>{
            this.total=res.data.total
            this.player = res.data.playerStory
            this.clue = res.data.clue
            console.log('获得详细内容')
            console.log(window.sessionStorage.dtarget)
            }),
            
        axios.post('phistory',{
            sta:"up",
            name:this.$store.state.user,
            history:window.sessionStorage.dtarget
        }).then(res=>{
            console.log('up history')
        })
    }
}
</script>
<style>

</style>