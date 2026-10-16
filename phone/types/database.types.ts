// Definir los nombres de los esquemas disponibles
export type SchemaNameType = 'Verb' | 'Word' | 'Formule';

// Tipos para mejorar la seguridad de tipos
export interface RealmEntity {
  _id?: string | Realm.BSON.UUID;
}

// Opciones para crear un objeto con validaciones
export interface CreateObjectOptions<T extends RealmEntity> {
  schemaName: SchemaNameType;
  uniqueFields?: (keyof T)[];
  updateOnConflict?: boolean;
}

// Opciones para buscar objetos
export interface FindObjectsOptions {
  sortBy?: string;
  ascending?: boolean;
  limit?: number;
}
