import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView from '../views/pk/Pk_indexView.vue'
import RanklistIndexView from '../views/ranklist/Ranklist_indexView.vue'
import RecordIndexView from '../views/record/Record_indexView.vue'
import UserbotIndexView from '../views/user/bots/Userbot_indexView.vue'
import NotFound from '../views/error/NotFound.vue'

const routes = [
    {
        path: "/",
        name: "homepage",
        redirect: "/pk/"
    },
    {
        path: "/pk/",
        name: "pk_index",
        component: PkIndexView
    },
    {
        path: "/ranklist/",
        name: "ranklist_index",
        component: RanklistIndexView
    },
    {
        path: "/record/",
        name: "record_index",
        component: RecordIndexView
    },
    {
        path: "/user/bot/",
        name: "user_bot_index",
        component: UserbotIndexView
    },
    {
        path: "/404/",
        name: "404",
        component: NotFound
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/404/"
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
