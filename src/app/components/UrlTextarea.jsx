import React, {useState} from 'react';

const UrlTextarea = ({ onUrlUpload }) => {
  const [urlInput, setUrlInput] = useState('');

  const handleUrlUpload = () => {
      onUrlUpload(urlInput);
      setUrlInput(''); // Limpiar el input después de cargar la URL
  };

  return (
      <div>
          <textarea
              className="w-full p-2 border rounded mb-4"
              rows="4"
              placeholder="Inserta URLs, una por línea"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
          />
          <button onClick={handleUrlUpload} className="px-4 py-2 bg-blue-500 text-white rounded">Cargar URLs</button>
      </div>
  );
};
export default UrlTextarea;