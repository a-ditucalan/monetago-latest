import React from 'react'

import CommonCorporateHeader from '../common/CommonCorporateHeader'
import CommonFilterInput from '../common/CommonFilterInput'
import CorporateTable from '../common/CorporateTable'

const subsidiaryHeaders = [
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
    key: 'corporateIdentifier',
    content: 'Corporate Identifier'
  },
  {
    key: 'relationship',
    content: 'Relationship'
  }
]

const subsidiaryList = [
  {
    // uniqueId: 'a644d0b0-9c46-4d23-a978-7fe23b069f81',
    legalEntityName: 'ABC Services Subsidiary Ltd',
    networkRole: 'Corporate',
    corporateIdentifier: 'GSTIN 07AAGCA47627C1Z1',
    relationship: 'Direct Ownership'
    // connected: 'Connected'
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
    name: 'relationship',
    placeholder: 'Relationship: All',
    options: [
      {
        key: 'all',
        value: 'all',
        text: 'All'
      },
      {
        key: 'Direct',
        value: 'Direct',
        text: 'Direct'
      },
      {
        key: 'Referred',
        value: 'Referred',
        text: 'Referred'
      }
    ]
  }
]

const SubsidiaryList = () => {
  return (
    <div className="corporate-entity-main-block">
      <CommonCorporateHeader
        headerTitle="ABC Services Incorporation"
        headerIdentifier="Sample"
        headerRoleTitle="Organization Name"
        headerRole="Network Role"
        headerCount="1"
        headerCountIcon="building"
        headerCountLabel="Subsidiary"
      />

      <div className="menu-header-search">
        <CommonFilterInput filterOptions={filterOptions} />
      </div>

      <CorporateTable headers={subsidiaryHeaders} tabledata={subsidiaryList} />
    </div>
  )
}

export default SubsidiaryList
