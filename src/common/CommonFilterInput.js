import React from 'react'
import { Pagination } from 'semantic-ui-react'

import CommonInput from './CommonInput'
import CommonFilterDropdown from './CommonFilterDropdown'

const CommonFilterInput = ({ filterOptions }) => {
  return (
    <div className="menu-header">
      <CommonInput
        inputStyle="search-input"
        icon="search"
        iconPosition="left"
        placeholder="Search ..."
      />
      <CommonFilterDropdown options={filterOptions} />
      <div className="pagination-wrapper">
        <div className="pagination">
          <Pagination
            defaultActivePage={1}
            firstItem={null}
            lastItem={null}
            pointing
            secondary
            totalPages={3}
          />
        </div>
      </div>
    </div>
  )
}

export default CommonFilterInput
