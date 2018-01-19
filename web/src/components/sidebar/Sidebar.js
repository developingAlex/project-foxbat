import React from 'react'
import ExitButton from '../ExitButton'
import NavList from './NavList'
import SidebarText from './SidebarText'
import { sideBarMessages } from '../../constants/messages'
var _array = require('lodash/array') // Lodash

function Sidebar({
  exitButton,
  backButton,
  instruments,
  selectedSlot, 
  selectedInstrumentType,
  selectedInstrumentBrand,
  onSelect, // (type?, brand?, model?) => {}
  sidebarClose
}) { 

  function allTypesFromInstruments(instruments) {
    const allTypesArray = 
      instruments.map((instrument) => (
        instrument.instrumentClass
      ))
    const typesArray = _array.uniq(allTypesArray)
    return typesArray
  }

  function allBrandsForTypeFromInstruments(instruments, selectedInstrumentType) {
    console.log('allBrandsForTypeFromInstruments running')
    const instrumentsWithType = instruments.filter((instrument) => {
      return instrument.instrumentClass === selectedInstrumentType
    })
    const allBrands = instrumentsWithType.map((instrument) => instrument.brand)
    const uniqueBrands = _array.uniq(allBrands)
    
    return uniqueBrands
  }

  function allModelsForBrandsForTypeFromInstruments(instruments, selectedInstrumentType, selectedInstrumentBrand) {
    console.log('allModelsForBrandsForTypeFromInstruments running')
    console.log(instruments)
    
    const instrumentsWithTypeAndBrand = instruments.filter((instrument) => {
      return instrument.instrumentClass === selectedInstrumentType && instrument.brand === selectedInstrumentBrand
    })
    return instrumentsWithTypeAndBrand
  }

  let topHeading
  let displayItems
  let pictureItems
  let onSelectItem

  // Nothing selected
  if (!selectedSlot) {
    topHeading = sideBarMessages.welcome
  }
  // Selected a slot
  else if (!!selectedSlot && !selectedInstrumentType) {
   topHeading = sideBarMessages.selectInstrumentType
   displayItems = allTypesFromInstruments(instruments)
   console.log("in conditional: ",displayItems)
   console.log("second if")
   onSelectItem = (type) => {
      onSelect(type)
   }
  }
  // Select slot and type
  else if (!!selectedSlot && !!selectedInstrumentType && !selectedInstrumentBrand) {
    console.log('display items for selected slot and type')
    topHeading = sideBarMessages.selectBrand + selectedInstrumentType.toLowerCase()
    displayItems = allBrandsForTypeFromInstruments(instruments, selectedInstrumentType)
    onSelectItem = (brand) => {
      onSelect(selectedInstrumentType, brand)
   }
  }
  // Select slot, type, and brand
  else if (!!selectedSlot && !!selectedInstrumentType && !!selectedInstrumentBrand) {
    topHeading = sideBarMessages.selectModel + selectedInstrumentBrand + " " + selectedInstrumentType.toLowerCase()

    const modelObjects = allModelsForBrandsForTypeFromInstruments(instruments, selectedInstrumentType, selectedInstrumentBrand)

    displayItems = modelObjects.map((instrument) => instrument.name)
    pictureItems = modelObjects.map((instrument) => instrument.pictureURL)
    console.log('alex sanity check')
    console.log('alex sanity check modelObjects')
    console.log(modelObjects)
    console.log('alex sanity check displayItems')
    console.log(displayItems)
    console.log('alex sanity check pictureItems')
    console.log(pictureItems)
    console.log('END alex sanity check')
    onSelectItem = (model) => {
      onSelect(selectedInstrumentType, selectedInstrumentBrand, model)
   }
  }

  console.log(displayItems)

  return (
    <div className="sidebar">
      
      <div className="sidebar-top">
        <div className="sidebar-top-buttons">
          { exitButton && <ExitButton onToggle={ sidebarClose }/>}
        </div>
        <h3>{ topHeading }</h3>
      </div>

      <div className="sidebar-lower">
        {
          (!!instruments && !!selectedSlot) ? 
            <NavList 
              displayItems={ displayItems }
              pictureItems={ pictureItems }
              onSelect={ onSelectItem }
            /> : 
            <SidebarText /> 
        }
      </div>
    </div>
  )
}

export default Sidebar