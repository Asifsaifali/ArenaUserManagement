import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Users from "./pages/dashboard/users";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import Contact from "./pages/Hero/Contact";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "users",
        path: "/users",
        element: <Users/>,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    title: "About Us",
    layout: "dashboard",
    pages: [
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Contact",
         path: "/contact",
        element: <Contact />,
      },
      
    ],
  },
];

export default routes;
