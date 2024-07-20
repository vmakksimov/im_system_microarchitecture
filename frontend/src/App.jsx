import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import { Tables } from "./pages/dashboard";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { AuthContext } from './context/AuthContext';
import { publicRoutes, privateRoutes } from "@/routes";
import { PrivateGuard } from "./guards/private-guard";
import AuthCallback from './services/auth-callback';


function App() {
   

    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const isAuthenticated = Boolean(localStorage.getItem("authToken"));
    const applicableRoutes = isAuthenticated ? privateRoutes : publicRoutes;

    console.log('aplicable', applicableRoutes)
    function handleClick() {
        dispatch(amountAdded(10));
    }

    const userLogin = (authData) => {
        setAuth(authData)
    }

    const userLogout = () => {
        setAuth({})
    }

    return (
        <AuthContext.Provider value={{userLogin, userLogout, isAuthenticated }}>
            <>
                {(pathname == "/home") && (
                    <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
                        <Navbar routes={applicableRoutes} />

                    </div>
                )
                }
                <Routes>
                    {publicRoutes.map(({ path, element }, key) => (
                        <Route key={key} exact path={path} element={element} />
                    ))}

                    {privateRoutes.map(({ path, element }, key) => (
                        <Route key={key} path={path} element={<PrivateGuard>{element}</PrivateGuard>} />
                    ))}

                    <Route path="*" element={<Navigate to="/home" replace />} />
                   
                        <Route path="/tables/*" element={<Tables />} />
                        <Route path="/auth/callback" element={<AuthCallback />} />
                   


                </Routes>
            </>
        </AuthContext.Provider>
    );
}

export default App;
