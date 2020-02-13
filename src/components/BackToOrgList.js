import React from 'react'
import { useDispatch } from 'react-redux'
import { Image } from 'semantic-ui-react'
import { orgActiveStep } from '../redux'

const BackToOrgList = () => {
  const dispatch = useDispatch()

  return (
    <div
      className="back-link"
      onClick={() => dispatch(orgActiveStep('organizationCardList'))}
    >
      <Image src={require('../assets/svg/arrow-left.svg')} />
      <span>Back To Organization List</span>
    </div>
  )
}

export default BackToOrgList
