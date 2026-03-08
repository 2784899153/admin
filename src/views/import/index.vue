<template>
  <UploadExecl :onSuccess="onSuccess" />
</template>

<script setup lang="ts">
import UploadExecl from '@/components/UploadExecl/index.vue'
import { useBatchImport } from '@/api/user'
import {} from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

// 数据对应表
const USER_RELATIONS = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'role',
  开通时间: 'openTime'
}

// const formatDate = (numb) => {
//   const time = new Date((numb - 1) * 24 * 3600000 + 1)
//   time.setYear(time.setFullYear - 70)
// }

const generateData = (results: any) => {
  const arr = []
  results.forEach((item: any) => {
    const userInfo = {}
    Object.keys(item).forEach((key) => {
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}

const router = useRouter()

const onSuccess = async ({ header, results }) => {
  const updateData = generateData(results)
  await useBatchImport(updateData)
  ElMessage.success('上传成功')
  router.push('/user/manage')
}
</script>

<style lang="scss" scoped></style>
