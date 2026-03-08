<template>
  <div class="">
    <el-card>
      <el-table :data="allRoleList" border style="width: 100%">
        <el-table-column :label="$t('msg.role.index')" type="index" width="120"> </el-table-column>
        <el-table-column :label="$t('msg.role.name')" prop="title"> </el-table-column>
        <el-table-column :label="$t('msg.role.desc')" prop="describe"> </el-table-column>
        <el-table-column
          :label="$t('msg.role.action')"
          prop="action"
          width="260"
          #default="{ row }"
        >
          <el-button
            type="primary"
            size="small"
            @click="onDistributePermissionClick(row)"
            v-permission="['distributePermission']"
          >
            {{ $t('msg.role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <DistributePerssion v-model="visible" :role-id="selectRoleId" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { roleList } from '@/api/role'
import DistributePerssion from './components/DistributePerssion.vue'

const allRoleList = ref([])
const getRoleList = async () => {
  const { data } = await roleList()
  allRoleList.value = data
  console.log('看看数据', data)
}

const visible = ref(false)
const selectRoleId = ref('')
const onDistributePermissionClick = (row) => {
  selectRoleId.value = row.id
  visible.value = true
}

onMounted(() => {
  getRoleList()
})
</script>

<style lang="scss" scoped></style>
