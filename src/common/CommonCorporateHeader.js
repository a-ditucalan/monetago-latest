import React, { Fragment } from 'react'
import { Icon } from 'semantic-ui-react'

import CorporateModal from '../components/CorporateModal'

const CommonCorporateHeader = ({
  headerTitle,
  headerIdentifier,
  headerRoleTitle,
  headerRole,
  headerCount,
  headerCountIcon,
  headerCountLabel,
  headerBtnIcon,
  headerBtnLabel,
  headerBtnClass,
  infoData,
  open,
  tabsItem,
  onClickTab,
  innerTab,
  onClose,
  onOpen,
  img
}) => {
  return (
    <div>
      <div className="corp-header-wrapper">
        <div className="corp-header-info">
          <p className="corp-header-title">{headerTitle}</p>
          {headerIdentifier ? (
            <p className="corp-header-identifier content-subtitle">
              <span>Corporate Identifier : </span>
              <span className="corp-header-identifier-text content-type">
                {headerIdentifier}
              </span>
            </p>
          ) : null}
        </div>
        <div className="corp-header-subinfo">
          {headerRoleTitle && (
            <p className="corp-header-role-title">{headerRoleTitle}</p>
          )}
          {headerRole && <p className="corp-header-role">{headerRole}</p>}
          {headerCount && headerCountLabel && (
            <div className="corp-header-inheritance">
              <p className="corp-header-inehritance-title">
                <Icon name={headerCountIcon} /> {headerCount} {headerCountLabel}
              </p>
            </div>
          )}

          {headerBtnLabel && infoData ? (
            <Fragment>
              <CorporateModal
                btnTitle={headerBtnLabel}
                infoData={infoData}
                open={open}
                tabsItem={tabsItem}
                onClickTab={onClickTab}
                innerTab={innerTab}
                onClose={onClose}
                btnClass="corporate-btn"
                img={img}
                onOpen={onOpen}
              />
            </Fragment>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default CommonCorporateHeader
