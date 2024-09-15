import React from 'react'

export default function Art({ selectedArt, setSelectedArt }) {
  const artStyles = [
    {
      name: "Anime/Manga",
      image: "./anime.png",
      description: "Features bold lines, stylized characters, and exaggerated facial expressions.",
      details: "A popular choice for illustrators and fans of Japanese art styles."
    },
    {
      name: "Fantasy",
      image: "./art.png",
      description: "Often features mythical creatures, epic landscapes, and magical elements.",
      details: "Great for artists with a love for imaginative, otherworldly themes."
    },
    {
      name: "Pop Art",
      image: "./car.png",
      description: "Bright, bold colors and imagery inspired by popular culture, advertising, and comic books.",
      details: "A fun, vibrant style perfect for contemporary artists."
    }
  ];
  return (
    <div className="main-theme-1">
    <div className="themetxt">
      <h1>Art Style</h1>
      <p>Choose the art style that suits you...</p>
    </div>
    <div className="theme-main">
      {artStyles.map((style, index) => (
        <div key={index} className={`theme${index + 1}`} onClick={() => setSelectedArt(style.name)}>
          <img src={style.image} alt="" />
          <div className={`theme${index + 1}-content`}>
            <h2>{style.name}</h2>
            <p>{style.description}</p>
            <p>{style.details}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="themebtn">
      <button className='theme-bt' disabled={!selectedArt}>
        {selectedArt ? `Selected: ${selectedArt}` : 'Select'} <span className='right-br'> </span>
      </button>
    </div>
  </div>
  )
}
