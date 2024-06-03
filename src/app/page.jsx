"use client"

import { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ImageTagger from './components/ImageTagger';
import UploadButton from './components/UploadButton';
import UrlTextarea from './components/UrlTextarea';
import { toBase64 } from './utils/toBase64';

export default function Home() {
  const [images, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState('file'); // 'file' or 'url'

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imagesWithTags = files.map(file => ({
      file,
      name: file.name,
      size: file.size,
      tags: [],
      path: `local:${file.name}` // Ruta local del archivo
    }));
    setImages(imagesWithTags);
  };

  const handleUrlUpload = (urlInput) => {
    const urls = urlInput.split('\n').filter(url => url.trim() !== '');
    const imagesWithTags = urls.map(url => ({
      file: null,
      name: url,
      size: null,
      tags: [],
      url,
      path: url // Ruta de la URL
    }));
    setImages(imagesWithTags);
  };


  const handleAddTag = (index, tag) => {
    if (tag.trim() === '') return;
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

  const handleUploadToServer = async () => {
    const payload = await Promise.all(images.map(async (image) => ({
      name: image.name,
      image: image.file ? await toBase64(image.file) : image.url,
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
        <div className="flex justify-center mb-4">
          <button onClick={() => setActiveTab('file')} className={`px-4 py-2 ${activeTab === 'file' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Subir Archivo</button>
          <button onClick={() => setActiveTab('url')} className={`px-4 py-2 ${activeTab === 'url' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Subir URL</button>
        </div>
        {activeTab === 'file' ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <UrlTextarea onUrlUpload={handleUrlUpload} />
        )}
        {images.map((image, index) => (
          <ImageTagger key={index} image={image} index={index} onAddTag={handleAddTag} />
        ))}
        <UploadButton onUpload={handleUploadToServer} isDisabled={images.length === 0} />
      </div>
    </div>
  );
}