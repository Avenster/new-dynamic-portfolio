import React, { useState, useEffect } from 'react';
import '../css/response.css';
import DynamicText from './DynamicText1';

const generateRandomName = () => {
  const adjectives = ['Vibrant', 'Elegant', 'Dynamic', 'Serene', 'Bold', 'Ethereal'];
  const nouns = ['Landscape', 'Portrait', 'Abstract', 'Composition', 'Masterpiece', 'Creation'];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective}_${randomNoun}_${Math.floor(Math.random() * 1000)}`;
};

export default function Response({ selectedArt, selectedTheme }) {
  const [generatedDesigns, setGeneratedDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const getLocalImages = async (art, theme) => {
    const themeMap = {
      'Minimalist': 'm',
      'Vintage': 'v',
      'Dark Mode': 'd'
    };
    const artMap = {
      'Anime/Manga': 'a',
      'Fantasy': 'f',
      'Pop Art': 'p'
    };

    const themePrefix = themeMap[theme] || theme.charAt(0).toLowerCase();
    const artPrefix = artMap[art] || art.charAt(0).toLowerCase();
    
    const imagePaths = [
      `/images/${themePrefix}&${artPrefix}.png`,
      `/images/${themePrefix}&${artPrefix}1.png`
    ];

    console.log('Attempting to load images:', imagePaths);

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => reject(`Failed to load image: ${src}`);
        img.src = src;
      });
    };

    const loadedImages = await Promise.all(
      imagePaths.map(path => loadImage(path).catch(err => {
        console.warn(err);
        return null;
      }))
    );

    return loadedImages.filter(Boolean);
  };

  const generateDesigns = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedDesigns([]); // Clear previous designs

    try {
      console.log('Generating designs for:', selectedTheme, selectedArt);
      
      // Delay for 5 seconds
      await new Promise(resolve => setTimeout(resolve, 5000));

      const images = await getLocalImages(selectedArt, selectedTheme);
      console.log('Loaded images:', images);
      if (images.length === 0) {
        throw new Error('No matching images found');
      }
      setGeneratedDesigns(images);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError(`Failed to fetch images: ${error.message}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setGeneratedDesigns([]);
  }, [selectedArt, selectedTheme]);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleDownload = (imageSrc) => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `${generateRandomName()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className='generate'>
    <div className='gen-main'>
      <div className='generated'>
        <span className='gen-txt'>Generated Portfolios</span>
        <div className='design-container'>
          {isLoading ? (
            <div className="loading-animation">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="loading-placeholder"></div>
              ))}
            </div>
          ) : (
            generatedDesigns.map((design, index) => (
              <img 
                key={index} 
                src={design} 
                alt={`Generated design ${index + 1}`} 
                className="generated-design" 
                onClick={() => handleImageClick(design)}
              />
            ))
          )}
        </div>
        <br />
        <button onClick={generateDesigns} className='generate-btn' disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Designs'}
        </button>
      </div>
      <div className='promt1'>
        <div className="responce-image"></div>
        <DynamicText/>
        {error && (
        <div 
          style={{ 
            color: "red", 
            display: "flex", 
            height: "6vh", 
            width: "100%",
            fontFamily: "Source Code Pro, monospace", 
            justifyContent: "center",
            alignItems: "center"
          }}
          className="error-message"
        >
          {error}
        </div>
      )}
        <button onClick={generateDesigns} className='generate-btn' disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Designs'}
        </button>
      </div>
      
    </div>
    
    {selectedImage && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={handleCloseModal}>&times;</span>
          <img src={selectedImage} alt="Selected design" className="modal-image" />
          <button className="download-btn" onClick={() => handleDownload(selectedImage)}>
            Download
          </button>
        </div>
      </div>
    )}
  </div>
);
}