<template>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="500"
    @close="handleClose"
    @opened="handleOpend"
  >
    <el-tree
      ref="treeRef"
      style="max-width: 600px"
      :data="allPermission"
      :props="defaultProps"
      node-key="id"
      show-checkbox
      default-expand-all
    />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleConfirm"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { permissionList } from '@/api/permission'
import { rolePermission, setRole } from '@/api/role'
import { ref, useTemplateRef } from 'vue'
const dialogVisible = defineModel<boolean>({
  default: false
})

const props = defineProps<{
  roleId: string
}>()

const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

const allPermission = ref([])
const getAllPermission = async () => {
  allPermission.value = (await permissionList()).data
  //   console.log('看一眼', allPermission.value)
}
getAllPermission()

const treeRef = useTemplateRef('treeRef')

// 获取当前用户权限
const getRolePermission = async () => {
  const data = await rolePermission(props.roleId)
  treeRef.value.setCheckedKeys(data.data)
}

const handleOpend = () => {
  getRolePermission()
}

const handleConfirm = async () => {
  dialogVisible.value = false
  //   getCheckedKeys
  await setRole({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
}
const handleClose = () => {}
</script>

<style scoped></style>
