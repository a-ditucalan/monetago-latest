/**  Copyright 2020 MonetaGo, Inc.  All Rights Reserved.
 *  This code is copyrighted material that is confidential andproprietary to MonetaGo, Inc.
 *  and may not (in whole or in part) be published, publicly displayed,copied, modified or
 *  used in any way other than as expressly permitted in a writtenagreement executed by
 *  MonetaGo, Inc.  No portion of this code may be used to createderivative works or exploited
 *  in any other way without MonetaGo, Inc.’s prior written consent.  Noportion of this code
 *  may be transmitted or redistributed to any person without MonetaGo,Inc.’s prior written
 *  consent. This notice may not be deleted or modified without MonetaGo,Inc.’s consent.
 */

import React from 'react'
import Subsidiary from './Subsidiary'
import GroupEntities from './GroupEntities'
import { useSelector } from 'react-redux'

const CorporateInformation = () => {
  const orgState = useSelector(state => state.organization)
  const corpActiveStep = orgState.corpActiveStep
    ? orgState.corpActiveStep
    : 'Parent'
  const corporateComponent = {
    Parent: Subsidiary,
    'Corporate Group': GroupEntities,
    Subsidiary: Subsidiary
  }
  const ActiveComponent = corporateComponent[corpActiveStep]

  return (
    <div>
      <ActiveComponent />
    </div>
  )
}

export default CorporateInformation
