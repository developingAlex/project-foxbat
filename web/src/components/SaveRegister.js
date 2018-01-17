import React, { Fragment } from 'react'
import Button from './Button'
import BasePopUp from './BasePopUp'

function SaveRegister({ onExit, onSubmit }) {
  return (
      <BasePopUp onExit={ onExit } attribute="register" >
        <p className="form-text">
          Please give your panel a name and enter your email address and a password to save
          (so it can be re-called latter using these).
        </p>
        <form
            onSubmit={ (event) => {
              // Prevent old-school form submission
              event.preventDefault()

              const elements = event.target.elements // Allows looking up fields using their 'name' attributes
              // Get entered values from fields
              const email = elements.email.value
              const password = elements.password.value
              const name = elements.name.value

              // Pass this information along to the parent component
              onSubmit({ name, email, password })
            } }
        >
          <label>
            {'Panel name: '}
            <input
                type='text'
                name='name'
                defaultValue={ " " }
            />
          </label>
          <label>
            {'Email: '}
            <input
                type='text'
                name='email'
                defaultValue={ " " }
            />
          </label>
          <label>
            {'Password: '}
            <input
                type='password'
                name='email'
            />
          </label>
          <Button text="Save"
            onToggle={ () => {} }
          />
        </form>
      </BasePopUp>
  )
}

export default SaveRegister



