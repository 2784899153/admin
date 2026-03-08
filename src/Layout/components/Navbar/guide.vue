<template>
  <div class="">
    <el-tooltip :content="$t('msg.navBar.guide')">
      <svg-icon icon="guide" @click="onClick" id="guide-start"></svg-icon>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import steps from '@/utils/steps'

const i18n = useI18n()
let driverObj: any

const onClick = () => {
  driverObj.setSteps(steps(i18n))
  driverObj.drive()
}

onMounted(() => {
  driverObj = driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev'),
    doneBtnText: i18n.t('msg.guide.close')
  })
})

// driverObj.drive()
</script>

<style scoped></style>
