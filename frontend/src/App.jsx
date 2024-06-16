import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import { Dashboard } from "./layouts";
import { Tables } from "./pages/dashboard";


function App() {
  const { pathname } = useLocation();

  return (
    <>
      {(pathname == "/home") && (
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar routes={routes} />
         
        </div>
      )
      }
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/tables/*" element={ <Tables />} />
      </Routes>
    </>
  );
}

export default App;
