import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import {
  ListsVerbsSliceType,
  updateAllVerbs,
  addVerbToList,
  removeVerbFromList,
  clearVerbList,
} from '@/redux/slices/verbsSlice';

/**
 * Hook para obtener y actualizar el estado de los verbos
 * @return { state, updateAllV, addVerb, removeVerb, clearList }
 */
export const useListVerbsApp = (): {
  state: ListsVerbsSliceType;
  updateAllV: (lists: ListsVerbsSliceType) => void;
  addVerb: (list: keyof ListsVerbsSliceType, verbId: number) => void;
  removeVerb: (list: keyof ListsVerbsSliceType, verbId: number) => void;
  clearList: (list: keyof ListsVerbsSliceType) => void;
} => {
  // Hooks
  const verbsState = useSelector((state: RootState) => state.stateListVerbs);
  const dispatch = useDispatch<AppDispatch>();

  const updateAllV = (lists: ListsVerbsSliceType) => {
    dispatch(updateAllVerbs(lists));
  };

  const addVerb = (list: keyof ListsVerbsSliceType, verbId: number) => {
    dispatch(addVerbToList({ list, verbId }));
  };

  const removeVerb = (list: keyof ListsVerbsSliceType, verbId: number) => {
    dispatch(removeVerbFromList({ list, verbId }));
  };

  const clearList = (list: keyof ListsVerbsSliceType) => {
    dispatch(clearVerbList(list));
  };

  return {
    state: verbsState,
    updateAllV,
    addVerb,
    removeVerb,
    clearList,
  };
};
