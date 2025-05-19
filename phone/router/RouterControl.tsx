import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import NavigationMenu from "@/components/navigation/NavigationMenu";
import ROUTES_MENU_APP from "./routerlist";
import { RootStackParamList } from "@/types/navigation";
import NavigationHeader from "@/components/navigation/NavigationHeader";

const Drawer = createDrawerNavigator<RootStackParamList>();

const RouterControl: React.FC = () => (
  <Drawer.Navigator
    drawerContent={(props) => <NavigationMenu {...props} />}
    initialRouteName="Home"
    screenOptions={{
      header: (props) => <NavigationHeader {...props} />,
      drawerPosition: "right",
      drawerType: "front", // Tipo de comportamiento
      // headerShown: false // Ocultar headers
    }}
  >
    {ROUTES_MENU_APP.map(({ name, Component, options }, i) => (
      <Drawer.Screen
        key={i}
        name={name}
        component={Component}
        options={options}
      />
    ))}
  </Drawer.Navigator>
);

export default RouterControl;
