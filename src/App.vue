<script setup>
import Gitfetch from './components/Gitfetch.vue';
//import Something from './components/Something.vue';
import Header from './components/Header.vue';
//import GitfetchOptions from './components/GitfetchOptions.vue';

</script>

<template>

  <Header />
  <div class="main-thing">
    <Gitfetch />
  </div>

  <footer class="m-0 the-footer">
    <div class="bg-red-600 flex justify-between items-center footer-container">
      <div class="ml-2 footer-logo">
        <strong>BriGit List </strong> - Seu portal para perfis e repositórios do Github
      </div>
      <div class="m-4 pr-2 footer-details">
        <div class="grid grid-cols-2 grid-rows-2">
          <div class="m-1 p-1"><a href="#">Home</a></div>
          <div class="m-1 p-1"><a href="#">About</a></div>
          <div class="m-1 p-1"><a href="#">Help</a></div>
          <div class="m-1 p-1"><a href="#">Info</a></div>
        </div>
      </div>
    </div>
  </footer>

</template>

<style>
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body{
    background-color: #1c1a1d;
    color:#e5e5e5;
  }
  #app{
    /*margin: 0 auto;*/
    min-height: 100vh;
    /*max-width: 40rem;*/
    font-family: Arial, Helvetica, sans-serif;

  }
  input, button{
    max-width: 20rem;
    padding: .5rem;
  }
  input{
    background-color: #1c1a1d;
    border: 1px solid rgb(239 68 68);;
    border-radius: .25rem;
    color: #e5e5e5;
    margin: 1rem 1rem 1rem 0;
  }
  span{
    display: block;
    margin: 1rem auto;
  }
  button{
    border: 1px solid rgb(239 68 68);;
    background-color: rgb(239 68 68);;
    border-radius: 0.5rem;
    color: white;
  }
  .main-thing{
    min-height: 100vh;
  }
</style>