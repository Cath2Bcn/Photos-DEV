"use client"

import { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ImageTagger from './components/ImageTagger';
import UploadButton from './components/UploadButton';

export default function Home() {
  const [images, setImages] = useState([]);

  // This function will be triggered on file input change
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imagesWithTags = files.map(file => ({
      file,
      name: file.name,
      size: file.size,
      tags: []
    }));
    setImages(imagesWithTags);
  };

  // Convert a file to a Base64 string
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleAddTag = (index, tag) => {
    if (tag.trim() === '') return; // Prevent adding empty tags
    const updatedImages = images.map((image, idx) => {
      if (idx === index) {
        return {
          ...image,
          tags: [...image.tags, tag]
        };
      }
      return image;
    });
    setImages(updatedImages);
  };

  // Modified to convert images to Base64 before uploading
  const handleUploadToServer = async () => {
    const payload = await Promise.all(images.map(async (image) => ({
      name:image.name,
      image: await toBase64(image.file),
      tags: image.tags,
    })));

    try {
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 rounded-lg shadow-lg bg-white">
        <h1 className="text-lg font-semibold text-center mb-4">Sube tu imagen</h1>
        <ImageUploader onImageUpload={handleImageUpload} />
        {images.map((image, index) => (
          <ImageTagger key={index} image={image} index={index} onAddTag={handleAddTag} />
        ))}
        <UploadButton onUpload={handleUploadToServer} isDisabled={images.length === 0} />
      </div>
    </div>
  );
}