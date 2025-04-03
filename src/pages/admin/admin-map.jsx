import { useParties } from "../../hooks/use-parties.js";
import { PartyMap } from "../../components/party-map.jsx";

export const AdminMap = () => {
    const { parties, isLoading } = useParties();

    return (
        <div className={"w-full"} style={{height: "75vh"}}>
            {
                !isLoading && parties && (
                    <PartyMap
                        latLongs={parties.map(p => [p.geoLat, p.geoLon])}
                        names={parties.map(p => p.nameParty)}
                        locations={parties.map(p => [[p.nameTown, p.nameCountry]])}
                        isAdmin={true}
                        className={"z-10"}
                    />
                )
            }
        </div>
    );
};
