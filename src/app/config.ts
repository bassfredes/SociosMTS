export let cfg = {
    apiUrl: 'http://basnakk.duckdns.org:5984',
    tokenName: 'token',
    indicadores: '/indicadores',
    user: {
        register: '/auth/signup',
        login: '/auth_login/_all_docs?limit=20&include_docs=true',
        refresh:'/auth_refresh/_all_docs?limit=20&include_docs=true',
        users: '/users',
    },
    ferreterias: '/ferreterias',
    proveedores: '/proveedores',
    productos: '/productos',
    productostop: '/productos_top',
    noticias: '/noticias',
    informercial: '/inforcomercial',
    eventos: '/eventos'
};
/*
export let cfg = {
    apiUrl: 'http://wsp.mts.cl/app/index.php?/',
    tokenName: 'token',
    user: {
        register: '/auth/signup',
        login: 'usuario/usuarioApp',
        refresh:'/auth_refresh/_all_docs?limit=20&include_docs=true',
    },
    ferreterias: '/ferreterias',
    proveedores: '/proveedores',
    productos: '/productos',
    productostop: '/productos_top',
    noticias: '/noticias',
    informercial: '/inforcomercial',
    eventos: '/eventos'
};
*/
