import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/Home'
import DrieLuik from '@/pages/DrieLuik'
import Colofon from '@/pages/Colofon'

Vue.use(Router)


export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/DrieLuik/:gebouw',
            name: 'DrieLuik',
            component: DrieLuik,
           
        },
        {
            path: '/Colofon/',
            name: 'Colofon',
            component: Colofon
        }
    ]
})
