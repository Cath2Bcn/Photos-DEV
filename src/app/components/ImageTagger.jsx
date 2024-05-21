//To add tags to images

import React from 'react';

const ImageTagger = ({ image, index, onAddTag }) => {
  return (
    <div key={index} className="mt-4">
      <p className="text-gray-800">{image.name} - {image.size} bytes</p>
      <div className="flex flex-wrap gap-2 my-2">
        {image.tags.map((tag, tagIndex) => (
          <span key={tagIndex} className="bg-gray-200 rounded-full text-sm text-gray-800 px-2 py-1">
            {tag}
          </span>
        ))}
      </div>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onAddTag(index, e.target.value);
            e.target.value = ''; // Clear input after adding tag
          }
        }}
        placeholder="Presiona Enter para añadir tag"
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default ImageTagger;