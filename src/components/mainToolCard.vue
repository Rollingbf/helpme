<template>
    <div @changeHead="changeHead">
        <van-collapse v-model="activeNames">
            <van-collapse-item>
                <template #title>
                    <div>
                        <router-link to='/showScripts' class=tran>跑团助手</router-link>
                        
                    </div>
                </template>
                <template #right-icon>
                    <div>
                    <van-image v-if="head" round cover width="1.5rem" height="1.5rem" :src="head" />
                    </div>
                </template>
                <router-link to='/pspace' class=lis>我的空间</router-link><br><br>
                <router-link to='/rank' class=lis>排行榜</router-link><br><br>
                <router-link to='/cat' class=lis>分类目录</router-link><br><br>
                <router-link to='/prule' class=lis>玩法规则</router-link><br><br>
                <router-link to='/psearch' class=lis>搜索</router-link><br><br>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>

export default {
    name:"mainToolCard",
    data(){
        return{
            activeNames:[],
            quest:'',
            head:this.$store.state.head
        }
    },
    events:{
        'changeHead':'changeHead'
    },
    methods:{
        changeHead(){
            this.head=this.$store.state.head
        }
    },
}
</script>

<style>
    .tran{font-size:20px;color:grey}
    .lis{color:rgb(0, 132, 255)}
    .back{color:gainsboro}
</style>