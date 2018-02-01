
export let cfg = {
    apiUrl: 'http://basnakk.duckdns.org:5984',
    apiUrlWp: 'https://www.mts.cl/wp-json/wp/v2',
    urlLogoFallback: '/ferreterias/5/',
    tokenName: 'token',
    indicadores: '/indicadores',
    user: {
        login: '/auth_login/_all_docs?limit=20&include_docs=true',
        refresh: '/auth_refresh/_all_docs?limit=20&include_docs=true',
        users: '/users',
        usersSocios: '/users_socios',
        usersProveedores: '/users_proveedores',
    },
    ferreterias: '/ferreterias',
    proveedores: '/proveedores',
    productos: '/productos',
    productostop: '/productos_top',
    noticias: '/posts',
    media: '/media',
    informercial: '/inforcomercial',
    eventos: '/eventos'
};/*
export let cfg = {
    apiUrl: 'http://wsp.mts.cl/app/index.php?',
    apiUrlProduccion: 'https://www.mts.cl/wp-json/wp/v2',
    tokenName: 'token',
    indicadores: '/indicadores',
    user: {
        login: '/Auth/login',
        refresh: '/Auth/refresh',
        users: '/users',
        usersSocios: '/Users/socios',
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
