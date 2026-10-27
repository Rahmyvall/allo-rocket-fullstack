import { createRouter, createWebHistory } from 'vue-router'
import RocketListView from '../views/RocketListView.vue'
import RocketDetailView from '../views/RocketDetailView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'rockets', component: RocketListView },
    { path: '/rockets/:id', name: 'rocket-detail', component: RocketDetailView, props: true },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior: () => ({ top: 0 })
})
