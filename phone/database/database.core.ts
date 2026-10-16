import { Realm } from '@realm/react';
import { DatabaseError } from './database.errors';
import type {
  CreateObjectOptions,
  FindObjectsOptions,
  RealmEntity,
  SchemaNameType,
} from '@/types/database.types';

/**
 * Crea un nuevo objeto en Realm con validación de unicidad opcional
 */
export const createRealmObject = <T extends RealmEntity>(
  realm: Realm,
  data: Omit<T, '_id'>,
  options: CreateObjectOptions<T>,
): T => {
  const { schemaName, uniqueFields, updateOnConflict = false } = options;

  const objToCreate = {
    ...data,
    _id: new Realm.BSON.UUID().toHexString(),
  } as T;

  try {
    let alreadyExists: Realm.Object<T> | undefined = undefined;

    // Verificar si existe un objeto con los campos únicos especificados
    if (uniqueFields && uniqueFields.length > 0) {
      const filter = uniqueFields
        .map((field) => `${String(field)} == $${String(field)}`)
        .join(' AND ');
      const values = uniqueFields.map((field) => (data as any)[field]);
      const results = realm.objects<T>(schemaName).filtered(filter, ...values);
      alreadyExists = results[0];
    }

    let result: T;
    realm.write(() => {
      if (alreadyExists) {
        if (updateOnConflict) {
          // Actualizar el objeto existente
          Object.assign(alreadyExists, data);
          result = alreadyExists as unknown as T;
        } else {
          throw DatabaseError.objectAlreadyExists(schemaName, { data });
        }
      } else {
        // Crear nuevo objeto
        result = realm.create<T>(schemaName, objToCreate);
      }
    });

    return result!;
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error;
    }
    throw DatabaseError.fromUnknownError(
      error,
      `crear objeto en ${schemaName}`,
      { data, options },
    );
  }
};

/**
 * Busca objetos en Realm con filtrado y ordenamiento opcional
 */
export function findRealmObjects<T extends RealmEntity>(
  realm: Realm,
  schemaName: SchemaNameType,
  query: Partial<T> = {},
  options: FindObjectsOptions = {},
): T[] {
  try {
    const { sortBy, ascending = true, limit } = options;
    let collection = realm.objects<T>(schemaName);

    // Aplicar filtros si existen
    if (Object.keys(query).length > 0) {
      const filter = Object.keys(query)
        .map((key) => `${key} == $${key}`)
        .join(' AND ');
      const values = Object.values(query);
      collection = collection.filtered(filter, ...values);
    }

    // Aplicar ordenamiento si se especifica
    if (sortBy) {
      collection = collection.sorted(sortBy, !ascending);
    }

    // Aplicar límite si se especifica
    const results = Array.from(collection) as T[];
    return limit ? results.slice(0, limit) : results;
  } catch (error) {
    throw DatabaseError.fromUnknownError(
      error,
      `buscar objetos en ${schemaName}`,
      { query, options },
    );
  }
}

/**
 * Busca un objeto por su ID
 */
export function findRealmObjectById<T extends RealmEntity>(
  realm: Realm,
  schemaName: SchemaNameType,
  id: string,
): T | null {
  try {
    const obj = realm.objectForPrimaryKey<T>(schemaName, id as any);
    return obj ? (obj as unknown as T) : null;
  } catch (error) {
    throw DatabaseError.fromUnknownError(
      error,
      `buscar objeto por ID en ${schemaName}`,
      { id },
    );
  }
}

/**
 * Actualiza un objeto existente por su ID
 */
export function updateRealmObject<T extends RealmEntity>(
  realm: Realm,
  schemaName: SchemaNameType,
  id: string,
  data: Partial<Omit<T, '_id'>>,
): void {
  try {
    const obj = realm.objectForPrimaryKey<T>(schemaName, id as any);
    if (!obj) {
      throw DatabaseError.objectNotFound(id, schemaName, { data });
    }

    realm.write(() => {
      Object.assign(obj, data);
    });
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error;
    }
    throw DatabaseError.fromUnknownError(
      error,
      `actualizar objeto en ${schemaName}`,
      { id, data },
    );
  }
}

/**
 * Elimina un objeto por su ID
 */
export function deleteRealmObject<T extends RealmEntity>(
  realm: Realm,
  schemaName: SchemaNameType,
  id: string,
): void {
  try {
    const obj = realm.objectForPrimaryKey<T>(schemaName, id as any);
    if (!obj) {
      throw DatabaseError.objectNotFound(id, schemaName);
    }

    realm.write(() => {
      realm.delete(obj);
    });
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error;
    }
    throw DatabaseError.fromUnknownError(
      error,
      `eliminar objeto en ${schemaName}`,
      { id },
    );
  }
}

/**
 * Elimina múltiples objetos que coincidan con una consulta
 */
export function deleteRealmObjects<T extends RealmEntity>(
  realm: Realm,
  schemaName: SchemaNameType,
  query: Partial<T> = {},
): number {
  try {
    let collection = realm.objects<T>(schemaName);

    if (Object.keys(query).length > 0) {
      const filter = Object.keys(query)
        .map((key) => `${key} == $${key}`)
        .join(' AND ');
      const values = Object.values(query);
      collection = collection.filtered(filter, ...values);
    }

    const count = collection.length;
    realm.write(() => {
      realm.delete(collection);
    });

    return count;
  } catch (error) {
    throw DatabaseError.fromUnknownError(
      error,
      `eliminar objetos en ${schemaName}`,
      { query },
    );
  }
}

/**
 * Cuenta el número de objetos que coinciden con una consulta
 */
export function countRealmObjects<T extends RealmEntity>(
  realm: Realm,
  schemaName: SchemaNameType,
  query: Partial<T> = {},
): number {
  try {
    let collection = realm.objects<T>(schemaName);

    if (Object.keys(query).length > 0) {
      const filter = Object.keys(query)
        .map((key) => `${key} == $${key}`)
        .join(' AND ');
      const values = Object.values(query);
      collection = collection.filtered(filter, ...values);
    }

    return collection.length;
  } catch (error) {
    throw DatabaseError.fromUnknownError(
      error,
      `contar objetos en ${schemaName}`,
      { query },
    );
  }
}
