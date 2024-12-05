<script setup lang="ts">
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus';
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }" style="--el-text-color-hover: red">
      <span class="breadcrumb-item"> Сценарии </span>
    </el-breadcrumb-item>
    <el-breadcrumb-item style="--el-text-color-regular: #909399"
      >Новый сценарий</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<style scoped>
.breadcrumb-item {
  font-weight: 500;
}
</style>
