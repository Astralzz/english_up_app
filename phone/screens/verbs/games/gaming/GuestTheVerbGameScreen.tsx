import React from 'react';
import ScreenWrapper from '@/components/screens/ScreenWrapper';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import {
  VerbsStackParamAllList,
  VerbsStackParamGamesList,
} from '@/screens/verbs/VerbsStack';

/**
 *
 * Guest the verb game screen
 *
 * @return {TSX.Component}
 */
const GuestTheVerbGameScreen: React.FC = () => {
  return (
    <ScreenWrapper>
      <Text>GuestTheVerbGameScreen</Text>
    </ScreenWrapper>
  );
};

export default GuestTheVerbGameScreen;
