export let cfg = {
    apiUrl: 'http://basnakk.duckdns.org:5984',
    tokenName: 'token',
    indicadores: '/indicadores',
    user: {
        login: '/auth_login/_all_docs?limit=20&include_docs=true',
        refresh:'/auth_refresh/_all_docs?limit=20&include_docs=true',
        users: '/users',
        usersSocios: '/users_socios',
        usersProveedores: '/users_proveedores',
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
    indicadores: '/indicadores',
    user: {
        login: 'usuario/usuarioApp',
        refresh: '/auth_refresh/_all_docs?limit=20&include_docs=true',
        users: '/users',
        usersSocios: '/users_socios',
        usersProveedores: '/users_proveedores',
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