import React from 'react'
import * as RB from 'react-bootstrap'
import { connect } from 'react-redux'

import './ListModeRow.css'

const ListModeRow = (props) => {
    const { items } = props

    const _listRows = items.map((item, i) => {
        if (item)
            return <tr key={i}><td>{item.name}</td><td>{item.desc}</td></tr>
        else
            return null
    })

    return (
        <RB.Row className="list-row-container">
            <RB.Col xs={12}>
                <RB.Table striped condensed hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {_listRows}
                    </tbody>
                </RB.Table>
            </RB.Col>
        </RB.Row>
    )
}

// Redux: we are creating a method that will add the State into Props.
const mapStateToProps = (state, props) => {
    const _c = state.containers.filter(c => c.cid === props.cid)[0]
    const activeFolderId = _c.activeFolderId
    const _f = _c.folders.filter(f => f.fid === activeFolderId)[0]

    return {
        items: _f.objects
    }
}

// Registering the method to component using Redux Connect
export default connect(mapStateToProps)(ListModeRow)
