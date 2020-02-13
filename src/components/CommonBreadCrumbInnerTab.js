import React, { Fragment } from 'react'
import CommonBreadCrumb from '../common/CommonBreadCrumb'
import InnerTabs from './InnerTabs'

const CommonBreadCrumbInnerTab = ({
  sections,
  onClickTab,
  tabsItem,
  innerTab
}) => {
  return (
    <Fragment>
      <InnerTabs
        onClickTab={onClickTab}
        tabsItem={tabsItem}
        innerTab={innerTab}
      />

      <CommonBreadCrumb sections={sections} />
    </Fragment>
  )
}

export default CommonBreadCrumbInnerTab
