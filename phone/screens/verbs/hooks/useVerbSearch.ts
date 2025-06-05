import { useEffect, useState } from "react";
import Verb, { VerbTypeType } from "@/models/Verb";
import ListVerbsService from "@/services/ListVerbsService";

// Props returns
interface UseVerbSearchProps {
  verbs: Verb[];
  textSearch: string;
  setTextSearch: React.Dispatch<React.SetStateAction<string>>;
  verbTypeFilter: VerbTypeType | "";
  setVerbTypeFilter: React.Dispatch<React.SetStateAction<VerbTypeType | "">>;
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
    if (!textSearch.trim() || textSearch === "") {
      // Get complete list with filters
      const list = service
        .getAll()
        .filter((v) => (verbTypeFilter ? v.type === verbTypeFilter : true));
      setVerbs(list);
      return;
    }

    // Timeout
    const timeout = setTimeout(() => {
      // Get list
      const list = service // Get service
        .search(textSearch, searchKey) // Search
        .filter((v) => (verbTypeFilter ? v.type === verbTypeFilter : true)); // Filter
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
