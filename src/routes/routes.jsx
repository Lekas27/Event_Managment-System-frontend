import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/home";
import { LoginPage } from "../pages/login";
import { RegisterPage } from "../pages/register";
import { PartiesPage } from "../pages/parties";
import { RootLayout } from "../layouts/main";
import { Party } from "../pages/party.jsx";
import { AdminLayout } from "../layouts/admin.jsx";
import { AdminUsers } from "../pages/admin/admin-users.jsx";
import { AdminEvents } from "../pages/admin/admin-events.jsx";
import { AdminRolesCategories } from "../pages/admin/admin-roles-categories.jsx";
import { AdminUsersChart } from "../pages/admin/admin-users-chart.jsx";
import { AboutUs } from "../pages/about-us.jsx";

import ErrorBoundaryWrapper from "../layouts/ErrorLayout.jsx";
import { AdminMap } from "../pages/admin/admin-map.jsx";
import { Error404 } from "../pages/error/error-404.jsx";
import { WentWrong } from "../pages/error/went-wrong.jsx";
import { CreateEventPage } from "../pages/create-event.jsx";
import {TodayEventsPage, WeekEventsPage} from "../pages/weekly-events.jsx";
import { CalendarPage } from "../pages/calendar.jsx";
import {UserPage} from "../pages/user.jsx";


export const router = createBrowserRouter([

  {
    path: "/",
    element: (
      <ErrorBoundaryWrapper>
        <RootLayout />
      </ErrorBoundaryWrapper>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/parties",
        element: <PartiesPage />,
      },
      {
        path: "/parties/:id",
        element: <Party />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/today",
        element: <TodayEventsPage />,
      },
      {
        path: "/week",
        element: <WeekEventsPage />,
      },
      {
        path: "/calendar",
        element: <CalendarPage />
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/create-event",
        element: <CreateEventPage />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      // <ErrorBoundaryWrapper>
        <AdminLayout />
      // </ErrorBoundaryWrapper>
    ),
    children: [
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "",
        element: <AdminUsers />,
      },
      {
        path: "events",
        element: <AdminEvents />,
      },
      {
        path: "categories",
        element: <AdminRolesCategories />,
      },
      {
        path: "roles",
        element: <AdminRolesCategories />,
      },
      {
        path: "users/chart",
        element: <AdminUsersChart />,
      },
      {
        path: "map",
        element: <AdminMap />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
  {
    path: "/error",
    element: <WentWrong />,
  },
]);
