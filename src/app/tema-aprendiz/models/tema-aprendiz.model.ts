export interface TemaAprendiz {
  id: number;
  id_aprendiz: number;
  id_tema: number;
  nombre_completo?: string;
  cedula?: string;
  nombre_tema?: string;
}

export interface CreateTemaAprendizDto {
  id_aprendiz: number;
  id_tema: number;
}
