<script setup lang="ts">
useHead({
  title: import.meta.env.VITE_APP_NAME,
  meta: [
    { name: 'description', content: import.meta.env.VITE_APP_DESCRIPTION },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})
</script>

<template>
  <NaiveProvider>
    <RouterView />
    <NotivueProvider />
  </NaiveProvider>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html,
body {
  background: linear-gradient(to bottom, #d6dbdc, #ffffff);
  color: #1a1a1a;
}

.dark html,
.dark body {
  background: linear-gradient(to bottom, #383838, #000000);
  color: #dadada;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: auto;
}
</style>
