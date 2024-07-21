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
    <RouterView v-slot="{ Component }">
      <Transition appear mode="out-in" name="fade">
        <Component :is="Component" />
      </Transition>
    </RouterView>
    <NotivueProvider />
  </NaiveProvider>
</template>

<style>

</style>
