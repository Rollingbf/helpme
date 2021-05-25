<template>
    <div>
        <van-grid clickable :column-num="2">
            <van-grid-item text="注册" to="/reg" />
            <van-grid-item  text="登陆" to="/login"/>
        </van-grid>
    </div>
</template>
<script>
export default {
    name:"pcardOut",
    data(){
        return{
        }
    },
    methods:{
    }
}
</script>
<style scoped>

</style>