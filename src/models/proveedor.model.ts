export var proveedorModel:any = {
    _id: "",
    _rev: "",
    isActive: true,
    nombre: "",
    indicadores: {
        info: {
            date: "",
        },
        ivp: {
            puntaje: 0,
            tendencia: "",
            ranking: 0,
            compromiso: 0,
            compromiso_tendencia: "",
            cobertura: 0,
            cobertura_tendencia: "",
            dispersion: 0,
            dispersion_tendencia: "",
            plazos_pago: 0,
            plazos_pago_tendencia: "",
            fill_rate: 0,
            fill_rate_tendencia: "",
            desviacion: 0,
            desviacion_tendencia: "",
        },
        cobertura: {
            totales: {
                total: 0,
                norte: 0,
                centro: 0,
                sur: 0
            },
            periodos: {
                30: {
                    total: 0,
                    norte: 0,
                    centro: 0,
                    sur: 0
                },
                60: {
                    total: 0,
                    norte: 0,
                    centro: 0,
                    sur: 0
                },
                90: {
                    total: 0,
                    norte: 0,
                    centro: 0,
                    sur: 0
                }
            }
        },
        ventas_acumuladas: 0,
        rapel_rebate: {
            title: "",
            rapel: 0,
            rapel_porcentual: 0,
            rebate: 0,
            rebate_porcentual: 0
        },
        ventas: {
            valor: 0,
            totales: {
                min: 0,
                max: 0
            },
            fechas: [
                {
                    mes: "Octubre",
                    periodos: {
                        actual: 0,
                        anterior: 0
                    }
                },
                {
                    mes: "Nombre Mes",
                    periodos: {
                        actual: 0,
                        anterior: 0
                    }
                }
            ]
        }
    },
    _attachments: ""
}
