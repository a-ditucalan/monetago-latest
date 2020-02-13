/**  Copyright 2020 MonetaGo, Inc.  All Rights Reserved.
 *  This code is copyrighted material that is confidential andproprietary to MonetaGo, Inc.
 *  and may not (in whole or in part) be published, publicly displayed,copied, modified or
 *  used in any way other than as expressly permitted in a writtenagreement executed by
 *  MonetaGo, Inc.  No portion of this code may be used to createderivative works or exploited
 *  in any other way without MonetaGo, Inc.’s prior written consent.  Noportion of this code
 *  may be transmitted or redistributed to any person without MonetaGo,Inc.’s prior written
 *  consent. This notice may not be deleted or modified without MonetaGo,Inc.’s consent.
 */

import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import UserTable from './UserTable'
// import ContentHeader from './ContentHeader'
import InnerTabs from './InnerTabs'
import ContentHeader from './ContentHeader'

const OrganizationAccountManagement = () => {
  const orgData = useSelector(state => state.organization)
  const [innerTab, setInnerTab] = useState('Account')
  let selectedOrgData

  const onClickTab = event => {
    const tab = event.currentTarget.firstChild.getAttribute('id')
    setInnerTab(tab)
  }

  //Get data of the selected organization
  selectedOrgData = orgData.orgAndUser.find(orgz => {
    return orgz.org.orgId === orgData.selectedOrg
  })

  return (
    <div>
      <ContentHeader
        contentHeaderTitle={selectedOrgData.org.legalName}
        type="cards"
        btnContent={null}
        orgType={selectedOrgData.org.networkRole}
      />
      {/* <BackToOrgList /> */}
      <InnerTabs
        onClickTab={onClickTab}
        tabsItem={['Account']}
        innerTab={'Account'}
      />
      {innerTab === 'Account' ? (
        <UserTable type="Organization" content={selectedOrgData.userAccounts} />
      ) : null}
    </div>
  )
}

export default OrganizationAccountManagement
