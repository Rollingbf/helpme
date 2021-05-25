<template>
    <div>
        <div>
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
            <van-grid v-if="isAdmin" clickable :column-num="3">
                <van-grid-item @click="adspace" text="管理员后台" />
                <van-grid-item @click="ppost" text="投稿后台" />
                <van-grid-item @click="logOut" text="登出" />
            </van-grid>
            <van-grid v-if="!isAdmin" clickable :column-num="2">
                <van-grid-item @click="ppost" text="投稿后台" />
                <van-grid-item @click="logOut" text="登出" />
            </van-grid>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"pcard",
    data(){
        return{
            head:this.$store.state.head,
            isAdmin:this.$store.state.isAdmin
        }
    },
    methods:{
        logOut(){
            console.log('closeCard')
            this.$store.commit('GET_PCARD',0)
            window.sessionStorage.head=''
            this.$root.$emit('global::changeHead')            
            this.$router.go(0)
        },
        pspace(){
            this.$router.push({name:'pspace'})
        },
        adspace(){
            this.$router.push({name:'adspace'})
        },
        ppost(){
            this.$router.push({name:'ppost'})
        }
    }
}
</script>
<style>
.back{background-color: white;}
</style>