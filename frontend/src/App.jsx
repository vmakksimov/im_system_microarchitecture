import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import { Tables } from "./pages/dashboard";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import routes from "@/routes";
import AuthCallback from './services/auth-callback';


function App(){
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  function handleClick() {
    dispatch(amountAdded(10));
  }
  
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
        <Route path="/tables/*" element={<Tables />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        
      
      </Routes>
    </>
  );
}

export default App;
