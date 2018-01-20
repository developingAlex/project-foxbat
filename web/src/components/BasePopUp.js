import React from 'react'
import RoundExitButton from './RoundExitButton';

function BasePopUp({ children, onExit, errMsg }) {
  console.log("onExit", onExit)
  return (
    <div className="base-popup">
      <RoundExitButton
        onToggle = { (event) => {
          onExit()
        } }
      />
      { !!errMsg &&
        <div className="errmsg">
          <p>{ errMsg }</p>
        </div>
      }
      { children }
    </div>
  )
}

export default BasePopUp