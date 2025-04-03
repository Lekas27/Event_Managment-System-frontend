import { useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useParties } from "../hooks/use-parties";
import { SpinLoader } from "../components/spin-loader";
import { CustomToolbar } from "../components/custom-toolbar";
import "./calendar.css";
import { useTheme } from "../context/theme-context";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const CalendarPage = () => {
  const { parties, isLoading } = useParties();
  const { theme } = useTheme();
  const [view, setView] = useState(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = useMemo(() => {
    return parties.map((party) => ({
      title: party.nameParty,
      start: new Date(party.dateStart),
      end: new Date(party.dateEnd),
      resource: party,
    }));
  }, [parties]);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

  return (
    <div
      className="calendar min-h-screen bg-bgColor text-white p-6"
      style={{
        backgroundColor:
          theme === "light" ? "var(--lightBgColor)" : "var(--bgColor)",
      }}
    >
      <h1 className="text-3xl font-bold text-center text-purple-400 mb-8">
        Event Calendar
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen bg-bgColor">
          <SpinLoader />
        </div>
      ) : (
        <div className="bg-gray-900 rounded-lg p-4">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            popup
            view={view}
            date={currentDate}
            onView={handleViewChange}
            onNavigate={handleNavigate}
            components={{
              toolbar: (props) => <CustomToolbar {...props} />,
            }}
          />
        </div>
      )}
    </div>
  );
};
