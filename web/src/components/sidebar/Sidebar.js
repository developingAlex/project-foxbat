import React from 'react'
import Button from '../Button';
import ExitButton from '../ExitButton';
import InstrumentList from './InstrumentList';
import SidebarText from './SidebarText';
import './sidebar.css';

function Sidebar({
  exitButton,
  backButton,
  instruments,
  selectedSlot, 
  selectedInstrumentType,
  selectedInstrumentBrand,
  onSelect
}) { 
  let topHeading
  if (!selectedSlot) {
    topHeading = "Nothing is selected"
  }
  else if (!!selectedSlot && !selectedInstrumentType) {
   topHeading = "Select an instrument type"
   console.log(topHeading)

  }
  else if (!!selectedSlot && !!selectedInstrumentType && !selectedInstrumentBrand) {
    topHeading = `Select a ${ selectedInstrumentType } brand`
  }

  return (
    <div className="sidebar">
      
      <div className="sidebar-top">
        <div className="sidebar-top-buttons">
          { exitButton && <ExitButton />}
        </div>
        <h3>{ topHeading }</h3>
      </div>

      <div className="sidebar-lower">
        {
          (!!instruments && !!selectedSlot) ? 
            <InstrumentList 
              instruments={ instruments }
              selectedInstrumentType={ selectedInstrumentType }
              selectedInstrumentBrand={ selectedInstrumentType }
              onSelect={ onSelect }
            /> : 
            <SidebarText /> 
        }
      </div>
    </div>
  )
}

export default Sidebar