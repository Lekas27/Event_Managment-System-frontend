import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export const PartyMap = ({ latLongs, names, locations, className, isAdmin=false }) => {
  if (!latLongs || latLongs.length === 0) return <p>No locations available</p>;

  return (
      <MapContainer
          center={[latLongs[0][0], latLongs[0][1]]}
          zoom={10}
          style={!isAdmin ? { height: "400px", width: "100%" } : { height: "100%", width: "100%" }}
          className={className}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {latLongs.map((latLong, index) => (
            <Marker key={index} position={[latLong[0], latLong[1]]}>
              <Popup>
                <strong>{names[index]}</strong> <br />
                {locations[index]}
              </Popup>
            </Marker>
        ))}
      </MapContainer>
  );
};
