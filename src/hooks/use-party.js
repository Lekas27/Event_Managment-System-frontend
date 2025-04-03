import { useEffect, useState } from "react";
import { partiesService } from "../services/parties-service";
import { useParams } from "react-router-dom"; // Za dohvat ID-a iz URL-a

export const useParty = () => {
  const { id } = useParams();
  const [party, setParty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParty = async () => {
      try {
        const data = await partiesService.getPartiesById(id);
        setParty(data.party);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchParty();
  }, [id]);
  return { party, loading, error };
};
