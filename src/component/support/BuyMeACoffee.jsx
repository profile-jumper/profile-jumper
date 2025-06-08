import React from 'react'
import BuyMeACoffeeLogo from '../../asset/support/buy-me-a-coffee-logo.svg'

import './BuyMeACoffee.css'

export const BuyMeACoffee = () => {
  return (
    <div className="BuyMeACoffee">
      <img src={BuyMeACoffeeLogo} alt="Buy Me A Coffee!" className="CoffeeCup"/>
    </div>
  )
}
