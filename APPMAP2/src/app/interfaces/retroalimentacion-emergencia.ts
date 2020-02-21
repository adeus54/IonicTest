import { Deserializable} from './deserializable';
import { Emergencia } from './emergencia';
export interface RetroalimentacionEmergencia {
    idEmergencia?: string;
    usuario?: string;
    estado?: string;
    descripcion?: string;
    fecha_r?: string;
    hora?: string;

}
