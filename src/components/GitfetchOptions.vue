<script>
export default {
    data() {
        return {
            name: 'Sr Empaminondas',
            login: 'mrplaceholder781781',
            bio: 'A world betwixt',
            company: 'Something',
            avatarLink: 'https://pm1.aminoapps.com/7837/40ede1286422984800a766685e2e3a4f09d93102r1-778-801v2_00.jpg',
            searchInput: ''
        }
    },
    methods: {
        async obterUser(){
            const response = await fetch(`https://api.github.com/users/${this.searchInput}`);
            const { login, name, bio, company, avatar_url } = await response.json();

            this.name = name;
            this.login = login;
            this.bio = bio;
            this.company = company;
            this.avatarLink = avatar_url;
        }
    }
};
</script>

<template>
    <h2>Superobtenedor de Dados Github</h2>
            <input type="text" v-model="searchInput">
            <button v-on:click="obterUser">Buscar Usuario</button>
            <div class="thumb">
                <img v-bind:src="avatarLink" alt="Thumb User">
            </div>
            <div class="rest">
                <strong>@{{ login }}</strong>
                <h1>{{ name }}</h1>
                <h1> {{ company }} </h1>
                <span> {{ bio }} </span>
            </div>
            
</template>

<style>
.thumb{
    display: grid;
    place-items: center;
    
}
</style>