import "./App.css";
import "./index.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/soho-light/theme.css";
import Template from "./components/Template";

import Routers from "./routes";

function App() {
  return (
    <PrimeReactProvider>
      <Template>
        <Routers />
      </Template>
    </PrimeReactProvider>
  );
}

export default App;
