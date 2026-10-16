/**
 * Códigos de error para operaciones de base de datos
 */
export enum DatabaseErrorCode {
  OBJECT_ALREADY_EXISTS = 'OBJECT_ALREADY_EXISTS',
  OBJECT_NOT_FOUND = 'OBJECT_NOT_FOUND',
  INVALID_QUERY = 'INVALID_QUERY',
  TRANSACTION_FAILED = 'TRANSACTION_FAILED',
  SCHEMA_MISMATCH = 'SCHEMA_MISMATCH',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * Clase principal para manejo de errores de base de datos
 * Centraliza todos los tipos de errores relacionados con Realm
 */
export class DatabaseError extends Error {
  public readonly code: DatabaseErrorCode;
  public readonly timestamp: Date;
  public readonly context?: Record<string, any>;

  constructor(
    message: string,
    code: DatabaseErrorCode = DatabaseErrorCode.UNKNOWN_ERROR,
    context?: Record<string, any>,
  ) {
    super(message);
    this.name = 'DatabaseError';
    this.code = code;
    this.timestamp = new Date();
    this.context = context;

    // Mantener stack trace apropiado
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DatabaseError);
    }
  }

  /**
   * Crea un error para objeto ya existente
   */
  static objectAlreadyExists(
    schemaName: string,
    context?: Record<string, any>,
  ): DatabaseError {
    return new DatabaseError(
      `El objeto ya existe en ${schemaName} y no se permite actualizar`,
      DatabaseErrorCode.OBJECT_ALREADY_EXISTS,
      { schemaName, ...context },
    );
  }

  /**
   * Crea un error para objeto no encontrado
   */
  static objectNotFound(
    id: string,
    schemaName: string,
    context?: Record<string, any>,
  ): DatabaseError {
    return new DatabaseError(
      `No se encontró el objeto con id ${id} en ${schemaName}`,
      DatabaseErrorCode.OBJECT_NOT_FOUND,
      { id, schemaName, ...context },
    );
  }

  /**
   * Crea un error para consulta inválida
   */
  static invalidQuery(
    query: string,
    reason: string,
    context?: Record<string, any>,
  ): DatabaseError {
    return new DatabaseError(
      `Consulta inválida: ${reason}`,
      DatabaseErrorCode.INVALID_QUERY,
      { query, reason, ...context },
    );
  }

  /**
   * Crea un error para fallo de transacción
   */
  static transactionFailed(
    operation: string,
    reason: string,
    context?: Record<string, any>,
  ): DatabaseError {
    return new DatabaseError(
      `Fallo en transacción durante ${operation}: ${reason}`,
      DatabaseErrorCode.TRANSACTION_FAILED,
      { operation, reason, ...context },
    );
  }

  /**
   * Crea un error para desajuste de esquema
   */
  static schemaMismatch(
    expectedSchema: string,
    actualSchema: string,
    context?: Record<string, any>,
  ): DatabaseError {
    return new DatabaseError(
      `Desajuste de esquema. Esperado: ${expectedSchema}, Actual: ${actualSchema}`,
      DatabaseErrorCode.SCHEMA_MISMATCH,
      { expectedSchema, actualSchema, ...context },
    );
  }

  /**
   * Crea un error para problemas de conexión
   */
  static connectionError(
    reason: string,
    context?: Record<string, any>,
  ): DatabaseError {
    return new DatabaseError(
      `Error de conexión a la base de datos: ${reason}`,
      DatabaseErrorCode.CONNECTION_ERROR,
      { reason, ...context },
    );
  }

  /**
   * Crea un error para validación de datos
   */
  static validationError(
    field: string,
    value: any,
    reason: string,
    context?: Record<string, any>,
  ): DatabaseError {
    return new DatabaseError(
      `Error de validación en el campo '${field}': ${reason}`,
      DatabaseErrorCode.VALIDATION_ERROR,
      { field, value, reason, ...context },
    );
  }

  /**
   * Envuelve un error desconocido
   */
  static fromUnknownError(
    error: unknown,
    operation: string,
    context?: Record<string, any>,
  ): DatabaseError {
    const message =
      error instanceof Error ? error.message : 'Error desconocido';
    return new DatabaseError(
      `Error durante ${operation}: ${message}`,
      DatabaseErrorCode.UNKNOWN_ERROR,
      { originalError: error, operation, ...context },
    );
  }

  /**
   * Verifica si el error es de un tipo específico
   */
  isType(code: DatabaseErrorCode): boolean {
    return this.code === code;
  }

  /**
   * Verifica si es un error de objeto ya existente
   */
  isObjectAlreadyExists(): boolean {
    return this.isType(DatabaseErrorCode.OBJECT_ALREADY_EXISTS);
  }

  /**
   * Verifica si es un error de objeto no encontrado
   */
  isObjectNotFound(): boolean {
    return this.isType(DatabaseErrorCode.OBJECT_NOT_FOUND);
  }

  /**
   * Verifica si es un error de validación
   */
  isValidationError(): boolean {
    return this.isType(DatabaseErrorCode.VALIDATION_ERROR);
  }

  /**
   * Convierte el error a un objeto JSON serializable
   */
  toJSON(): Record<string, any> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      timestamp: this.timestamp.toISOString(),
      context: this.context,
      stack: this.stack,
    };
  }

  /**
   * Obtiene una representación de string detallada del error
   */
  toString(): string {
    const contextStr = this.context
      ? ` | Contexto: ${JSON.stringify(this.context)}`
      : '';
    return `${this.name} [${this.code}]: ${this.message}${contextStr}`;
  }
}

/**
 * Mantener compatibilidad con nombres anteriores
 * @deprecated Usar DatabaseError en su lugar
 */
export const RealmDatabaseError = DatabaseError;

/**
 * @deprecated Usar DatabaseError.objectAlreadyExists() en su lugar
 */
export const ObjectAlreadyExistsError = DatabaseError;

/**
 * @deprecated Usar DatabaseError.objectNotFound() en su lugar
 */
export const ObjectNotFoundError = DatabaseError;
