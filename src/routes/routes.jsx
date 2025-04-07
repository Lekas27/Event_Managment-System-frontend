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

import { AdminUsersChart } from "../pages/admin/admin-users-chart.jsx";
import { AboutUs } from "../pages/about-us.jsx";
import { UpdateParty } from "../pages/update-party.jsx";

import ErrorBoundaryWrapper from "../layouts/ErrorLayout.jsx";

import { Error404 } from "../pages/error/error-404.jsx";
import { WentWrong } from "../pages/error/went-wrong.jsx";
import { CreateEventPage } from "../pages/create-event.jsx";
import { TodayEventsPage, WeekEventsPage } from "../pages/weekly-events.jsx";
import { CalendarPage } from "../pages/calendar.jsx";
import { UserPage } from "../pages/user.jsx";
import { AdminPartiesStatistics } from "../pages/admin/admin-events-chart.jsx";
import { UserPageAdmin } from "../pages/user-page.jsx";

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
        path: "/user/:id",
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
        element: <CalendarPage />,
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
      { path: "update-event/:id", element: <UpdateParty /> },
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
        path: "users/:id",
        element: <UserPageAdmin />,
      },
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
        path: "users/chart",
        element: <AdminUsersChart />,
      },
      {
        path: "events/chart",
        element: <AdminPartiesStatistics />,
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
