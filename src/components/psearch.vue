<template>
    <div>
        <br>
        <van-form @submit="onSubmit">
            <van-field
                v-model="quest"
                name="upss"
                placeholder="搜索"
                border
                class=back
            >
                <template #button>
                    <van-button size="mini" icon="search"/>
                </template>
            </van-field>
        </van-form>
        
        <van-collapse v-model="activeNames">
            <van-collapse-item :name="index" v-for="(item, index) in showask" :key="index">
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
    name:'psearch',
    data(){
        return{
            activeNames:[],
            quest:'',
            askdata:[],
            showask:[]
        }
    },
    methods:{
        onSubmit(v){
            axios.post('psearch',{
                quest:v.upss
            }).then(res=>{
                
                this.askdata = res.data
                this.showask = this.askdata
            })
        }
        
    },
    mounted:function(){
        
    }
}
</script>
<style>

</style>