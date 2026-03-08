<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary" @click="onImportExcelClick">{{
          $t('msg.excel.importExcel')
        }}</el-button>
        <el-button type="success" @click="exportToExcelClick">{{
          $t('msg.excel.exportExcel')
        }}</el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="username" :label="$t('msg.excel.name')"> </el-table-column>
        <el-table-column prop="mobile" :label="$t('msg.excel.mobile')"> </el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image class="avatar" :src="row.avatar"></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="small">{{ item.title }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="small">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.action')" fixed="right" width="260">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="onShowRolesVisible(row._id)">{{
              $t('msg.excel.show')
            }}</el-button>
            <!--               v-permission="['distributeRole']" -->
            <el-button type="info" size="small" @click="onShowRolesVisible(row)">{{
              $t('msg.excel.showRole')
            }}</el-button>
            <el-button type="danger" size="small" @click="onShowRolesVisible(row)">{{
              $t('msg.excel.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table></el-card
    >
    <Export2Excel v-model="dialogVisible" />
    <Roles v-model="RolesVisible" :user-id="selectUserId" @success="onSuccess" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onActivated, watch } from 'vue'
import { getUserManageList } from '@/api/user'
import { useRouter } from 'vue-router'
import Export2Excel from './components/Export2Excel.vue'
import Roles from './components/roles.vue'

const router = useRouter()

const tableData = ref([])
const total = ref(0)
const pageInfo = ref({
  page: 1,
  size: 2
})
const getListData = async () => {
  const { data } = await getUserManageList(pageInfo.value)
  tableData.value = data.list
  pageInfo.value = {
    page: data.page,
    size: data.size
  }
  total.value = data.total
  console.log('看看', data)
}

// 导入
const onImportExcelClick = () => {
  router.push('/user/import')
}

const onShowClick = () => {}
// 当该组件 重新显示时触发
onActivated(getListData)

// excel导出
const dialogVisible = ref(false)

const exportToExcelClick = () => {
  dialogVisible.value = true
  console.log('???', dialogVisible.value)
}

// 权限
const RolesVisible = ref(false)
const selectUserId = ref('')
const onShowRolesVisible = (item) => {
  selectUserId.value = item.id
  RolesVisible.value = true
}
watch(RolesVisible, (val) => {
  if (!val) {
    selectUserId.value = ''
  }
})

const onShowRoleClick = () => {}

const onSuccess = (status: boolean) => {
  console.log('111', status)
}

onMounted(() => {
  getListData()
})
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  :deep(.avatar) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  :deep(.el-tag) {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
