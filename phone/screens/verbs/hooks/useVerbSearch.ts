import { useEffect, useState } from "react";
import Verb, { VerbTypeType } from "@/models/Verb";
import ListVerbsService from "@/services/ListVerbsService";

/**
 * Hook para manejar la búsqueda de verbos.
 * 
 * @returns {Object} Objeto con las propiedades y métodos para manejar la búsqueda de verbos.
 */
const useVerbSearch = () => {

  // States
  const [verbs, setVerbs] = useState<Verb[]>([]);
  const [textSearch, setTextSearch] = useState("");
  const [verbTypeFilter, setVerbTypeFilter] = useState<VerbTypeType | "">("");
  const [searchKey, setSearchKey] = useState<keyof Verb>("simple_form");
  const [service, setService] = useState<ListVerbsService | null>(null);

  // Effects
  useEffect(() => {
    setService(new ListVerbsService());
  }, []);

  // Search effect
  useEffect(() => {
    // ? No hay servicio
    if (!service) return;
    
    // ? No hay texto de búsqueda
    if (!textSearch.trim()) return;
    
    // Timeout
    const timeout = setTimeout(() => {
      const list = service
        .search(textSearch, searchKey)
        .filter((v) => (verbTypeFilter ? v.type === verbTypeFilter : true));
      setVerbs(list);
    }, 300);

    // Cleanup
    return () => clearTimeout(timeout);
  }, [textSearch, verbTypeFilter, searchKey, service]);

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
