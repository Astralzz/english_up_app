import { useEffect, useState } from 'react';
import { useRealm } from '@realm/react';
import Verb from '@/models/Verb';
import ListVerbsService from '@/services/ListVerbsService';

// Props returns
interface UseVerbProps {
  verbs: Verb[];
  listVerbsService: ListVerbsService | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  // Métodos
  setVerbs: (verbs: Verb[]) => void;
  refreshVerbs: () => Promise<void>;
  addVerb: (verbData: Omit<Verb, '_id'>) => Promise<Verb>;
  updateVerb: (
    id: string,
    updates: Partial<Omit<Verb, '_id'>>,
  ) => Promise<void>;
  deleteVerb: (id: string) => Promise<void>;
  searchVerbs: (keyword: string, key?: keyof Verb) => Promise<Verb[]>;
  filterByType: (type: 'R' | 'I') => Promise<Verb[]>;
  getStats: () => Promise<{
    total: number;
    regular: number;
    irregular: number;
  }>;
}

/**
 * Hook para manejar verbos con la nueva base de datos.
 *
 * @returns {UseVerbProps} Objeto con las propiedades y métodos para manejar verbos.
 */
const useVerbs = (): UseVerbProps => {
  const realm = useRealm();

  // States
  const [listVerbsService, setListVerbsService] =
    useState<ListVerbsService | null>(null);
  const [verbs, setVerbs] = useState<Verb[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Inicializar servicio
  useEffect(() => {
    const initializeService = async () => {
      try {
        setLoading(true);
        setError(null);

        // Crear servicio
        const service = new ListVerbsService(realm);

        // Inicializar (migra del JSON si es necesario)
        await service.initialize();

        // Cargar verbos iniciales
        const allVerbs = await service.getAll();

        setListVerbsService(service);
        setVerbs(allVerbs);
        setInitialized(true);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
        console.error('Error inicializando servicio de verbos:', err);
      } finally {
        setLoading(false);
      }
    };

    if (realm) {
      initializeService();
    }
  }, [realm]);

  // Refrescar verbos
  const refreshVerbs = async (): Promise<void> => {
    if (!listVerbsService) return;

    try {
      setLoading(true);
      setError(null);
      listVerbsService.invalidateCache();
      const allVerbs = await listVerbsService.getAll();
      setVerbs(allVerbs);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error actualizando verbos';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Agregar verbo
  const addVerb = async (verbData: Omit<Verb, '_id'>): Promise<Verb> => {
    if (!listVerbsService) throw new Error('Servicio no inicializado');

    try {
      setError(null);
      const newVerb = await listVerbsService.addVerb(verbData);

      // Actualizar lista local
      setVerbs((prev) => [...prev, newVerb]);

      return newVerb;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error agregando verbo';
      setError(errorMessage);
      throw err;
    }
  };

  // Actualizar verbo
  const updateVerb = async (
    id: string,
    updates: Partial<Omit<Verb, '_id'>>,
  ): Promise<void> => {
    if (!listVerbsService) throw new Error('Servicio no inicializado');

    try {
      setError(null);
      await listVerbsService.updateVerb(id, updates);

      // Actualizar lista local
      setVerbs((prev) =>
        prev.map((verb) => (verb._id === id ? { ...verb, ...updates } : verb)),
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error actualizando verbo';
      setError(errorMessage);
      throw err;
    }
  };

  // Eliminar verbo
  const deleteVerb = async (id: string): Promise<void> => {
    if (!listVerbsService) throw new Error('Servicio no inicializado');

    try {
      setError(null);
      await listVerbsService.deleteVerb(id);

      // Actualizar lista local
      setVerbs((prev) => prev.filter((verb) => verb._id !== id));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error eliminando verbo';
      setError(errorMessage);
      throw err;
    }
  };

  // Buscar verbos
  const searchVerbs = async (
    keyword: string,
    key?: keyof Verb,
  ): Promise<Verb[]> => {
    if (!listVerbsService) throw new Error('Servicio no inicializado');

    try {
      setError(null);
      return await listVerbsService.search(keyword, key);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error buscando verbos';
      setError(errorMessage);
      throw err;
    }
  };

  // Filtrar por tipo
  const filterByType = async (type: 'R' | 'I'): Promise<Verb[]> => {
    if (!listVerbsService) throw new Error('Servicio no inicializado');

    try {
      setError(null);
      return await listVerbsService.filterByType(type);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error filtrando verbos';
      setError(errorMessage);
      throw err;
    }
  };

  // Obtener estadísticas
  const getStats = async (): Promise<{
    total: number;
    regular: number;
    irregular: number;
  }> => {
    if (!listVerbsService) throw new Error('Servicio no inicializado');

    try {
      setError(null);
      return await listVerbsService.getStats();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error obteniendo estadísticas';
      setError(errorMessage);
      throw err;
    }
  };

  // Return
  return {
    verbs,
    listVerbsService,
    loading,
    error,
    initialized,
    // Métodos
    setVerbs,
    refreshVerbs,
    addVerb,
    updateVerb,
    deleteVerb,
    searchVerbs,
    filterByType,
    getStats,
  };
};

export default useVerbs;
