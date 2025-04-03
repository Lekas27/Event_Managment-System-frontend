import { useParties } from "../hooks/use-parties";
import { Slider } from "../components/slider.jsx";
import { NewsFeed } from "../components/news-feed.jsx";
import { UpcomingEvents } from "../components/upcoming-events.jsx";
import { TopEvents } from "../components/top-events.jsx";
import { SpinLoader } from "../components/spin-loader.jsx";
import { useTheme } from "../context/theme-context.jsx";
import "./home.css";

export const HomePage = () => {
  const { parties, isLoading } = useParties();
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-bgColor text-white">
        <SpinLoader />
      </div>
    );
  }

  return (
    <div
      className={`cont-padding mx-auto min-h-scree overflow-hidden ${
        theme == "light" ? "text-gray-900" : "text-white"
      }`}
      style={{
        backgroundColor:
          theme === "light" ? "var(--lightBgColor)" : "var(--bgColor)",
      }}
    >
      {/* Header */}
      <header className="mb-12">
        <h1
          className={`text-4xl font-bold text-center mb-4 ${
            theme == "light" ? "text-purple-900" : "text-purple-400"
          }`}
        >
          Event Management System
        </h1>
        <p className="text-xl text-center text-white-400">
          Discover amazing events happening worldwide
        </p>
      </header>

      {/* Slider & NewsFeed Section */}
      <div className="flex flex-col lg:flex-row gap-8 ">
        <Slider parties={parties} />
        <NewsFeed parties={parties} />
      </div>
      {/* Top Events Section */}
      <TopEvents events={parties} />
      {/* Upcoming Events Section */}
      <UpcomingEvents parties={parties} />
    </div>
  );
};
