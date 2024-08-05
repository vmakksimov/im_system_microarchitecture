import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import { Tables } from "./pages/dashboard";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { AuthContext } from './context/AuthContext';
import { publicRoutes, privateRoutes } from "@/routes";
import { PrivateGuard } from "./guards/private-guard";
import AuthCallback from './services/auth-callback';
import { useLocalStorage } from './hooks/useLocalStorage';


function App() {
   
    const [user, setAuth] = useLocalStorage('access', {})
    const [completedCandidates, setCompletedCandidates] = useState([])
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const isAuthenticated = Object.keys(user).length > 0;
    const applicableRoutes = isAuthenticated ? privateRoutes : publicRoutes;


    const addCandidateHandler = (newCandidate) => {
        setCompletedCandidates(state => [
            ...state,
            newCandidate,
        ])
    }

    const editCandidateHandler = (candidateId, candidateData) => {
        setCompletedCandidates(state => state.map(x => x.id == candidateId ? candidateData : x))
    }
   

    const userLogin = (authData) => {
        setAuth(authData)
    }

    const userLogout = () => {
        setAuth({})
    }

    const token = localStorage.getItem('access')

    return (
        <AuthContext.Provider value={{userLogin, userLogout, token, isAuthenticated, addCandidateHandler, editCandidateHandler }}>
            {/* {!token.includes("no token") ?  */}
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
        {/* : userLogout()
        } */}
            
        </AuthContext.Provider>
    );
}

export default App;
