<template>
    <div>
    <Seel></Seel>
        <div style="margin: 16px;">
            <van-button round block type="info" @click="onSubmit">
                提交
            </van-button>
        </div>
    </div>
</template>

<script>
import Seel from './scriptEditorEl.vue'

export default {
    name:"scripteditor",
    components:{
        Seel
    },
    methods: {
        onSubmit(values) {
        console.log(values);
        },
    }
}
</script>

<style scoped>

</style>