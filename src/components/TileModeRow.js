import React from 'react'
import * as RB from 'react-bootstrap'

import { connect } from 'react-redux'

const Tile = (props) => {
    const { item } = props
    const { name, desc, pict, action } = item

    const _tileContainerStyle = { float: "left", backgroundColor: "#FFF", padding: "10px 5px", height: "auto", border: "1px solid #AAA", margin: "8px 6px" }
    const _tileIconSectionStyle = { height: "inherit", width: "auto", margin: "0px 5px", verticalAlign: "top", display: "inline-block" }
    const _tileTitleDescStyle = { height: "inherit", width: "250px", verticalAlign: "top", display: "inline-block", margin: "5px 5px 0" }
    return (
        <div style={_tileContainerStyle}>
            <div style={_tileIconSectionStyle}>
                <img alt={pict.caption} src={pict.url} />
            </div>
            <div style={_tileTitleDescStyle}>
                <p style={{ fontSize: "14px", color: "#378AC5", height: "36px" }}>
                    <a href={action} target="_blank">
                        {name}
                    </a>
                </p>
                <p style={{ fontSize: "12px", height: "70px", overflowY: "auto", paddingRight: "5px" }}>{desc}</p>
                <RB.ButtonToolbar style={{ borderTop: "1px solid #DDD" }}>
                    <RB.Button bsStyle="warning" bsSize="sm" style={{ marginTop: "7px", rightMargin: "5pm" }} className="pull-right">Edit</RB.Button>
                </RB.ButtonToolbar>

            </div>
        </div>
    )
}


const TileModeRow = (props) => {
    const { height, items } = props

    const _tileContainerStyle = { height: height ? height : "240px", overflowY: "scroll" }
    const _tiles = items.map((item, i) => {
        if (item)
            return <Tile key={item.id} item={item} />
        else
            return null
    })

    return (
        <RB.Row style={_tileContainerStyle}>
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