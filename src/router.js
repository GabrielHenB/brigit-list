import { createRouter, createWebHistory } from 'vue-router';

//Components
import Home from './routes/Home.vue';
import About from './routes/About.vue';
import Projects from './routes/Projects.vue';
import NotFound from './routes/NotFound.vue';
//End Components

const theRoutes = [
    {path: '/', component: Home},
    {path: '/about', component: About},
    {path: '/projs', component: Projects},
    
]

const router = createRouter({
    history: createWebHistory(),
    routes: theRoutes
});

export default router;