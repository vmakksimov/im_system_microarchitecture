import { Tables, Notifications } from "@/pages/dashboard";
import { Home, SignIn, SignUp } from "@/pages";
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
  {
    name: "auth-callback",
    path: "/auth/callback",
    element: <AuthCallback />,
  },
];

export const privateRoutes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "tables",
    path: "/tables",
    element: <Tables />,
  },
  {
    name: "notifications",
    path: "/notifications",
    element: <Notifications />,
  },
];

export default { publicRoutes, privateRoutes };
