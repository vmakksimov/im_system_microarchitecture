import { Tables, Notifications } from "@/pages/dashboard";
import { Home, SignIn, SignUp, SetPassword } from "@/pages";
import Logout from "./pages/logout";
import AuthCallback from "./services/auth-callback";

export const publicRoutes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "sign-in",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    name: "sign-up",
    path: "/sign-up",
    element: <SignUp />,
  },

];

export const privateRoutes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "dashboard",
    path: "/tables",
    element: <Tables />,
  },
  {
    name: "set-password",
    path: "/api/set-password",
    element: <SetPassword />,
  },
  {
    name: "logout",
    path: "/logout",
    element: <Logout />,
  },
  // {
  //   name: "notifications",
  //   path: "/notifications",
  //   element: <Notifications />,
  // },
];

export default { publicRoutes, privateRoutes };
