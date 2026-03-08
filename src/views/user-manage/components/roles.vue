<template>
  <el-dialog v-model="dialogVisible" title="Tips" width="500" @close="handleClose">
    <el-checkbox-group v-model="useRoleTitleList">
      <el-checkbox v-for="item in allRoleList" :key="item.id" :label="item.username"></el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onConfirm"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { getUserManageAllList, userRoles, updateRole } from '@/api/user'
import { ref, watch } from 'vue'
const dialogVisible = defineModel<boolean>({
  default: true
})
const props = defineProps<{
  userId: string
}>()

const emit = defineEmits<{
  (e: 'success', data: { status: boolean }): void
}>()

// 所有角色
const allRoleList = ref([])

const getListData = async () => {
  allRoleList.value = (await getUserManageAllList()).data.list
  console.log('???', allRoleList.value)
}

getListData()

const useRoleTitleList = ref([])
// 获取当前用户角色
const getUserRoles = async () => {
  const res = await userRoles(props.userId)
  useRoleTitleList.value = res.data.role.map((item) => item.title)
}
watch(
  () => props.userId,
  (val) => {
    if (val) getUserRoles()
  }
)

const handleClose = () => {}

const onConfirm = () => {
  dialogVisible.value = false
  emit('success', { status: true })
}
</script>

<style scoped></style>
