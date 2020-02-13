import React from 'react'

const LayoutTable = ({ children }) => {
  return (
    <div className="common-entity-wrapper">
      <div className="corporate-entity">{children}</div>
    </div>
  )
}

export default LayoutTable
