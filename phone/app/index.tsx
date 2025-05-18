import React from "react";

// Components
import Main from "./Main";
import AppProvider from "@/providers/AppProvider";

// Location
import "@/i18n";

/**
 *
 * Component index in the application
 *
 * @return {TSX.Component}
 */
const Index: React.FC = () => {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
};

export default Index;
