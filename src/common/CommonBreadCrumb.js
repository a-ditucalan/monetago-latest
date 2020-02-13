import React from 'react'
import { Breadcrumb } from 'semantic-ui-react'

const CommonBreadCrumb = ({ sections }) => {
  return (
    <Breadcrumb icon="right angle" sections={sections} className="breadcrumb" />
  )
}

export default CommonBreadCrumb
