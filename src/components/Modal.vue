<template>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="modalChange" width="30%">
        <slot name="content"></slot>
        <!-- <div slot="footer" class="dialog-footer" v-if="correct">
            <el-button @click="modalChange">取 消</el-button>
            <el-button type="primary" @click="modalChange">确 定</el-button>
        </div>
        <div slot="footer" class="dialog-footer" v-if="reset">
            <el-button @click="modalChange">确 定</el-button>
            <el-button type="danger" @click="resetForm">重 置</el-button>
        </div> -->
        <slot name="footer"></slot>
    </el-dialog>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            title: {
                type: String
            },
            dialogFormVisible: {
                type: Boolean
            }
        },
        methods: {
            modalChange () {
                this.$emit('modalToggle')
            },
            resetForm () {
                this.$emit('resetEvent')
            }
        }
    }
</script>

<style scoped>
 
</style>
