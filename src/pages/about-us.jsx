import { useTheme } from "../context/theme-context";

export const AboutUs = () => {
  const { theme } = useTheme();
  return (
    <div
      className="cont-padding min-h-scree"
      style={{
        backgroundColor:
          theme === "light" ? "var(--lightBgColor)" : "var(--bgColor)",
        color: theme === "light" ? "black" : "white",
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-purple-400">About Us</h1>
        <p className="text-lg mb-8">
          Welcome to the Event Management System – your ultimate destination for
          discovering and managing amazing events across the globe.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">🎉 What We Do</h2>
          <p className="">
            We help event organizers showcase their parties, festivals, and
            concerts to a wide audience, while making it easier for users to
            explore and plan unforgettable experiences. Our platform features
            indoor and outdoor events, real-time updates, and a modern,
            user-friendly interface.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-">🌍 Our Mission</h2>
          <p className="">
            We aim to bridge the gap between people and parties. Whether you're
            looking for your next rave or managing an upcoming psychedelic
            festival, we want to simplify how events are shared, found, and
            enjoyed.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 ">💡 Why Choose Us?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Global event coverage</li>
            <li>Modern, responsive design</li>
            <li>Clean UI and smooth experience</li>
            <li>Easy integration for organizers</li>
            <li>Real-time data & updates</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-">📫 Contact Us</h2>
          <p className=" mb-2">Got questions or want to collaborate?</p>
          <p className="text-purple-400">Email: contact@eventsystem.com</p>
        </div>
      </div>
    </div>
  );
};
