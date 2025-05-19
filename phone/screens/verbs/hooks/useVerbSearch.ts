import { useEffect, useState } from "react";
import Verb, { VerbTypeType } from "@/models/Verb";
import ListVerbsService from "@/services/ListVerbsService";

const useVerbSearch = () => {
  const [verbs, setVerbs] = useState<Verb[]>([]);
  const [textSearch, setTextSearch] = useState("");
  const [verbTypeFilter, setVerbTypeFilter] = useState<VerbTypeType | "">("");
  const [searchKey, setSearchKey] = useState<keyof Verb>("simple_form");
  const [service, setService] = useState<ListVerbsService | null>(null);

  useEffect(() => {
    setService(new ListVerbsService());
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!service || !textSearch.trim()) return;

      const list = service
        .search(textSearch, searchKey)
        .filter((v) => (verbTypeFilter ? v.type === verbTypeFilter : true));
      setVerbs(list);
    }, 300);

    return () => clearTimeout(timeout);
  }, [textSearch, verbTypeFilter, searchKey, service]);

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
