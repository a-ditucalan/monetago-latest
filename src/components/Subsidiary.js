/**  Copyright 2020 MonetaGo, Inc.  All Rights Reserved.
 *  This code is copyrighted material that is confidential and proprietary to MonetaGo, Inc.
 *  and may not (in whole or in part) be published, publicly displayed, copied, modified or
 *  used in any way other than as expressly permitted in a written agreement executed by
 *  MonetaGo, Inc.  No portion of this code may be used to create derivative works or exploited
 *  in any other way without MonetaGo, Inc.’s prior written consent.  No portion of this code
 *  may be transmitted or redistributed to any person without MonetaGo,Inc.’s prior written
 *  consent. This notice may not be deleted or modified without MonetaGo, Inc.’s consent.
 */

import React, { useState, Fragment } from 'react'
import { useDispatch } from 'react-redux'

import { setActiveTab } from '../redux'

import CorporateModal from './CorporateModal'
import SubsidiaryList from './SubsidiaryList'
import LayoutTable from '../common/LayoutTable'
import CommonToggle from './CommonToggle'
import CommonBreadCrumbInnerTab from './CommonBreadCrumbInnerTab'

const Subsidiary = () => {
  const dispatch = useDispatch()
  const tabsItem = ['My Org', 'Subsidiaries']
  const [innerTab, setInnerTab] = useState('My Org')
  const [breadcrumb, setbreadcrumb] = useState('My Org')
  const [parentControl, setparentControl] = useState(true)
  const [showMod, setShowMod] = useState({
    viewLegalInfo: false,
    addSubsidary: false,
    info: false,
    addPContact: false,
    editPContact: false,
    viewPContact: false,
    editBUnit: false,
    viewBUnit: false,
    addScheme: false,
    editScheme: false,
    viewScheme: false,
    mngCntrpty: false
  })

  const orgType = {
    legalEntityBase: {
      legalName: 'JC Supply PTY',
      networkRole: 'ISSUER'
    }
  }

  const onClickTab = event => {
    const tab = event.currentTarget.firstChild.getAttribute('id')
    setInnerTab(tab)
    setbreadcrumb(tab)
  }

  const handleToggleData = toggleData => {
    setparentControl(!toggleData)
  }

  const sections = [
    {
      key: 'Corportate Information',
      content: 'Corportate Information',
      link: true
    },
    { key: breadcrumb, content: breadcrumb, active: true }
  ]

  const goToMyNetwork = () => {
    dispatch(setActiveTab('My Network'))
  }

  const closeMod = mod => {
    setShowMod({ [mod]: false })
  }

  const openMod = mod => {
    setShowMod({ [mod]: true })
  }

  return (
    <LayoutTable>
      <CommonBreadCrumbInnerTab
        sections={sections}
        innerTab={innerTab}
        tabsItem={tabsItem}
        onClickTab={onClickTab}
      />
      {innerTab === 'My Org' ? (
        <div className="corporate-entity-wrapper">
          <div className="corp-info-wrapper">
            <div className="corporate-entity-block-one">
              <div className="corporate-entity-block-one-legal-info">
                <div className="content-wrapper">
                  <p className="content-title">
                    {orgType.legalEntityBase.legalName}&nbsp;&nbsp;
                    <CorporateModal
                      btnTitle="Edit"
                      infoData="legalInfo"
                      open={showMod.info}
                      innerTab={'Information'}
                      onClose={() => closeMod('info')}
                      dataNumber={orgType.legalEntityBase.tel1}
                      btnClass="corporate-btn"
                      img={require('../assets/svg/ic_edit.svg')}
                      onOpen={() => openMod('info', 'Information')}
                    />
                  </p>
                  <div className="cprt-btn-wrapper" onClick={goToMyNetwork}>
                    <img
                      src={require('../assets/svg/ic_show_chart.svg')}
                      alt="icon"
                    />
                    &nbsp;
                    <p className="corporate-btn">Manage Counterparties</p>
                  </div>
                </div>
                <p className="corporate-identifier content-subtitle">
                  Corporate Identifier:{' '}
                  <span className="corporate-identifier-text content-type">
                    EIN 98-7654321
                  </span>
                </p>
              </div>
              <div className="corporate-entity-block-one-legal-subinfo">
                <div className="role">
                  <p className="corporate-title">Network Role</p>
                  <p className="coporate-type">
                    {orgType.legalEntityBase.networkRole}
                  </p>
                </div>
                <div className="parent-corp">
                  <p className="inehritance-title">Parent Corporation</p>
                  <p className="corporate-title">ABC Holding Corp</p>
                </div>
                <div className="parent-control">
                  <p className="parent-control-title">Allow Parent Control</p>
                  <CommonToggle
                    dataToggleActive={parentControl}
                    dataStateToggle="parentControl"
                    handleToggleData={handleToggleData}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="ruler"></div>
          {/* contact person card */}
          <div className="corporate-entity-block-two">
            <div className="corporate-card contact-person-wrapper">
              <div className="contact-person-header">
                <p className="contact-person-title">Contact Person</p>
                <CorporateModal
                  btnTitle="Add New"
                  infoData="addParentContact"
                  open={showMod.addPContact}
                  onOpen={() =>
                    openMod('addPContact', 'Add Contact Person Details')
                  }
                  onClose={() => closeMod('addPContact')}
                  tabsItem={'Add Contact Person Details'}
                  onClickTab={onClickTab}
                  innerTab={innerTab}
                  btnClass="corporate-btn"
                  img={require('../assets/svg/ic_add.svg')}
                />
              </div>
              <div className="contact-person-container">
                <div className="contact-person-box">
                  <p className="contact-person-name modal-form-title ">
                    Firstname Lastname
                  </p>
                  <div className="contact-person-designation">
                    Designation
                    <div className="corporate-buttons">
                      <CorporateModal
                        btnTitle="View"
                        infoData="viewParentContact"
                        open={showMod.viewPContact}
                        onOpen={() =>
                          openMod('viewPContact', 'Contact Person Details')
                        }
                        onClose={() => closeMod('viewPContact')}
                        tabsItem={'Contact Person Details'}
                        onClickTab={onClickTab}
                        innerTab={innerTab}
                        btnClass="corporate-btn"
                        img={require('../assets/svg/ic_visibility_24px.svg')}
                      />
                      <CorporateModal
                        btnTitle="Edit"
                        infoData="editParentContact"
                        open={showMod.editPContact}
                        onOpen={() =>
                          openMod('editPContact', 'Edit Contact Person Details')
                        }
                        onClose={() => closeMod('editPContact')}
                        tabsItem={'Edit Contact Person Details'}
                        onClickTab={onClickTab}
                        innerTab={innerTab}
                        btnClass="corporate-btn"
                        img={require('../assets/svg/ic_edit.svg')}
                      />
                      <CorporateModal
                        btnTitle="Delete"
                        btnClass="corporate-btn"
                        img={require('../assets/svg/ic_delete_24px.svg')}
                      />
                    </div>
                  </div>
                  <p className="tel-one  main-info">Tel1</p>
                </div>
              </div>
            </div>
            {/* Business unit card */}
            <Fragment>
              <div className="corporate-card business-unit-wrapper">
                <div className="business-unit-header">
                  <p className="business-unit-title">Business Unit</p>
                  <div className="business-unit-edit">
                    <CorporateModal
                      btnTitle="Add new"
                      infoData="viewBusinessUnit"
                      btnClass="corporate-btn"
                      img={require('../assets/svg/ic_add.svg')}
                    />
                  </div>
                </div>
                <div className="business-unit-box">
                  <p className="unit-name">Unit Name</p>
                  <p className="gstin  content-subtitle">
                    GSTIN: <span className="content-type">gstin</span>
                  </p>
                  <p className="corporate-icon company-address address-primary">
                    {' '}
                    {'address'} {'address'} {'address'} {'address'} {'address'}{' '}
                    {'address'} {'address'} {'address'}{' '}
                  </p>
                  <p className="business-unit-email corporate-email corporate-icon main-info">
                    Email
                  </p>
                  <p className="business-unit-contact  content-subtitle">
                    Business Unit Contact Person :
                    <span className="content-type">Firstname Lastname</span>
                  </p>
                </div>
              </div>
            </Fragment>
            {/* depository accounts card */}
            <Fragment>
              <div className="corporate-card contact-person-wrapper">
                <div className="contact-person-header">
                  <p className="contact-person-title">Depository Accounts</p>
                  <CorporateModal
                    btnTitle="Add New"
                    infoData="addDepositoryAccount"
                    open={showMod.addDAccount}
                    onOpen={() =>
                      openMod('addDAccount', 'Add Depository Account')
                    }
                    onClose={() => closeMod('addDAccount')}
                    btnClass="corporate-btn"
                    img={require('../assets/svg/ic_add.svg')}
                  />
                </div>
                <div className="contact-person-container">
                  <div className="contact-person-box">
                    <p className="contact-person-name modal-form-title ">
                      Depository Name
                    </p>
                    <div className="contact-person-designation">
                      Reference ID: referenceId
                      <div className="corporate-buttons">
                        <CorporateModal
                          btnTitle="View"
                          infoData="viewDepositoryAccount"
                          open={showMod.viewDAccount}
                          onOpen={() =>
                            openMod('viewDAccount', 'View Depository Account')
                          }
                          onClose={() => closeMod('viewDAccount')}
                          btnClass="corporate-btn"
                          img={require('../assets/svg/ic_visibility_24px.svg')}
                        />
                        <CorporateModal
                          btnTitle="Edit"
                          infoData="editDepositoryAccount"
                          open={showMod.editDAccount}
                          onOpen={() =>
                            openMod('editDAccount', 'Edit Depository Account')
                          }
                          onClose={() => closeMod('editDAccount')}
                          btnClass="corporate-btn"
                          img={require('../assets/svg/ic_edit.svg')}
                        />
                        <CorporateModal
                          btnTitle="Delete"
                          btnClass="corporate-btn"
                          img={require('../assets/svg/ic_delete_24px.svg')}
                        />
                      </div>
                    </div>
                    <p className="main-info">Client Name</p>
                  </div>
                </div>
              </div>
            </Fragment>
          </div>
        </div>
      ) : (
        <SubsidiaryList />
      )}
    </LayoutTable>
  )
}

export default Subsidiary
