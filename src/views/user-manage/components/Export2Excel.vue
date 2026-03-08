<template>
  <el-dialog v-model="dialogVisible" title="导出" width="500" @close="handleClose">
    <el-input></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" :loading="loading" @click="handleConfirm"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { getUserManageAllList } from '@/api/user'
import { ref } from 'vue'

const dialogVisible = defineModel<boolean>({
  default: true
})

const loading = ref(false)

// 数据对应表
const USER_RELATIONS = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'role',
  开通时间: 'openTime'
}

// 将数组转化为二维数组
const formatJson = (headers, rows) => {
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map((role) => role.title))
      }
      return item[headers[key]]
    })
  })
}

const handleClose = () => {
  dialogVisible.value = false
}
const handleConfirm = async () => {
  loading.value = true
  const excel = await import('@/utils/Export2Excel')
  const allUser = (await getUserManageAllList()).data.list

  const data = formatJson(USER_RELATIONS, allUser)
  excel.export_json_to_excel({
    header: Object.keys(USER_RELATIONS),
    data,
    filename: '默认名',
    autoWidth: true,
    bookType: 'xlsx'
  })
  handleClose()
}
</script>

<style scoped></style>
