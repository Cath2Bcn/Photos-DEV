//Bottom Upload images to server

import React from 'react';

const UploadButton = ({ onUpload, isDisabled }) => {
  return (
    <button
      onClick={onUpload}
      disabled={isDisabled}
      className="mt-4 bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded"
    >
      Upload Images
    </button>
  );
};

export default UploadButton;