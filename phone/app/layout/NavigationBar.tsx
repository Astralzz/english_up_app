import React, { ReactNode } from 'react';
import { BottomNavigation } from 'react-native-paper';

// Props
interface NavigationBarProps {
  children?: ReactNode;
}

/**
 *
 * NoFount screen in the app
 *
 * @return {TSX.Component}
 */
const NavigationBar: React.FC<NavigationBarProps> = ({ children }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'music',
      title: 'Favorites',
      focusedIcon: 'heart',
      unfocusedIcon: 'heart-outline',
    },
    { key: 'albums', title: 'Albums', focusedIcon: 'album' },
    { key: 'recents', title: 'Recents', focusedIcon: 'history' },
    {
      key: 'notifications',
      title: 'Notifications',
      focusedIcon: 'bell',
      unfocusedIcon: 'bell-outline',
    },
  ]);

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={({ route, jumpTo }) => <></>}
    />
  );
};

export default NavigationBar;
