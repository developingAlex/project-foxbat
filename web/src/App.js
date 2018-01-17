import React, { Component, Fragment } from 'react';
import { signIn, signUp, signOutNow } from './api/auth'
import { getDecodedToken } from './api/token'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'
import Button from './components/Button';
import PlaneSelect from './components/PlaneSelect';
import Form from './components/Form';
import PanelTemplate from './components/PanelTemplate';
import Sidebar from './components/sidebar/Sidebar';
import SaveRegister from './components/SaveRegister';
import { savePanel, updatePanel } from './api/panels'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    save: null,
    showConfigurator: true,
    instruments: require('./data').instrumentsType,
    selectedSlot: 1,
    selectedInstrumentType: null,
    selectedInstrumentBrand: null,
    templateId: null,
    slots: null,
    welcome: false,
    saveRegister: true
  }

  onSignIn = ({ email, password }) => {
    signIn({ email, password })
    .then((decodedToken) => {
      this.setState({ decodedToken })
    })
    .catch((error) => {
      this.setState({ error })
    })
  }

  onSaveRegister = ({ name, email, password }) => {
    const signedIn = !!this.state.decodedToken
    if (!signedIn) {
      signUp({ email, password })
      .then((decodedToken) => {
        this.setState({ decodedToken })
      })
      .catch((error) => {
        this.setState({ error })
      })
    }
    const data = {
      template: this.state.templateId,
      name: name,
      slots: this.state.slots,
      userId: this.state.decodedToken.sub     // as per passport documentation
    }
    savePanel({data})
    .then(() => {
      this.setState({ saveRegister: null })
    })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null })
  }

  onExitPopUp = ( key ) => {
    this.setState({
      [key]: false
    })
  }

  toggleShowConfigurator = () => {
    this.setState((prevState) => {
      const newShowConfigurator = !prevState.showConfigurator
      return({
        showConfigurator: newShowConfigurator
      })
    })
  }

  updateIntruments = (selection) => {
    if (!this.state.selectedInstrumentType) {
      this.setState({
        selectedInstrumentType: selection,
        instruments: require('./data').instrumentsBrand
      })
    }
    else if (!!this.state.selectedInstrumentType && !this.state.selectedInstrumentBrand) {
      this.setState({
        selectedInstrumentBrand: selection,
        instruments: require('./data').instrumentsModel
      })
    }
  }

  render() {
    const {
      decodedToken,
      welcome,
      saveRegister,
      showConfigurator,
      instruments,
      selectedSlot,
      selectedInstrumentType,
      selectedInstrumentBrand
    } = this.state

    console.log(instruments)

    const signedIn = !!decodedToken
    const toggle = false

    return (
      <Router>
        <div className="App">
          <Switch>

            <Route path='/' exact render={ () => (
              <Fragment>

                <h1>Welcome to the Foxbat Instrument Panel Configurator</h1>
                <br/>
                <h2>Which plane are you configuring for?</h2>
                <br/>

                <Link to="/a32">
                  <PlaneSelect name="A32 Vixxen"/>
                </Link>
                <Link to="/a22">
                  <PlaneSelect name="A22 Foxbat/Kelpie"/>
                </Link>

                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div>
                  <Button text="Lost your panel URL?"/>
                </div>
                {
                  showConfigurator &&
                  <Sidebar
                    exitButton={ true }
                    backButton={ true }
                    instruments={ instruments }
                    selectedSlot={ selectedSlot }
                    selectedInstrumentType={ selectedInstrumentType }
                    selectedInstrumentBrand={ selectedInstrumentBrand }
                    onSelect={ this.updateIntruments }
                  />
                }
                <Button
                  text="toggle side bar (dev)"
                  onToggle={ this.toggleShowConfigurator }
                />

                { saveRegister &&
                  <SaveRegister
                      onExit={ this.onExitPopUp }
                      onSubmit={ this.onSaveRegister }
                  />
                }
              </Fragment>

            )}/>

            <Route path='/a22' exact render={ () => (
              <Fragment>
                <h1>Welcome to the Foxbat Instrument Panel Configurator</h1>
                <br/>
                <h2>Choose a template to continue</h2>
                <br/>

                <PanelTemplate name="Analogue A-22 Panel"/>
                <PanelTemplate name="Digital A-22 Panel"/>

                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div>
                  <Button text="Lost your panel URL?"/>
                </div>
              </Fragment>
            )}/>

            <Route path='/a32' exact render={ () => (
              <Fragment>
                <h1>Welcome to the Foxbat Instrument Panel Configurator</h1>
                <br/>
                <h2>Choose a template to continue</h2>
                <br/>

                <PanelTemplate name="Analogue A-32 Panel"/>
                <PanelTemplate name="Digital A-32 Panel"/>

                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div>
                  <Button text="Lost your panel URL?"/>
                </div>
              </Fragment>
            )}/>

          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;