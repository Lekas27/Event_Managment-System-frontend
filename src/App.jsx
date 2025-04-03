import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import {useEffect} from "react";
import ReactGA from 'react-ga4';

function App() {
  useEffect(() => {
    ReactGA.initialize('G-6KRCB2S2P0');
    ReactGA.send("pageview");
  }, []);
  return (
        <>
          <RouterProvider router={router} />
          </>
  );
}

export default App;
