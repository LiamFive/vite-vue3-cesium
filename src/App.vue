<script setup>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
const locale = zhCN;
</script>

<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
