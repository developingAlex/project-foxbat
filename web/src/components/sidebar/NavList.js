import React from 'react'
import Button from '../Button';

function NavList({
  displayItems,
  pictureItems,
  modelObjects,
  onSelect
}) {

  return (
    <div className="instrument-list">
      { 
        !!modelObjects ? (
          modelObjects.map((object, index) => (
            <Button 
              key={ index }
              text={ object.name }
              image= {!!object.pictureURL ? object.pictureURL : ''}
              onToggle={ ()=>{ onSelect(object) } }
              />
            ))
        ) : (
          displayItems.map((item, index) => (
            <Button 
              key={ index }
              text={ item }
              // image= {validPicturesIncluded ? pictureItems[index] : ''}
              onToggle={ ()=>{ onSelect(item) } }
              />
            ))
        )
      }
    </div>
  )
}

export default NavList