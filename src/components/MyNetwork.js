import React, { useState } from 'react'

import LayoutTable from '../common/LayoutTable'
import CommonFilterInput from '../common/CommonFilterInput'
import CorporateTable from '../common/CorporateTable'
import CommonBreadCrumbInnerTab from './CommonBreadCrumbInnerTab'
import CommonDropdown from '../common/CommonDropdown'
import CommonInput from '../common/CommonInput'
import CommonButtons from '../common/CommonButton'
import CommonCorporateHeader from '../common/CommonCorporateHeader'

const MyNetwork = () => {
  const headers = [
    {
      key: 'checkbox'
    },
    {
      key: 'uniqueId',
      content: 'Unique ID'
    },
    {
      key: 'unitName',
      content: 'Unit Name'
    },
    {
      key: 'orgRole',
      content: 'Organization Role'
    },
    {
      key: 'cordaName',
      content: 'Corda Name'
    },
    {
      key: '',
      content: ''
    },
    {
      key: '',
      content: ''
    }
  ]

  const counterParties = [
    {
      uniqueId: 'a644d0b0-9c46-4d23-a978-7fe23b069f81',
      unitName: 'Capital Partner',
      orgRole: 'Issuer',
      cordaName: 'N/A',
      connected: 'Connected'
    },
    {
      uniqueId: 'ce807e68-05f7-4312-8d82-e2c79d539bc8',
      unitName: 'New Partner',
      orgRole: 'IPA',
      cordaName: 'N/A',
      connected: 'Connected'
    },
    {
      uniqueId: 'cd2a4b68-fd28-48fd-8502-6dc8e01a350d',
      unitName: 'Test Partner',
      orgRole: 'Operator',
      cordaName: 'N/A',
      connected: 'Connected'
    },
    {
      uniqueId: 'd1fd3b36-3c56-4cee-b5e2-e2cf58a01ef0',
      unitName: 'New Test Partner',
      orgRole: 'Service Provider',
      cordaName: 'N/A',
      connected: 'For Approval'
    },
    {
      uniqueId: 'd1fd3b36-3c56-4cee-b5e2-e2cf58a01ef0',
      unitName: 'New New Test Partner',
      orgRole: 'Service Provider',
      cordaName: 'N/A',
      connected: 'Requested'
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
    },
    {
      name: 'organization',
      placeholder: 'Status: All',
      options: [
        {
          key: 'all',
          value: 'all',
          text: 'All'
        },
        {
          key: 'Connected',
          value: 'Connected',
          text: 'Connected'
        },
        {
          key: 'For Approval',
          value: 'For Approval',
          text: 'For Approval'
        }
      ]
    }
  ]

  const searchOptions = [
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

  const searchHeaders = [
    {
      key: 'checkbox'
    },
    {
      key: 'legalEntityName',
      content: 'Legal Entity Name'
    },
    {
      key: 'networkRole',
      content: 'Network Role'
    },
    {
      key: 'status',
      content: 'Status'
    },
    {
      key: '',
      content: ''
    }
  ]

  const searchData = [
    {
      legalEntityName: 'Monetago Inc',
      networkRole: 'Service Provider',
      connected: 'Connected'
    }
  ]

  const orgType = {
    legalEntityBase: {
      legalName: 'JC Supply PTY',
      networkRole: 'ISSUER'
    }
  }

  const tabsItem = ['Counter Parties', 'Search']
  const [breadcrumb, setbreadcrumb] = useState('Counter Parties')
  const [innerTab, setInnerTab] = useState('Counter Parties')

  const onClickTab = event => {
    const tab = event.currentTarget.firstChild.getAttribute('id')
    setInnerTab(tab)
    setbreadcrumb(tab)
  }

  const sections = [
    {
      key: 'My Network',
      content: 'My Network',
      link: true
    },
    { key: breadcrumb, content: breadcrumb, active: true }
  ]

  return (
    <LayoutTable>
      <CommonBreadCrumbInnerTab
        sections={sections}
        onClickTab={onClickTab}
        innerTab={innerTab}
        tabsItem={tabsItem}
      />
      <div className="corporate-entity-main-block">
        <CommonCorporateHeader
          headerTitle={orgType.legalEntityBase.legalName}
          headerIdentifier="Sample"
          headerRoleTitle="Organization Name"
          headerRole={orgType.legalEntityBase.networkRole}
          headerCount={counterParties.length}
          headerCountIcon="users"
          headerCountLabel="Counterparties"
        />
        {breadcrumb === 'Search' ? (
          <div className="menu-header-search">
            <CommonInput
              inputStyle="search-input"
              icon="search"
              iconPosition="left"
              placeholder="Search ..."
            />
            <CommonDropdown options={searchOptions} defaultValue="asdfasdf" />
            <CommonButtons
              content="Search"
              btnClass="corporate-mod-btn btn-sky-blue"
            />
          </div>
        ) : (
          <CommonFilterInput filterOptions={filterOptions} />
        )}

        {breadcrumb === 'Search' && (
          <CommonButtons
            content="Request to Connect"
            icon="plus"
            iconPosition="left"
            // disabled="true"
            btnClass="request-all"
            floated="right"
          />
        )}

        <CorporateTable
          headers={breadcrumb === 'Search' ? searchHeaders : headers}
          tabledata={breadcrumb === 'Search' ? searchData : counterParties}
          info={breadcrumb === 'Search' && 'Search'}
        />
      </div>
    </LayoutTable>
  )
}

export default MyNetwork
