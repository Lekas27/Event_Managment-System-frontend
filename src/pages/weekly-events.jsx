import { useParties } from "../hooks/use-parties";
import { CardComponent } from "../components/card";
import { useTheme } from "../context/theme-context";

const isSameDay = (date1, date2) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const isWithinNext7Days = (date) => {
  const now = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(now.getDate() + 7);
  return date >= now && date <= nextWeek;
};

export const TodayEventsPage = () => {
  const { parties, isLoading } = useParties();
  const today = new Date();
  const { theme } = useTheme();

  const todayEvents = parties.filter((party) =>
    isSameDay(new Date(party.dateStart), today)
  );

  return (
    <div
      className="container-fluid mx-auto px-4 py-8 text-white min-h-screen "
      style={{
        backgroundColor:
          theme === "light" ? "var(--lightBgColor)" : "var(--bgColor)",
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">
        Events Today
      </h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : todayEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {todayEvents.map((party) => (
            <CardComponent
              key={party.id}
              title={party.nameParty}
              organizer={party.nameOrganizer}
              image={party.urlImageFull}
              dateStart={party.dateStart}
              dateEnd={party.dateEnd}
              id={party.id}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No events today.</p>
      )}
    </div>
  );
};

export const WeekEventsPage = () => {
  const { parties, isLoading } = useParties();
  const { theme } = useTheme();
  const weekEvents = parties.filter((party) =>
    isWithinNext7Days(new Date(party.dateStart))
  );

  return (
    <div
      className="container-fluid mx-auto px-4 py-8 text-white min-h-screen"
      style={{
        backgroundColor:
          theme === "light" ? "var(--lightBgColor)" : "var(--bgColor)",
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">
        Events This Week
      </h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : weekEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {weekEvents.map((party) => (
            <CardComponent
              key={party.id}
              title={party.nameParty}
              organizer={party.nameOrganizer}
              image={party.urlImageFull}
              dateStart={party.dateStart}
              dateEnd={party.dateEnd}
              country={party.nameCountry}
              city={party.nameTown}
              id={party.id}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No events this week.</p>
      )}
    </div>
  );
};
