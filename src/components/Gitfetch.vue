<script setup>
//Isso usa a Composition API
import { reactive, computed } from 'vue';

const reposAmount = computed(() => {
    //Isso sera cached e reactable

    return state.repos.length > 0 ? `Possui ${state.repos.length} repositórios públicos` : "não possui repositorios publicos no momento";
});

const state = reactive({
    name: 'Sr Empaminondas',
    login: '',
    bio: 'A world betwixt',
    company: 'Something',
    avatarLink: 'https://pm1.aminoapps.com/7837/40ede1286422984800a766685e2e3a4f09d93102r1-778-801v2_00.jpg',
    repos: [],
    searchInput: ''
});

async function obterUser(evento){
            evento.preventDefault();
            try{
                const response = await fetch(`https://api.github.com/users/${state.searchInput}`);

                if(response.status < 200 || response.status >= 300){

                    throw new Error("Erro no fetch, status = " + response.status);
                }
                else{
                const { login, name, bio, company, avatar_url } = await response.json();

                state.name = name;
                state.login = login;
                state.bio = bio;
                state.company = company;
                state.avatarLink = avatar_url;

                obterRepos(state.login);
                }
            }catch(error){
                console.log(error);
            }
            
}

async function obterRepos(user){
    const response = await fetch(`https://api.github.com/users/${user}/repos`);
    if(response.status < 200 || response.status >= 300){
        throw new Error("Erro no fetch de repositório de status = " + response.status);
    }else{
        const repositorio = await response.json();
        state.repos = repositorio; 
    }
}

</script>
<template>
    <div class="mx-auto px-4">
        <h2 class="m-2 top-title">Superobtenedor de Dados Github</h2>

        <div class="text-center right-0">
            <form action="" @submit="obterUser" class="gitform">
                <input class="w-600" type="text" v-model="state.searchInput">
                <button v-on:click="obterUser">Buscar Usuario</button>
            </form>
        </div>
        
        
        <div v-if="state.login !== ''" class="grid grid-cols-2">
            <section class="user-details">
                <div class="bg-red-700 m-5 p-4 rounded">
                    <div class="thumb">
                        <img v-bind:src="state.avatarLink" class="mb-4 rounded border-4 border-black" alt="Thumb User">
                    </div>
                    <div class="desc bg-black mx-auto rounded">
                        <strong>@{{ state.login }}</strong>
                        <h1>{{ state.name }}</h1>
                        <h1> {{ state.company }} </h1>
                        <span> {{ state.bio }} </span>
                    </div>
                </div>
                
            </section>
            <section v-if="state.repos.length > 0" >
                <h1 class="small bg-red-700 m-2 p-2">O {{ state.name }} {{ reposAmount }}.</h1>
                <article class="m-2 p-4 bg-black rounded" v-for="repository of state.repos">
                    <h2 class="repos-name"><a :href="repository.html_url">{{ repository.full_name }}</a></h2>
                    <p class="repos-desc">{{ repository.description }}</p>
                    <a :href="repository.html_url" target="_blank">Leia Mais</a>
                </article>
            </section>
        </div> 
        <div class="mt-3 text-center" v-else>
            <div class="p-4 bg-red-500">
                <h1 >404 - No momento não há perfil sendo exibido! Digite uma pesquisa!</h1>
                
                <img class="text-center w-52 mx-auto" src="https://media.tenor.com/gMJc9aJxtzYAAAAi/cry-menhera.gif" alt="404 Error">
                
                
            </div>
            
            <div class="grid grid-cols-2">
                <div class="bg-black m-5 p-4 rounded">
                    <p class="text-center">
                        Para encontrar um perfil do GitHub digite o nome de usuário "@" no formulário acima!
                    </p>
                </div>
                <div class="bg-black m-5 p-4 rounded">
                    <p class="text-center">
                        O BentriGit é um simples app para encontrar perfis do Github e seus repositórios!
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.top-title{
    font-family: Arial;
    font-size: 15pt;
    letter-spacing: 2pt;
    text-align: center;
    text-shadow: 1px black;
}
.desc{
    text-align: center;
}
.repos-name{
    font-size: 14pt;
    font-family: Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    margin: 1px;
}
.repos-desc{
    margin-left: 1px;
}
.thumb{
    display: grid;
    place-items: center;
}
.thumb img{
    max-width: 300px;
    width: 100%;
}
</style>