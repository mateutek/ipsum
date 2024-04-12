// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Main.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'polski',
        name: 'Polish',
        component: () => import(/* webpackChunkName: "home" */ '@/layouts/default/View.vue'),
        children: [
          {
            path: '',
            name: 'Base',
            component: () => import(/* webpackChunkName: "home" */ '@/views/Polish.vue'),
          }
        ]
      },
      {
        path: 'matematyka',
        component: () => import('@/layouts/default/View.vue'),
        children: [
          {
            path: '',
            redirect: '/matematyka/dodawanie/1',
          },
          {
            path: "dodawanie/:level",
            name: "addition",
            component: () => import(/* webpackChunkName: "divide" */ "@/views/Addition.vue"),
          },
          {
            path: "dzielenie/:level",
            name: "divide",
            component: () => import(/* webpackChunkName: "divide" */ "@/views/Divide.vue"),
          },
          {
            path: "mnozenie/:level",
            name: "multiply",
            component: () =>
              import(/* webpackChunkName: "multiply" */ "@/views/Multiply.vue"),
          },
        ],
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
