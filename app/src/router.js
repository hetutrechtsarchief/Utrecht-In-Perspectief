import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/Home'
import DrieLuik from '@/pages/DrieLuik'
import Detail from '@/pages/Detail'
import Colofon from '@/pages/Colofon'

Vue.use(Router)


export default new Router({
    
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
            path: '/Detail/:gebouw',
            name: 'Detail',
            component: Detail
        },
        {
            path: '/Colofon/',
            name: 'Colofon',
            component: Colofon
        }
    ]
})
