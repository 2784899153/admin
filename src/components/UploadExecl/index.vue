<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>
    <input
      ref="excelUploadInput"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <el-icon :size="60" style="display: block"><Promotion /></el-icon>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, useTemplateRef } from 'vue'
import XLSX from 'xlsx'

interface ExeclData {
  header: string[]
  results: any[]
}

const props = defineProps<{
  beforeUpload?: (file: File) => boolean | File
  onSuccess?: (data: ExeclData) => void
}>()

// 点击上传
const loading = ref<boolean>(false)
const excelUploadInput = useTemplateRef<HTMLInputElement>('excelUploadInput')
const handleUpload = () => {
  excelUploadInput.value?.click()
}

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files

  if (!files || files.length === 0) return
  const rawFile = files[0]
  if (rawFile) {
    upload(rawFile)
  }
}
const upload = (rawFile: File) => {
  // 如果没有钩子，直接读取
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }
  const before = props.beforeUpload(rawFile)
  if (before === true) {
    readerData(before)
  } else if (before instanceof File) {
    readerData(before)
  }
}

const readerData = (rawFile: any) => {
  loading.value = true
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = (e: any) => {
      // 1. 获取解析到的数据
      const data = e.target.result
      // 2. 利用XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })

      // 3. 获取第一张表的名字
      const firstSheetName = workbook.SheetNames[0]!
      // 4. 获取第一张sheet数据
      const worksheet = workbook.Sheets[firstSheetName]!
      // 5. 解析数据表头
      const header = getHeaderRow(worksheet)
      // 6. 解析数据体
      const results = XLSX.utils.sheet_to_json(worksheet)
      // 7. 传入解析之后的数据
      generateData({ header, results })
      // 8. loading
      loading.value = false
      // 9.异步完成
      resolve(true)
    }
    reader.readAsArrayBuffer(rawFile)
  })
}

const getHeaderRow = (sheet: any) => {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r
  for (C = range.s.c; C < range.e.c; ++C) {
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    let hdr = 'UNKNOWN' + C
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

const generateData = (excelData: any) => {
  props.onSuccess && props.onSuccess(excelData)
}

// 拖拽

// 拖拽文本时触发
const handleDrop = (e: any) => {
  if (loading.value) return
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('必须要有一个文件')
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('文件格式必须为Excel')
    return false
  }
  upload(rawFile)
}

// 拖拽悬停时触发
const handleDragover = (e: any) => {
  // 控制鼠标指针样式
  e.dataTransfer.dropEffect = 'copy'
}

const isExcel = (files: any) => {
  return /\.(xlsx|xls|csv)$/.test(files.name)
}
</script>

<style scoped lang="scss">
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  width: 100%;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #bbb;
  }
}
</style>
