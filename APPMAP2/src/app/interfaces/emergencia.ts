export interface Emergencia {
    _id?: string;
    titulo?: string;
    telefono?: string;
    tipollamada?: string;
    fecha_e?: Date;
    hora?: string;
    provincia?: string;
    canton?: string;
    direccionReporte?: string;
    direccionIncidente?: string;
    description?: Text;
    operador?: string;
    reportador?: string;
    alerta?: string;
    longitud?: number;
    latitud?: number;
}

