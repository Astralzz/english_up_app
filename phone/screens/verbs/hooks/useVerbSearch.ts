import { useEffect, useState } from 'react';
import Verb, { VerbTypeType } from '@/models/Verb';
import ListVerbsService from '@/services/ListVerbsService';
import useVerbs from './useVerbs';

// Props returns
interface UseVerbSearchProps {
  verbs: Verb[];
  textSearch: string;
  setTextSearch: React.Dispatch<React.SetStateAction<string>>;
  verbTypeFilter: VerbTypeType | '';
  setVerbTypeFilter: React.Dispatch<React.SetStateAction<VerbTypeType | ''>>;
  searchKey: keyof Verb;
  setSearchKey: React.Dispatch<React.SetStateAction<keyof Verb>>;
  service: ListVerbsService | null;
}

/**
 * Hook para manejar la búsqueda de verbos.
 *
 * @returns {UseVerbSearchProps} Objeto con las propiedades y métodos para manejar la búsqueda de verbos.
 */
const useVerbSearch = (): UseVerbSearchProps => {
  // Hook padre
  const { verbs, setVerbs, listVerbsService: service } = useVerbs();

  // States
  const [textSearch, setTextSearch] = useState('');
  const [verbTypeFilter, setVerbTypeFilter] = useState<VerbTypeType | ''>('');
  const [searchKey, setSearchKey] = useState<keyof Verb>('simple_form');

  // Search effect
  useEffect(() => {
    // ? No hay servicio
    if (!service) return;

    const searchVerbs = async () => {
      try {
        // ? No hay texto de búsqueda
        if (!textSearch.trim() || textSearch === '') {
          // Get complete list with filters
          const list = await service.getAll();
          const filtered = list.filter((v) =>
            verbTypeFilter ? v.type === verbTypeFilter : true,
          );
          setVerbs(filtered);
          return;
        }

        // Get list
        const searchResults = await service.search(textSearch, searchKey);
        const filtered = searchResults.filter((v) =>
          verbTypeFilter ? v.type === verbTypeFilter : true,
        );
        setVerbs(filtered);
      } catch (error) {
        console.error('Error searching verbs:', error);
      }
    };

    // Timeout para debounce
    const timeout = setTimeout(() => {
      searchVerbs();
    }, 300);

    // Cleanup
    return () => clearTimeout(timeout);
  }, [textSearch, verbTypeFilter, searchKey, service, setVerbs]);

  // Return
  return {
    verbs,
    textSearch,
    setTextSearch,
    verbTypeFilter,
    setVerbTypeFilter,
    searchKey,
    setSearchKey,
    service,
  };
};

export default useVerbSearch;
