/**  Copyright 2020 MonetaGo, Inc.  All Rights Reserved.
 *  This code is copyrighted material that is confidential andproprietary to MonetaGo, Inc.
 *  and may not (in whole or in part) be published, publicly displayed,copied, modified or
 *  used in any way other than as expressly permitted in a writtenagreement executed by
 *  MonetaGo, Inc.  No portion of this code may be used to createderivative works or exploited
 *  in any other way without MonetaGo, Inc.’s prior written consent.  Noportion of this code
 *  may be transmitted or redistributed to any person without MonetaGo,Inc.’s prior written
 *  consent. This notice may not be deleted or modified without MonetaGo,Inc.’s consent.
 */

import React from 'react'
import CommonButton from '../../common/CommonButton'
import CommonInput from '../../common/CommonInput'

const ResetPassword = () => {
  const onEnterSubmit = event => {
    if (event.key === 'Enter' || event.type === 'click') {
      console.log(event.type)
    }
  }

  return (
    <div className="reset-password-wrapper">
      <div className="reset-img"></div>
      <form className="forgotpass-wrapper" onKeyDown={onEnterSubmit}>
        <div className="forgotpass-content">
          <img
            src={require('../../assets/images/monetaGo-logo.png')}
            alt="Logo"
            className="forgotpass-logo"
          />
          <div className="form-title">RESET YOUR PASSWORD</div>
          <div className="forgotpass-subtitle form-subtitle-sm">
            A strong password helps prevent unauthorized access to your account.
          </div>

          <div className="password-wrapper">
            <CommonInput
              icon="lock"
              iconPosition="left"
              placeholder="Current Password"
              inputStyle="common-input"
              type="password"
            />
            <CommonInput
              icon="lock"
              iconPosition="left"
              placeholder="New Password"
              inputStyle="common-input"
              type="password"
            />
            <CommonInput
              icon="lock"
              iconPosition="left"
              placeholder="Confirm New Password"
              inputStyle="common-input"
              type="password"
            />
          </div>
          <CommonButton
            content="SUBMIT"
            btnClass="forgotpass-btn btn-blue"
            onClick={onEnterSubmit}
          />
        </div>
      </form>
    </div>
  )
}

export default ResetPassword
