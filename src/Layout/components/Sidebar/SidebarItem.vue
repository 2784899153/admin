<template>
  <template v-if="route.children?.length > 0">
    <el-menu-item v-if="route.children?.length === 1" :index="route.path">
      <MenuItem :title="route.children[0].meta?.title" :icon="route.children[0].meta.icon" />
    </el-menu-item>
    <el-sub-menu v-else :index="route.path">
      <template #title>
        <MenuItem :title="route.meta.title" :icon="route.meta.icon" />
      </template>
      <sidebar-item v-for="item in route.children" :key="item.path" :route="item" />
    </el-sub-menu>
  </template>

  <el-menu-item v-else :index="route.path">
    <MenuItem :title="route.meta.title" :icon="route.meta.icon" />
  </el-menu-item>
</template>

<script setup lang="ts">
import MenuItem from './MenuItem.vue'
defineProps<{
  route: {
    path: string
    name?: string
    [key: string]: any
  }
}>()
</script>

<style scoped></style>
