import React, { useEffect, useState } from 'react';
import { useTransitionApp } from '@/hooks/useTransitionApp';
import VerbList from '../components/VerbList';
import VerbsLayout from '../layouts/VerbsLayout';
import useVarsScreenDefault from '@/hooks/useVarsScreenDefault';
import useVerbs from '../hooks/useVerbs';

/**
 *
 * Verbs screen in the app
 *
 * @return {TSX.Component}
 */
const VerbListScreen: React.FC = () => {
  // Hook padre
  const { verbs, refreshVerbs } = useVerbs();

  // Data
  const [error, setError] = useState<string | undefined>(undefined);

  // Hooks
  const { colors, isThemeDark, t } = useVarsScreenDefault();

  // Transition hook
  const [isPending, getListVerbs] = useTransitionApp({
    fn: React.useCallback(async () => {
      try {
        await refreshVerbs();
        // ! Error
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Error desconocido';
        setError(`Hubo un error al cargar los verbos, ${errorMessage}`);
      }
    }, [refreshVerbs]),
  });

  // Initial effect
  useEffect(() => {
    verbs.length === 0 && getListVerbs();
  }, [getListVerbs, verbs.length]);

  return (
    <VerbsLayout
      isPending={{
        loading: isPending,
        message: 'Cargando verbos',
      }}
      error={error}
      t={t}
    >
      <VerbList verbs={verbs} colors={colors} isThemeDark={isThemeDark} />
    </VerbsLayout>
  );
};

export default VerbListScreen;
