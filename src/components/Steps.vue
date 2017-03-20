<template>
    <div>
        <br>
        <div class="steps">
            <step background-color='#fbf9fe' v-model="cur">
                <step-item title="登录"></step-item>
                <step-item title="选择节点"></step-item>
                <step-item title="上网"></step-item>
            </step>
        </div>
    </div>
</template>
<script>
    import {Step, StepItem} from 'vux'
    export default {
        components: {
            Step,
            StepItem
        },
        props: ['cur'],
        data(){
            return {
//        step: cur
            }
        },
        methods: {}
    }
</script>
<style scoped>
    .steps {
        width: 95%;
        margin: 0 auto;
    }
</style>
