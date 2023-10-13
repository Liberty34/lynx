<template>
  <HeroSection />
</template>
<script setup lang="ts">
// definePageMeta({
//   middleware: 'auth'
// })
useHead({
  title: "Lynx : URL shortener",
  meta: [
    {
      name: "author",
      content: "Liberty Mutabvuri",
    },
    {
      name: "description",
      content: "Lynx, the best link shortener for free",
    },
    {
      name: "keywords",
      content: "Lynx, Link Shortener",
    },
  ],
});
</script>
