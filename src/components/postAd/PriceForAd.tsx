import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { stateTypes } from '../../types'

interface schema{

    setPrice: (arg: string) => void
}
const PriceForAd = ({setPrice}: schema) => {
    const currency = useSelector((state:stateTypes) => state.currency.currencyCode)
  
    return (
        <div className={"postAdMain-form-field"}>
          <h3>Price ({currency})</h3>
          <input

            onChange={(e: any) => setPrice(e.target.value)}
            type="number"
            placeholder={"10"}
            className={'form-input'}
          />
        </div>
        
    )
}


export default memo(PriceForAd);