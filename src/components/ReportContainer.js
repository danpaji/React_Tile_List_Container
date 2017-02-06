import React, { Component } from 'react'
import * as RB from 'react-bootstrap'
import { connect } from 'react-redux'

import HeaderRow from './HeaderRow'
import ListModeRow from './ListModeRow'
import TileModeRow from './TileModeRow'

// We import the classes that override some Bootstrap definitions
import './ReportContainer.css'


class ReportContainer extends Component {

    render() {
        const { container } = this.props
        const { name, cid, renderMode } = container

        let _viewModeRow = []
        if (renderMode === "tile")
            _viewModeRow = (<TileModeRow cid={cid} />)
        else    
            _viewModeRow = (<ListModeRow cid={cid} />)

        return (
            <RB.Grid fluid style={{ backgroundColor: "#F1F4F9", margin:"0 0 10px" }} id={cid} >

                <HeaderRow cname={name} cid={cid} />
                {_viewModeRow}

            </RB.Grid>
        )
    }
}

// Redux: we are creating a method that will add the State into Props.
const mapStateToProps = (state, props) => {
    const _c = state.containers.filter(c => c.cid === props.cid)[0]
    return {
        container: _c
    }
}

// Registering the method to component using Redux Connect
export default connect(mapStateToProps)(ReportContainer)