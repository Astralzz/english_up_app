import {
  createRealmObject,
  findRealmObjects,
  findRealmObjectById,
  updateRealmObject,
  deleteRealmObject,
  deleteRealmObjects,
  countRealmObjects,
} from '@/database/database.core';
import {
  CreateObjectOptions,
  FindObjectsOptions,
  RealmEntity,
  SchemaNameType,
} from '@/types/database.types';
import { Realm } from '@realm/react';

/**
 * Clase de utilidad para facilitar el uso de las operaciones de Realm
 * Especialmente útil con hooks de React
 */
export class RealmService<T extends RealmEntity> {
  constructor(
    private realm: Realm,
    private schemaName: SchemaNameType,
  ) {}

  create(
    data: Omit<T, '_id'>,
    options: Omit<CreateObjectOptions<T>, 'schemaName'> = {},
  ): T {
    return createRealmObject(this.realm, data, {
      ...options,
      schemaName: this.schemaName,
    });
  }

  find(query: Partial<T> = {}, options: FindObjectsOptions = {}): T[] {
    return findRealmObjects(this.realm, this.schemaName, query, options);
  }

  findById(id: string): T | null {
    return findRealmObjectById(this.realm, this.schemaName, id);
  }

  update(id: string, data: Partial<Omit<T, '_id'>>): void {
    return updateRealmObject(this.realm, this.schemaName, id, data);
  }

  delete(id: string): void {
    return deleteRealmObject(this.realm, this.schemaName, id);
  }

  deleteMany(query: Partial<T> = {}): number {
    return deleteRealmObjects(this.realm, this.schemaName, query);
  }

  count(query: Partial<T> = {}): number {
    return countRealmObjects(this.realm, this.schemaName, query);
  }

  /**
   * Verifica si existe al menos un objeto que coincida con la consulta
   */
  exists(query: Partial<T>): boolean {
    return this.count(query) > 0;
  }

  /**
   * Obtiene el primer objeto que coincida con la consulta
   */
  findFirst(query: Partial<T> = {}): T | null {
    const results = this.find(query, { limit: 1 });
    return results.length > 0 ? results[0] : null;
  }
}
