<template>
   <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="modalChange" width="30%">
        <slot name="content"></slot>
        <div slot="footer" class="dialog-footer">
            <el-button @click="modalChange">取 消</el-button>
            <el-button type="primary" @click="modalChange">确 定</el-button>
        </div>
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
            }
        }
    }
</script>

<style scoped>
 
</style>
