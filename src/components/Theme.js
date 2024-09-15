import React from 'react'


export default function Theme({ selectedTheme, setSelectedTheme }) {
  const themes = [
    {
      name: "Minimalist",
      image: "./min.png",
      description: "Clean, simple designs with a focus on the artwork itself.",
      details: "Limited color palette, lots of whitespace, and geometric shapes."
    },
    {
      name: "Vintage",
      image: "./vintage.png",
      description: "Uses textures and design elements from the past (1950s, 1980s, etc.).",
      details: "Warm tones, grainy textures, and retro fonts."
    },
    {
      name: "Dark Mode",
      image: "./minimal.png",
      description: "Sleek, modern theme with dark backgrounds that make vibrant colors pop.",
      details: "Ideal for digital and 3D artists."
    }
  ];
  return (
    <div className="main-theme">
      <div className="themetxt">
        <h1>Theme</h1>
        <p>Choose the theme that you want...</p>
      </div>
      <div className="theme-main">
        {themes.map((theme, index) => (
          <div key={index} className={`theme${index + 1}`} onClick={() => setSelectedTheme(theme.name)}>
            <img src={theme.image} alt="" />
            <div className={`theme${index + 1}-content`}>
              <h2>{theme.name}</h2>
              <p>{theme.description}</p>
              <p>{theme.details}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="themebtn">
        <button className='theme-bt' disabled={!selectedTheme}>
          {selectedTheme ? `Selected: ${selectedTheme}` : 'Select'} <span className='right-br'> </span>
        </button>
      </div>
    </div>
  )
}
