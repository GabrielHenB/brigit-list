<script setup>
//Isso usa a Composition API
import { reactive, ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import UserCard from './UserCard.vue';
import UserRepos from './UserRepos.vue';

const reposAmount = computed(() => {
    //Isso sera cached e reactable

    return state.repos.length > 0 ? `Possui ${state.repos.length} repositórios públicos` : "não possui repositorios publicos no momento";
});

const route = useRoute();

const state = reactive({
    name: 'Sr Empaminondas',
    login: '',
    bio: 'A world betwixt',
    company: 'Something',
    avatarLink: 'https://pm1.aminoapps.com/7837/40ede1286422984800a766685e2e3a4f09d93102r1-778-801v2_00.jpg',
    repos: [],
    searchInput: (route.params.id) ? route.params.id : ''
});

const errorContainer = ref('');

function handleForm(evento){
    evento.preventDefault();
    state.login = ''; //melhorar depois isso aqui
    obterUser();
}

async function obterUser(){
            //evento.preventDefault();
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
                errorContainer.value = error.message;
                //console.log(errorContainer);
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

onMounted(() => {
    //Roda quando o componente eh montado.
    if(state.searchInput !== '') obterUser();
});

</script>
<template>
    <div class="mx-auto px-4">
        <h2 class="m-2 top-title">Superobtenedor de Dados Github</h2>

        <div class="text-center right-0">
            <form action="" @submit="handleForm" class="gitform">
                <input class="w-600" type="text" v-model="state.searchInput">
                <button v-on:click="handleForm">Buscar Usuario</button>
            </form>
        </div>
        
        
        <div v-if="state.login !== ''" class="grid grid-cols-2">
            <section class="user-details">
                <UserCard :avatarLink="state.avatarLink" :login="state.login" :name="state.name" :bio="state.bio" :company="state.company" />
            </section>
            <section v-if="state.repos.length > 0" >
                <h1 class="small bg-red-700 m-2 p-2">O {{ state.name }} {{ reposAmount }}.</h1>
                <UserRepos v-for="repository of state.repos" 
                :html_url="repository.html_url"
                :full_name="repository.full_name"
                :description="repository.description" 
                 />
            </section>
        </div> 
        <div class="mt-3 text-center" v-else>
            <div class="p-4 bg-red-500" v-if="errorContainer.length > 0">
                <img class="text-center w-52 mx-auto" src="https://media.tenor.com/gMJc9aJxtzYAAAAi/cry-menhera.gif" alt="404 Error">
                <h1 >Ocorreu um erro durante a pesquisa!</h1>
                <p>{{ errorContainer }}</p>
            </div>
            <div class="p-4 bg-red-500" v-else>
                <img class="text-center w-52 mx-auto" src="https://media.tenor.com/jsIerQKVQaUAAAAi/slap-table.gif" alt="404 Error">
                <h1 >No momento não há perfil sendo exibido! Digite uma pesquisa!</h1>
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

<style scoped>
.top-title{
    font-family: Arial;
    font-size: 15pt;
    letter-spacing: 2pt;
    text-align: center;
    text-shadow: 1px black;
}
</style>