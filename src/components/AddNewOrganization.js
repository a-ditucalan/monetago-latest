/**  Copyright 2020 MonetaGo, Inc.  All Rights Reserved.
 *  This code is copyrighted material that is confidential andproprietary to MonetaGo, Inc.
 *  and may not (in whole or in part) be published, publicly displayed,copied, modified or
 *  used in any way other than as expressly permitted in a writtenagreement executed by
 *  MonetaGo, Inc.  No portion of this code may be used to createderivative works or exploited
 *  in any other way without MonetaGo, Inc.’s prior written consent.  Noportion of this code
 *  may be transmitted or redistributed to any person without MonetaGo,Inc.’s prior written
 *  consent. This notice may not be deleted or modified without MonetaGo,Inc.’s consent.
 */

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  createOrganization,
  fetchApi
} from '../redux/organization/organizationActions'

import { subroles, organization } from '../lib/AddNewOrganizationData'

import CommonInput from '../common/CommonInput'
import CommonDropdown from '../common/CommonDropdown'
import CommonButtons from '../common/CommonButton'
import CommonNotifPortal from '../common/CommonNotifPortal'

const AddNewOrganization = props => {
  const { showModal } = props
  const organizationState = useSelector(state => state.organization)
  const dispatch = useDispatch()

  const [orgType, setOrgType] = useState({
    legalName: '',
    version: 0,
    networkRole: '',
    networkSubRole: '',
    active: true
  })

  const [disabled, setDisabled] = useState(true)
  const [loader, setLoader] = useState(false)

  const onChangeInput = e => {
    const orgName = e.target.name
    const orgVal = e.target.value

    setOrgType({ ...orgType, [orgName]: orgVal })
  }

  const onChangeDropdown = e => {
    const orgRoleParent = e.target.parentNode.parentNode.parentNode.getAttribute(
      'name'
    )
    const orgRole = e.target.parentNode.parentNode.getAttribute('name')
    const orgRoleVal = e.target.innerText.toUpperCase().replace(/\s/g, '')

    if (orgRoleParent === 'networkSubRole' || orgRole === 'networkSubRole') {
      setOrgType({ ...orgType, networkSubRole: orgRoleVal })
    } else if (orgRole === 'networkRole' || orgRoleParent === 'networkRole') {
      setOrgType({ ...orgType, networkRole: orgRoleVal, networkSubRole: null })
    }
  }

  const onSubmitOrg = () => {
    setLoader(true)

    setTimeout(() => {
      dispatch(createOrganization(orgType))
      setLoader(false)
      dispatch(fetchApi(1))
    }, 2000)

    setTimeout(() => {
      showModal(false)
    }, 4000)
  }

  useEffect(() => {
    if (orgType.legalName !== '' && orgType.networkRole !== null) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }

    if (orgType.networkRole === 'SERVICEPROVIDER') {
      if (
        orgType.networkSubRole !== null &&
        orgType.legalName !== '' &&
        orgType.networkRole !== null
      ) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    }
    // eslint-disable-next-line
  }, [orgType])

  return (
    <div className="add-new-organization-wrapper">
      <CommonNotifPortal
        notifOpen={organizationState.notif.open}
        notifClass={organizationState.notif.status}
        notifIcon={organizationState.notif.icon}
        notifTextContent={organizationState.notif.msg}
      />

      <p className="modal-form-title">Add Corporate Group</p>
      <CommonInput
        name="legalName"
        placeholder="Corporate Group name"
        inputStyle="organization-inputs"
        onChange={onChangeInput}
      />

      <CommonDropdown
        options={organization}
        name="networkRole"
        placeholder="Select Type of Corporate Group"
        dropdownClass="select-org-dropdown"
        onChange={onChangeDropdown}
      />

      {orgType.networkRole === 'SERVICEPROVIDER' ? (
        <CommonDropdown
          options={subroles}
          name="networkSubRole"
          placeholder="Select Subrole"
          dropdownClass="select-org-dropdown"
          onChange={onChangeDropdown}
        />
      ) : null}

      <CommonInput
        name="configLDAP"
        placeholder="configLDAP"
        inputStyle="organization-inputs"
      />
      <div className="btn-actions">
        <CommonButtons
          content="CANCEL"
          btnClass="cancel-btn btn-gray"
          onClick={() => showModal(false)}
        />
        <CommonButtons
          content="CREATE Corporate Group"
          btnClass="create-btn btn-blue"
          onClick={onSubmitOrg}
          disabled={disabled}
          loader={loader}
        />
      </div>
    </div>
  )
}

export default AddNewOrganization
