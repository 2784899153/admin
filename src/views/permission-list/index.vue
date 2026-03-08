<template>
  <div class="">
    <el-card>
      <el-table
        :data="allpermission"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="permissionName" :label="$t('msg.permission.name')" width="180">
        </el-table-column>
        <el-table-column prop="permissionMark" :label="$t('msg.permission.mark')" width="180">
        </el-table-column>
        <el-table-column prop="permissionDesc" :label="$t('msg.permission.desc')">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { permissionList } from '@/api/permission'
const allpermission = ref([])
const getPermissionList = async () => {
  const { data } = await permissionList()

  allpermission.value = data
}

onMounted(() => {
  getPermissionList()
})
</script>

<style lang="scss" scoped></style>
