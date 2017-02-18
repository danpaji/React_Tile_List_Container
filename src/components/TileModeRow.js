import React from 'react'
import * as RB from 'react-bootstrap'

import { connect } from 'react-redux'

import './TileModeRow.css'

const Tile = (props) => {
    const { item } = props
    const { name, desc, pict, action } = item

    return (
        <div className="tile">
            <div className="tile-icon-section">
                <img alt={pict.caption} src={pict.url} />
            </div>
            <div className="tile-info-container">
                <p className="tile-container-name">
                    <a href={action} target="_blank">
                        {name}
                    </a>
                </p>
                <p className="tile-container-desc">{desc}</p>
                <RB.ButtonToolbar className="tile-info-button">
                    <RB.Button bsStyle="warning" bsSize="sm" className="pull-right">Edit</RB.Button>
                </RB.ButtonToolbar>

            </div>
        </div>
    )
}


const TileModeRow = (props) => {
    const { items } = props

    const _tiles = items.map((item, i) => {
        if (item)
            return <Tile key={item.id} item={item} />
        else
            return null
    })

    return (
        <RB.Row className="tile-container">
            <RB.Col xs={12}>
                {_tiles}
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
export default connect(mapStateToProps)(TileModeRow)