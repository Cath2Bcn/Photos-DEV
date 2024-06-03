import React, { useEffect, useState } from 'react';

export default function GalleryWithFetch() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images'); // Cambia esta URL a la de tu API
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        <div key={index} className="gallery-item">
          {image.file && (
            <img src={URL.createObjectURL(image.file)} alt={image.name} className="thumbnail" />
          )}
          {image.url && (
            <img src={image.url} alt={image.name} className="thumbnail" />
          )}
          <div className="tags">
            {image.tags.map((tag, idx) => (
              <span key={idx} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


