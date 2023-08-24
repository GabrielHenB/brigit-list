<script setup>
defineProps(['html_url','full_name','description']);
</script>
<template>
    <article class="m-2 p-4 bg-black rounded">
        <h2 class="repos-name"><a :href="html_url">{{ full_name }}</a></h2>
        <p class="repos-desc">{{ description }}</p>
        <a :href="html_url" target="_blank" class="bg-red-600 p-1 mt-1 rounded">Leia Mais</a>
    </article>
</template>
<style scroped>
.repos-name{
    font-size: 14pt;
    font-family: Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    margin: 1px;
}
.repos-desc{
    margin-left: 1px;
}
</style>