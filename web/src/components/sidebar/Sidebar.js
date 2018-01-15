import React from 'react'

function Sidebar({
  closeButton,
  backButton
}) { 
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        Heading
      </div>
      <div className="sidebar-text">
        <p>1. I am an announcement!</p>
        <p>2. Obey me!</p>
        <p>3. I am an even longer announcement that will probably wrap, I think</p>
      </div>

    </div>
  )
}

export default Sidebar