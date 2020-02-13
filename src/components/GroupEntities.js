import React, { useState } from 'react'
import LayoutTable from '../common/LayoutTable'
import CommonBreadCrumbInnerTab from './CommonBreadCrumbInnerTab'
import CommonFilterInput from '../common/CommonFilterInput'
import CorporateTable from '../common/CorporateTable'
import CommonCorporateHeader from '../common/CommonCorporateHeader'

const GroupEntities = () => {
  const tabsItem = ['Group Entities']
  const [breadcrumb, setbreadcrumb] = useState('Group Entities')
  const [innerTab, setInnerTab] = useState('Group Entities')

  const onClickTab = event => {
    const tab = event.currentTarget.firstChild.getAttribute('id')
    setInnerTab(tab)
    setbreadcrumb(tab)
  }

  const headers = [
    {
      key: 'checkbox'
    },
    {
      key: 'legalName',
      content: 'Legal Name'
    },
    {
      key: 'parentEntity',
      content: 'Parent Entity'
    },
    {
      key: 'networkRole',
      content: 'Network Role'
    },
    {
      key: 'corporateIdentifier',
      content: 'Corporate Identifier'
    },
    {
      key: '',
      content: ''
    }
  ]

  const tableData = [
    {
      legalName: 'Chicken Holding Corp',
      ParentEntity: 'None',
      networkRole: 'Coporate',
      corporateIdentifier: 'EIN 53-345346'
    },
    {
      legalName: 'Joy Holding Corp',
      ParentEntity: 'None',
      networkRole: 'Coporate',
      corporateIdentifier: 'EIN 53-345346'
    },
    {
      legalName: 'ABC Holding Corp',
      ParentEntity: 'None',
      networkRole: 'Coporate',
      corporateIdentifier: 'EIN 53-345346'
    }
  ]
  const filterOptions = [
    {
      name: 'role',
      placeholder: 'Role: All',
      options: [
        {
          key: 'all',
          value: 'all',
          text: 'All'
        },
        {
          key: 'Issuer',
          value: 'Issuer',
          text: 'Issuer'
        },
        {
          key: 'IPA',
          value: 'IPA',
          text: 'IPA'
        },
        {
          key: 'Operator',
          value: 'Operator',
          text: 'Operator'
        },
        {
          key: 'Service Provider',
          value: 'Service Provider',
          text: 'Service Provider'
        }
      ]
    }
  ]
  const sections = [
    {
      key: 'Corportate Information',
      content: 'Corportate Information',
      link: true
    },
    { key: breadcrumb, content: breadcrumb, active: true }
  ]

  const orgType = {
    legalEntityBase: {
      legalName: 'JC Supply PTY',
      networkRole: 'ISSUER'
    }
  }

  const [showMod, setShowMod] = useState({
    legalInfo: false
  })

  const tabsItemView = ['Add Information']

  const closeMod = mod => {
    setShowMod({ [mod]: false })
  }

  const openMod = (mod, tab) => {
    setShowMod({ [mod]: true })
  }

  return (
    <LayoutTable>
      <CommonBreadCrumbInnerTab
        sections={sections}
        onClickTab={onClickTab}
        innerTab={innerTab}
        tabsItem={tabsItem}
      />

      <CommonCorporateHeader
        headerTitle={orgType.legalEntityBase.legalName}
        headerCount={tableData.length}
        headerCountIcon="building"
        headerCountLabel="Entities"
        headerBtnLabel="Add New"
        headerBtnIcon="add"
        headerBtnClass="btn-blue-transparent"
        infoData="legalInfo"
        open={showMod.legalInfo}
        tabsItem={tabsItemView}
        onClose={() => closeMod('legalInfo')}
        btnClass="corporate-btn"
        img={require('../assets/svg/ic_edit.svg')}
        onOpen={() => openMod('legalInfo', 'Information Details')}
      />
      <CommonFilterInput filterOptions={filterOptions} />
      <CorporateTable headers={headers} tabledata={tableData} />
    </LayoutTable>
  )
}

export default GroupEntities
