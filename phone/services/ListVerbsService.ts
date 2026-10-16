import Verb, { PaginateVerbsType, VerbTypeType } from '@/models/Verb';
import verbData from '@/assets/data/jsons/verbs.json';
import { GameGenerateQuestionType } from '@/types/games';
import { TFunction } from 'i18next';
import { Realm } from '@realm/react';
import { RealmService } from '@/classes/RealmService';
import { DatabaseError } from '@/database/database.errors';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Servicio para administrar la lista de verbos en inglés con soporte de base de datos.
 *
 * Este servicio migra automáticamente los verbos del JSON a Realm Database
 * en la primera ejecución y luego usa exclusivamente la base de datos.
 * Permite a los usuarios agregar nuevos verbos que se persisten permanentemente.
 *
 * @class ListVerbsService
 */
class ListVerbsService {
  /**
   * Servicio de Realm para operaciones de base de datos.
   */
  private realmService: RealmService<Verb>;

  /**
   * Clave para AsyncStorage para verificar si ya se migró.
   */
  private static readonly MIGRATION_KEY = 'verbs_migrated_to_realm';

  /**
   * Cache local de verbos para mejorar performance.
   */
  private verbsCache: Verb[] | null = null;

  /**
   * Timestamp del último update del cache.
   */
  private cacheTimestamp: number = 0;

  /**
   * Tiempo de vida del cache en milisegundos (5 minutos).
   */
  private static readonly CACHE_TTL = 5 * 60 * 1000;

  /**
   * Crea una instancia del servicio de verbos.
   *
   * @param {Realm} realm - Instancia de Realm Database.
   */
  constructor(realm: Realm) {
    this.realmService = new RealmService<Verb>(realm, 'Verb');
  }

  /**
   * Inicializa el servicio: migra datos del JSON si es la primera vez.
   * Debe llamarse antes de usar cualquier otra función.
   */
  async initialize(): Promise<void> {
    try {
      const isMigrated = await AsyncStorage.getItem(
        ListVerbsService.MIGRATION_KEY,
      );

      if (!isMigrated) {
        await this.migrateFromJsonToRealm();
        await AsyncStorage.setItem(ListVerbsService.MIGRATION_KEY, 'true');
        console.log('✅ Migración de verbos completada');
      }

      // Actualizar cache después de la inicialización
      await this.refreshCache();
    } catch (error) {
      throw DatabaseError.fromUnknownError(
        error,
        'inicializar servicio de verbos',
        { hasCache: !!this.verbsCache },
      );
    }
  }

  /**
   * Migra todos los verbos del JSON a Realm Database.
   */
  private async migrateFromJsonToRealm(): Promise<void> {
    try {
      console.log('🔄 Iniciando migración de verbos...');
      let migratedCount = 0;
      let errorCount = 0;

      for (const verbJson of verbData) {
        try {
          // Crear verbo en la base de datos
          this.realmService.create(
            {
              no: verbJson.no,
              type: verbJson.type as VerbTypeType,
              simple_form: verbJson.simple_form,
              third_person: verbJson.third_person,
              simple_past: verbJson.simple_past,
              past_participle: verbJson.past_participle,
              gerund: verbJson.gerund,
              meaning: verbJson.meaning,
            },
            {
              uniqueFields: ['no'], // Evitar duplicados por número
              updateOnConflict: true, // Actualizar si ya existe
            },
          );

          migratedCount++;
        } catch (error) {
          errorCount++;
          console.warn(`⚠️ Error migrando verbo ${verbJson.no}:`, error);
        }
      }

      console.log(
        `✅ Migración completada: ${migratedCount} verbos migrados, ${errorCount} errores`,
      );
    } catch (error) {
      throw DatabaseError.fromUnknownError(
        error,
        'migrar verbos del JSON a Realm',
        { totalVerbs: verbData.length },
      );
    }
  }

  /**
   * Actualiza el cache local de verbos.
   */
  private async refreshCache(): Promise<void> {
    try {
      this.verbsCache = this.realmService.find(
        {},
        {
          sortBy: 'no',
          ascending: true,
        },
      );
      this.cacheTimestamp = Date.now();
    } catch (error) {
      throw DatabaseError.fromUnknownError(error, 'actualizar cache de verbos');
    }
  }

  /**
   * Verifica si el cache es válido.
   */
  private isCacheValid(): boolean {
    return (
      this.verbsCache !== null &&
      Date.now() - this.cacheTimestamp < ListVerbsService.CACHE_TTL
    );
  }

  /**
   * Obtiene todos los verbos, usando cache si es válido.
   */
  private async getAllFromDatabase(): Promise<Verb[]> {
    if (this.isCacheValid()) {
      return this.verbsCache!;
    }

    await this.refreshCache();
    return this.verbsCache!;
  }

  /**
   * Devuelve todos los verbos disponibles.
   *
   * @returns {Promise<Verb[]>} Lista completa de verbos.
   */
  async getAll(): Promise<Verb[]> {
    return await this.getAllFromDatabase();
  }

  /**
   * Devuelve una copia superficial de la lista completa de verbos.
   *
   * Esto permite manipular o transformar la lista fuera del servicio
   * sin afectar el array original.
   *
   * @returns {Promise<Verb[]>} Una nueva copia de la lista de verbos.
   */
  async getCopyListAll(): Promise<Verb[]> {
    const verbs = await this.getAllFromDatabase();
    return [...verbs];
  }

  /**
   * Agrega un nuevo verbo a la base de datos.
   *
   * @param {Omit<Verb, '_id'>} verbData - Datos del verbo sin el ID.
   * @returns {Promise<Verb>} Verbo creado con su ID asignado.
   */
  async addVerb(verbData: Omit<Verb, '_id'>): Promise<Verb> {
    try {
      const newVerb = this.realmService.create(verbData, {
        uniqueFields: ['no'], // Evitar duplicados por número
        updateOnConflict: false,
      });

      // Invalidar cache para reflejar cambios
      this.verbsCache = null;

      return newVerb;
    } catch (error) {
      if (error instanceof DatabaseError && error.isObjectAlreadyExists()) {
        throw new Error(`Ya existe un verbo con el número ${verbData.no}`);
      }
      throw error;
    }
  }

  /**
   * Actualiza un verbo existente.
   *
   * @param {string} id - ID del verbo a actualizar.
   * @param {Partial<Omit<Verb, '_id'>>} updates - Campos a actualizar.
   */
  async updateVerb(
    id: string,
    updates: Partial<Omit<Verb, '_id'>>,
  ): Promise<void> {
    try {
      this.realmService.update(id, updates);

      // Invalidar cache para reflejar cambios
      this.verbsCache = null;
    } catch (error) {
      if (error instanceof DatabaseError && error.isObjectNotFound()) {
        throw new Error(`No se encontró el verbo con ID ${id}`);
      }
      throw error;
    }
  }

  /**
   * Elimina un verbo por su ID.
   *
   * @param {string} id - ID del verbo a eliminar.
   */
  async deleteVerb(id: string): Promise<void> {
    try {
      this.realmService.delete(id);

      // Invalidar cache para reflejar cambios
      this.verbsCache = null;
    } catch (error) {
      if (error instanceof DatabaseError && error.isObjectNotFound()) {
        throw new Error(`No se encontró el verbo con ID ${id}`);
      }
      throw error;
    }
  }

  /**
   * Obtiene estadísticas de los verbos.
   *
   * @returns {Promise<{total: number, regular: number, irregular: number}>}
   */
  async getStats(): Promise<{
    total: number;
    regular: number;
    irregular: number;
  }> {
    return {
      total: this.realmService.count(),
      regular: this.realmService.count({ type: 'R' }),
      irregular: this.realmService.count({ type: 'I' }),
    };
  }

  /**
   * Pagina una lista de verbos y devuelve metadatos útiles para la paginación.
   *
   * Si no se pasa ninguna lista, se usará la lista completa de verbos.
   *
   * @param {number} page - Número de página (comienza desde 1).
   * @param {number} limit - Cantidad de elementos por página.
   * @param {Verb[]} [list] - Lista opcional a paginar.
   * @returns {Promise<PaginateVerbsType>} Objeto con resultados paginados y metadatos.
   */
  async paginate(
    page: number,
    limit: number,
    list?: Verb[],
  ): Promise<PaginateVerbsType> {
    const verbs = list || (await this.getAllFromDatabase());
    const totalItems = verbs.length;
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = Math.max(1, Math.min(page, totalPages)); // Evita ir fuera de rango

    const start = (currentPage - 1) * limit;
    const end = start + limit;

    const data = verbs.slice(start, end);

    return {
      data,
      totalPages,
      totalItems,
      currentPage,
      limit,
      hasPrev: currentPage > 1,
      hasNext: currentPage < totalPages,
    };
  }

  /**
   * Filtra los verbos por tipo ("R" para regulares, "I" para irregulares).
   *
   * @param {VerbTypeType} type - Tipo de verbo ("R" o "I").
   * @returns {Promise<Verb[]>} Lista de verbos filtrada por tipo.
   */
  async filterByType(type: VerbTypeType): Promise<Verb[]> {
    return this.realmService.find({ type });
  }

  /**
   * Busca verbos que coincidan con la forma dada (simple, tercera persona, pasado, etc.).
   *
   * @param {string} query - Forma del verbo a buscar.
   * @returns {Promise<Verb[]>} Lista de verbos que coinciden con la búsqueda.
   */
  async searchByForm(query: string): Promise<Verb[]> {
    const q = query.toLowerCase();
    const allVerbs = await this.getAllFromDatabase();

    return allVerbs.filter(
      (verb) =>
        verb.simple_form.toLowerCase() === q ||
        verb.third_person.toLowerCase() === q ||
        verb.simple_past.toLowerCase() === q ||
        verb.past_participle.toLowerCase() === q ||
        verb.gerund.toLowerCase() === q,
    );
  }

  /**
   * Busca verbos por una palabra clave, en un campo específico o en el significado por defecto.
   *
   * @param {string} keyword - Palabra clave para buscar.
   * @param {keyof Verb} [key='meaning'] - Clave del campo por el que buscar (opcional, por defecto 'meaning').
   * @returns {Promise<Verb[]>} Lista de verbos que coinciden con la búsqueda.
   */
  async search(keyword: string, key: keyof Verb = 'meaning'): Promise<Verb[]> {
    // ? No hay keyword
    if (!keyword.trim()) return [];

    const allVerbs = await this.getAllFromDatabase();
    const lower = keyword.toLowerCase();

    // Filtramos
    return allVerbs.filter((verb) => {
      const value = verb[key];

      // ? No hay valor
      if (!value) return false;

      // ? Array
      if (key === 'meaning' && Array.isArray(value)) {
        return value.some((m) => m.toLowerCase().includes(lower));
      }

      // ? String
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lower);
      }

      // ? Default
      return false;
    });
  }

  /**
   * Busca un verbo por su número identificador (`no`).
   *
   * @param {number} no - Número identificador del verbo.
   * @returns {Promise<Verb | null>} Verbo correspondiente o `null` si no existe.
   */
  async getByNo(no: number): Promise<Verb | null> {
    return this.realmService.findFirst({ no });
  }

  /**
   * Ordena la lista de verbos por un campo específico.
   *
   * @param {keyof Verb} field - Campo por el cual ordenar.
   * @param {boolean} [ascending=true] - `true` para orden ascendente, `false` para descendente.
   * @returns {Promise<Verb[]>} Lista de verbos ordenada.
   */
  async sortByField(
    field: keyof Verb,
    ascending: boolean = true,
  ): Promise<Verb[]> {
    return this.realmService.find(
      {},
      {
        sortBy: field as string,
        ascending,
      },
    );
  }

  /**
   * Filtra los verbos que terminan con un sufijo específico en cualquiera de sus formas.
   *
   * Esta función es útil para ayudar a los estudiantes a identificar patrones como
   * terminaciones en "-ed" (pasado regular), "-ing" (forma continua), "-s" (tercera persona), etc.
   *
   * @param {string} suffix - Sufijo a buscar (por ejemplo: "ed", "ing", "s").
   * @returns {Promise<Verb[]>} Lista de verbos que tienen alguna forma que termina con el sufijo dado.
   */
  async filterByEnding(suffix: 'ed' | 'ing' | 's' | string): Promise<Verb[]> {
    const lowerSuffix = suffix.toLowerCase();
    const allVerbs = await this.getAllFromDatabase();

    return allVerbs.filter(
      (verb) =>
        verb.simple_form.toLowerCase().endsWith(lowerSuffix) ||
        verb.third_person.toLowerCase().endsWith(lowerSuffix) ||
        verb.simple_past.toLowerCase().endsWith(lowerSuffix) ||
        verb.past_participle.toLowerCase().endsWith(lowerSuffix) ||
        verb.gerund.toLowerCase().endsWith(lowerSuffix),
    );
  }

  /**
   * Genera una pregunta con opciones para un verbo.
   *
   * @param {Verb[]} allVerbs - Lista de verbos disponibles.
   * @param {keyof Verb} questionKey - Clave del campo que se usará como pregunta.
   * @param {keyof Verb} answerKey - Clave del campo que se usará como respuesta.
   * @param {number} [countAnswers=4] - Cantidad de opciones (por defecto 4).
   * @param {object} translation - Objeto de traducción.
   *
   * @returns {GameGenerateQuestionType | null}
   * Objeto con la pregunta (`question`) y sus opciones (`options`), o `null` si no se puede generar.
   */
  generateVerbQuestion(
    allVerbs: Verb[],
    questionKey: keyof Verb,
    answerKey: keyof Verb,
    countAnswers: number = 4,
    translation: {
      t: TFunction<'translation', undefined>;
      path: string;
    },
  ): GameGenerateQuestionType | null {
    // ? No hay verbos
    if (allVerbs.length === 0) return null;

    // ? No hay verbos suficientes
    if (allVerbs.length < countAnswers) return null;

    // Mezclamos los verbos
    const shuffled = [...allVerbs].sort(() => Math.random() - 0.5);

    // Seleccionamos el correcto
    const correctVerb = shuffled[0];

    // Filtramos los incorrectos
    const incorrectsVerbs = shuffled
      .filter((v) => v.no !== correctVerb.no)
      .slice(0, countAnswers - 1);

    // Funcion para obtener el valor como string
    const getValueAsString = (value: string | number | string[]): string =>
      Array.isArray(value) ? value.join(', ') : String(value);

    // Construimos las opciones
    const options = [
      ...incorrectsVerbs.map((verb) => ({
        label: getValueAsString(verb[answerKey]),
        number: verb.no,
        isCorrect: false,
      })),
      {
        label: getValueAsString(correctVerb[answerKey]),
        number: correctVerb.no,
        isCorrect: true,
      },
    ];

    // Mezclamos las opciones
    const shuffledOptions = options.sort(() => Math.random() - 0.5);

    // Generamos la pregunta
    const x = translation.t(`${translation.path}.keys_question.${answerKey}`);
    const y = getValueAsString(correctVerb[questionKey]);
    const preQuestion = translation.t(`${translation.path}.question_pre`);
    const question = `${preQuestion.replace('[x]', x).replace('[y]', y)}`;

    return {
      question,
      options: shuffledOptions,
    };
  }

  /**
   * Resetea el cache y fuerza a recargar datos de la base de datos.
   */
  invalidateCache(): void {
    this.verbsCache = null;
    this.cacheTimestamp = 0;
  }

  /**
   * Obtiene el próximo número disponible para un nuevo verbo.
   */
  async getNextVerbNumber(): Promise<number> {
    const allVerbs = await this.getAllFromDatabase();
    const maxNo = Math.max(...allVerbs.map((v) => v.no), 0);
    return maxNo + 1;
  }
}

export default ListVerbsService;
