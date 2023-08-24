<script setup>
defineProps(['avatarLink','login','name','company','bio']);
</script>
<template>
    <div class="bg-red-700 m-5 p-4 rounded">
                    <div class="thumb">
                        <img v-bind:src="avatarLink" class="mb-4 rounded border-4 border-black" alt="Thumb User">
                    </div>
                    <div class="desc bg-black mx-auto rounded">
                        <strong>@{{ login }}</strong>
                        <h1>{{ name }}</h1>
                        <h1> {{ company }} </h1>
                        <span> {{ bio }} </span>
                    </div>
                </div>
</template>
<style scoped>
.thumb{
    display: grid;
    place-items: center;
}
.thumb img{
    max-width: 300px;
    width: 100%;
}
.desc{
    text-align: center;
}
</style>