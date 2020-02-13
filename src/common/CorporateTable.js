import React, { Fragment } from 'react'
import { Icon, Table } from 'semantic-ui-react'

import CommonCheckbox from '../common/CommonCheckbox'

const CorporateTable = ({ tabledata, headers, info }) => {
  return (
    <div className="counter-parties-table">
      <Table unstackable>
        <Table.Header>
          <Table.Row>
            {headers.map((header, i) => {
              return header.key === 'checkbox' ? (
                <Table.HeaderCell key={i}>
                  <CommonCheckbox />
                </Table.HeaderCell>
              ) : (
                <Table.HeaderCell key={i}>
                  {header.content}
                  {typeof header.content === 'string' && header.content ? (
                    <Icon name="sort" className="sort" />
                  ) : null}
                </Table.HeaderCell>
              )
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tabledata !== ''
            ? tabledata.map((data, i) => {
                return (
                  <Table.Row key={i}>
                    <Table.Cell>
                      <CommonCheckbox
                      // onClick={checkbox}
                      // checked={checked}
                      />
                    </Table.Cell>
                    {Object.keys(data).map((key, index) => {
                      if (key === 'uniqueId') {
                        return (
                          <Fragment key={index}>
                            <Table.Cell className="uid">{data[key]}</Table.Cell>
                          </Fragment>
                        )
                      } else if (key === 'legalName') {
                        return (
                          <Fragment key={index}>
                            <Table.Cell className="common-data">
                              {data[key]}
                            </Table.Cell>
                          </Fragment>
                        )
                      } else if (key === 'connected') {
                        return (
                          <Table.Cell key={index} className="connected-wrapper">
                            {data.connected === 'Connected' ? (
                              <span className="connected">
                                {data.connected}
                              </span>
                            ) : (
                              <span className={data.connected}>Pending</span>
                            )}
                          </Table.Cell>
                        )
                      } else {
                        return (
                          <Table.Cell key={index} className="common-data">
                            {data[key]}
                          </Table.Cell>
                        )
                      }
                    })}
                    <Table.Cell width={info === 'Search' ? 3 : 1}>
                      {info === 'Search' ? (
                        <div className="menu">
                          <Icon name="plus" />
                          Request to Connect
                        </div>
                      ) : (
                        <Icon name="ellipsis vertical" className="menu" />
                      )}
                    </Table.Cell>
                  </Table.Row>
                )
              })
            : null}
        </Table.Body>
      </Table>
    </div>
  )
}
export default CorporateTable
