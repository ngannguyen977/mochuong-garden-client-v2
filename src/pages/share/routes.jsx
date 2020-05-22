import React from 'react';
import Home from '../home';
import ProductsPage from '../products';
import CategoryPage from '../categories';


const routes = [
    {
        path: '/',
        exact: true,
        main:() =><Home />
    },
    {
        path: '/products',
        exact: false,
        main:({match}) =><ProductsPage match={match}/>
    },
    {
        path: '/categories',
        exact: false,
        main:() =><CategoryPage />
    },

]
export default routes;
// match khi có id trên URL