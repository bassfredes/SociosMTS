export let cfg = {
    apiUrl: 'http://192.168.1.143:5984',
    /*apiUrl: 'http://books.prodio.bg/api',*/
    tokenName: 'token',
    user: {
        register: '/auth/signup',
        login: '/auth_login/_all_docs?limit=20&include_docs=true',
        refresh:'/auth_refresh/_all_docs?limit=20&include_docs=true',
    },
    ferreterias: '/ferreterias',
    proveedores: '/proveedores',
    noticias: '/noticias',
    books: '/books'
};
