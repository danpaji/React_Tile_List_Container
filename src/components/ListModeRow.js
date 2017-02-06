import React from 'react'
import * as RB from 'react-bootstrap'
import { connect } from 'react-redux'


const ListModeRow = (props) => {
    const { height, items } = props

    const _listRows = items.map((item, i) => {
        if (item)
            return <tr key={i}><td>{item.name}</td><td>{item.desc}</td></tr>
        else
            return null
    })

    const _tileContainerStyle = { margin: "5px 0", height: height ? height : "240px", overflowY: "scroll", fontSize: "14px" }
    return (
        <RB.Row style={_tileContainerStyle}>
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
