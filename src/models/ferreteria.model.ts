export var ferreteriaModel:any = {
    _id: "",
    _rev: "",
    isActive: false,
    nombre: "",
    indicadores: {
        info: {
            date: "",
        },
        nps: {
            locales: [{
                nombre_local: "",
                rango_fecha: {
                    primera: "",
                    segunda: ""
                },
                total: 0,
                p: 0,
                d: 0,
                n: 0
            }]
        },
        ivs: {
            puntaje: 0,
            tendencia: "",
            tamano: 0,
            tamano_tendencia: "",
            penetracion: 0,
            penetracion_tendencia: "",
            crecimiento: 0,
            crecimiento_tendencia: "",
            credito: 0,
            credito_tendencia: "",
            participacion: 0,
            participacion_tendencia: "",
        },
        orden_compra: {
            valor: 0,
            nacional: 0,
            stock_mts: 0,
            importacion: 0
        },
        compras: {
            valor: 0,
            variacion: {
                mes: "",
                mes_indicador: 0,
            },
            fechas: [{
                mes: "",
                periodos: {
                    actual: 0,
                    anterior: 0
                }
            }, {
                mes: "",
                periodos: {
                    actual: 0,
                    anterior: 0
                }
            }]
        },
        facturacion: {
            valor: 0,
            factura: 0,
            factura_tendencia: "neutro",
            nota_credito: 0,
            nota_credito_tendencia: "neutro",
            solicitud_nc: 0,
            solicitud_nc_tendencia: "neutro"
        },
        ventas: {
            valor: 0,
            variacion: {
                mes: "",
                mes_indicador: 0,
            },
            fechas: [{
                mes: "",
                periodos: {
                    actual: 0,
                    anterior: 0
                }
            }, {
                mes: "",
                periodos: {
                    actual: 0,
                    anterior: 0
                }
            }]
        },
        rapel_rebate: {
            ranking: 0,
            tendencia: "neutro",
            rapel: 0,
            rapel_indicador: 0,
            rebate: 0,
            rebate_indicador: 0,
            proyectado: 0,
            proyectado_indicador: 0
        }
    },
    _attachments: ""
}
