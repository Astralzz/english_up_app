import React from 'react';
import { FlatList } from 'react-native';
import { ColorsAppType } from '@/theme/colors';
import Verb from '@/models/Verb';
import VerbCard from './VerbCard';
import VerbDetails from './VerbDetails';
import ModalDefault from '@/components/modals/ModalDefault';

// Props
interface VerbListProps {
  verbs: Verb[];
  colors: ColorsAppType;
  isThemeDark: boolean;
}

/**
 * Componente que muestra una lista de verbos.
 *
 * @param {Object} props - Props del componente.
 * @param {Verb[]} props.verbs - Lista de verbos a mostrar.
 * @param {ColorsAppType} props.colors - Colores de la aplicación.
 * @returns {TSX.Element} Componente VerbList.
 */
const VerbList = ({ verbs, colors, isThemeDark }: VerbListProps) => {
  // State
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [selectedVerb, setSelectedVerb] = React.useState<Verb | null>(null);

  // View verb details
  const viewVerb = React.useCallback((verb: Verb) => {
    setSelectedVerb(verb);
    setShowModal(true);
  }, []);

  // Close modal
  const closeModal = React.useCallback(() => {
    setShowModal(false);
    setSelectedVerb(null);
  }, []);

  return (
    <>
      {/* FlatList */}
      <FlatList
        data={verbs}
        keyExtractor={(item) => item.no.toString()}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <VerbCard verb={item} colors={colors} viewVerb={viewVerb} />
        )}
      />
      {/* Modal */}
      <ModalDefault
        visible={showModal}
        onClose={closeModal}
        title={`${selectedVerb?.simple_form || 'N/A'}`}
      >
        <VerbDetails
          verb={selectedVerb}
          onClose={closeModal}
          colors={colors}
          isThemeDark={isThemeDark}
        />
      </ModalDefault>
    </>
  );
};

export default VerbList;
