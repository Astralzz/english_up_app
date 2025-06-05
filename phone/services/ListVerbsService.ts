import Verb, { PaginateVerbsType, VerbTypeType } from "@/models/Verb";
import verbData from "@/assets/data/jsons/verbs.json";

/**
 * Servicio para administrar la lista de verbos en inglés.
 *
 * Este servicio carga automáticamente los verbos desde un archivo JSON
 * y proporciona métodos para filtrarlos, buscarlos y ordenarlos.
 *
 * @class ListVerbsService
 */
class ListVerbsService {
  /**
   * Lista interna de verbos cargada desde el archivo JSON.
   *
   * @private
   * @readonly
   * @type {Verb[]}
   */
  private readonly verbs: Verb[];

  /**
   * Crea una instancia del servicio de verbos y carga los datos desde el archivo JSON.
   *
   * @constructor
   */
  constructor() {
    this.verbs = verbData as Verb[];
  }

  /**
   * Devuelve todos los verbos disponibles.
   *
   * @returns {Verb[]} Lista completa de verbos.
   */
  getAll(): Verb[] {
    return this.verbs;
  }

  /**
   * Devuelve una copia superficial de la lista completa de verbos.
   *
   * Esto permite manipular o transformar la lista fuera del servicio
   * sin afectar el array original.
   *
   * @returns {Verb[]} Una nueva copia de la lista de verbos.
   */
  getCopyListAll(): Verb[] {
    return [...this.verbs];
  }

  /**
   * Pagina una lista de verbos y devuelve metadatos útiles para la paginación.
   *
   * Si no se pasa ninguna lista, se usará la lista completa de verbos.
   *
   * @param {number} page - Número de página (comienza desde 1).
   * @param {number} limit - Cantidad de elementos por página.
   * @param {Verb[]} [list=this.verbs] - Lista opcional a paginar.
   * @returns {{
   *   data: Verb[],
   *   totalPages: number,
   *   totalItems: number,
   *   currentPage: number,
   *   limit: number,
   *   hasPrev: boolean,
   *   hasNext: boolean
   * }} Objeto con resultados paginados y metadatos.
   */
  paginate(
    page: number,
    limit: number,
    list: Verb[] = this.verbs
  ): PaginateVerbsType {
    const totalItems = list.length;
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = Math.max(1, Math.min(page, totalPages)); // Evita ir fuera de rango

    const start = (currentPage - 1) * limit;
    const end = start + limit;

    const data = list.slice(start, end);

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
   * @returns {Verb[]} Lista de verbos filtrada por tipo.
   */
  filterByType(type: VerbTypeType): Verb[] {
    return this.verbs.filter((verb) => verb.type === type);
  }

  /**
   * Busca verbos que coincidan con la forma dada (simple, tercera persona, pasado, etc.).
   *
   * @param {string} query - Forma del verbo a buscar.
   * @returns {Verb[]} Lista de verbos que coinciden con la búsqueda.
   */
  searchByForm(query: string): Verb[] {
    const q = query.toLowerCase();
    return this.verbs.filter(
      (verb) =>
        verb.simple_form.toLowerCase() === q ||
        verb.third_person.toLowerCase() === q ||
        verb.simple_past.toLowerCase() === q ||
        verb.past_participle.toLowerCase() === q ||
        verb.gerund.toLowerCase() === q
    );
  }

  /**
   * Busca verbos por una palabra clave, en un campo específico o en el significado por defecto.
   *
   * @param {string} keyword - Palabra clave para buscar.
   * @param {keyof Verb} [key='meaning'] - Clave del campo por el que buscar (opcional, por defecto 'meaning').
   * @returns {Verb[]} Lista de verbos que coinciden con la búsqueda.
   */
  search(keyword: string, key: keyof Verb = "meaning"): Verb[] {
    // ? No hay keyword
    if (!keyword.trim()) return [];

    // Buscar
    const lower = keyword.toLowerCase();

    // Filtramos
    return this.verbs.filter((verb) => {
      const value = verb[key];

      // ? No hay valor
      if (!value) return false;

      // ? Array
      if (key === "meaning" && Array.isArray(value)) {
        return value.some((m) => m.toLowerCase().includes(lower));
      }

      // ? String
      if (typeof value === "string") {
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
   * @returns {Verb | undefined} Verbo correspondiente o `undefined` si no existe.
   */
  getByNo(no: number): Verb | undefined {
    return this.verbs.find((verb) => verb.no === no);
  }

  /**
   * Ordena la lista de verbos por un campo específico.
   *
   * @param {keyof Verb} field - Campo por el cual ordenar.
   * @param {boolean} [ascending=true] - `true` para orden ascendente, `false` para descendente.
   * @returns {Verb[]} Lista de verbos ordenada.
   */
  sortByField(field: keyof Verb, ascending: boolean = true): Verb[] {
    return [...this.verbs].sort((a, b) => {
      const aField = a[field];
      const bField = b[field];

      if (typeof aField === "number" && typeof bField === "number") {
        return ascending ? aField - bField : bField - aField;
      }

      const aStr = String(aField).toLowerCase();
      const bStr = String(bField).toLowerCase();

      return ascending ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
  }

  /**
   * Filtra los verbos que terminan con un sufijo específico en cualquiera de sus formas.
   *
   * Esta función es útil para ayudar a los estudiantes a identificar patrones como
   * terminaciones en "-ed" (pasado regular), "-ing" (forma continua), "-s" (tercera persona), etc.
   *
   * @param {string} suffix - Sufijo a buscar (por ejemplo: "ed", "ing", "s").
   * @returns {Verb[]} Lista de verbos que tienen alguna forma que termina con el sufijo dado.
   */
  filterByEnding(suffix: "ed" | "ing" | "s" | string): Verb[] {
    const lowerSuffix = suffix.toLowerCase();
    return this.verbs.filter(
      (verb) =>
        verb.simple_form.toLowerCase().endsWith(lowerSuffix) ||
        verb.third_person.toLowerCase().endsWith(lowerSuffix) ||
        verb.simple_past.toLowerCase().endsWith(lowerSuffix) ||
        verb.past_participle.toLowerCase().endsWith(lowerSuffix) ||
        verb.gerund.toLowerCase().endsWith(lowerSuffix)
    );
  }
}

export default ListVerbsService;
