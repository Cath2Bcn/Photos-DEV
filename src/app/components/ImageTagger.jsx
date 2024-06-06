import React, { useState } from 'react';

export default function ImageTagger({ image, index, onAddTag }) {
  const [tag, setTag] = useState('');

  const handleAddTag = () => {
    onAddTag(index, tag);
    setTag('');
  };

  return (
    <div className="image-tagger">
      {image.file && (
        <img src={URL.createObjectURL(image.file)} alt={image.name} className="thumbnail" />
      )}
      {image.url && (
        <img src={image.url} alt={image.name} className="thumbnail" />
      )}
      <div>
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Add a tag"
        />
        <button onClick={handleAddTag}>Add Tag</button>
      </div>
      <div>
        {image.tags.map((tag, idx) => (
          <span key={idx} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

