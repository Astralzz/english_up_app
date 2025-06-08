import React, { useEffect, useState } from 'react';
import { globaListVerbsService } from '@/services/ListVerbsService';
import { useThemeApp } from '@/hooks/useThemeApp';
import { useTransitionApp } from '@/hooks/useTransitionApp';
import VerbList from '../components/VerbList';
import Verb from '@/models/Verb';
import VerbsLayout from '../layouts/VerbsLayout';

/**
 *
 * Verbs screen in the app
 *
 * @return {TSX.Component}
 */
const VerbListScreen: React.FC = () => {
  // Data
  const [verbs, setVerbs] = useState<Verb[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  // Hooks
  const {
    state: { colors, isThemeDark },
  } = useThemeApp();

  // Transition hook
  const [isPending, getListVerbs] = useTransitionApp({
    fn: React.useCallback(async () => {
      try {
        // Obtenemos
        const allVerbs = globaListVerbsService.getAll();

        // Validamos que sea un array válido
        if (!Array.isArray(allVerbs) || allVerbs.length === 0) {
          setError('No se encontraron verbos.');
          return;
        }

        // Asignamos
        setVerbs(allVerbs);

        // ! Error
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Error desconocido';
        setError(`Hubo un error al cargar los verbos, ${errorMessage}`);
      }
    }, []),
  });

  // Initial effect
  useEffect(() => {
    verbs.length === 0 && getListVerbs();
  }, [getListVerbs, verbs.length]);

  return (
    <VerbsLayout
      routeName='VerbsList'
      service={globaListVerbsService}
      isPending={{
        loading: isPending,
        message: 'Cargando verbos',
      }}
      error={error}
    >
      <VerbList verbs={verbs} colors={colors} isThemeDark={isThemeDark} />
    </VerbsLayout>
  );
};

export default VerbListScreen;
