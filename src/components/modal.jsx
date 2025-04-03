export const Modal = ({ isOpen, onClose, party }) => {
    if (!isOpen || !party) return null;
  
    return (
      <div className="fixed inset-0 bg-#333 bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
       
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white font-bold text-xl hover:text-purple-700 cursor-pointer"
          >
            &times;
          </button>
  
          {/* Image */}
          <img
            src={party.urlImageFull}
            alt={party.nameParty}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
  
          {/* Details */}
          <h2 className="text-2xl font-bold mb-2 text-purple-600">{party.nameParty}</h2>
          <p className="text-sm text-purple-400 mb-1">
           <span className="text-gray-500"> Organized by: </span> <span className="font-semibold">{party.nameOrganizer}</span>
          </p>
          <p className="text-sm text-purple-400 mb-1"><span className="text-gray-500">Type: </span>{party.nameType}</p>
          <p className="text-sm text-purple-400 mb-1">
            <span className="text-gray-500">Start: </span> {new Date(party.dateStart).toLocaleString()}
          </p>
          <p className="text-sm text-purple-400 mb-1">
            <span className="text-gray-500">End: </span> {new Date(party.dateEnd).toLocaleString()}
          </p>
          <p className="text-sm text-purple-400 mb-1">
            <span className="text-gray-500">Location: </span> {party.nameTown}, {party.nameCountry}
          </p>
  
          {party.urlOrganizer && (
  <div className="mt-4">
    <p className="text-sm font-semibold text-purple-700 mb-1">Web:</p>
    <div className="flex flex-col gap-1">
      {party.urlOrganizer
        .split(",")
        .map((url, idx) => {
          const cleanUrl = url.trim();
          const fullUrl = cleanUrl.startsWith("http")
            ? cleanUrl
            : `https://${cleanUrl}`;
          return (
            <a
              key={idx}
              href={fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-600 text-sm cursor-pointer"
            >
              {cleanUrl}
            </a>
          );
        })}
    </div>
  </div>
)}

        </div>
      </div>
    );
  };
  