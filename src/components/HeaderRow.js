import React, { Component } from 'react'
import * as RB from 'react-bootstrap'

import { connect } from 'react-redux'
import * as A from '../store/actions'

import FolderIcon from 'react-icons/lib/fa/folder'
import ListIcon from 'react-icons/lib/go/list-unordered'
import TilesIcon from 'react-icons/lib/ti/th-large-outline'

import './HeaderRow.css'


class HeaderRow extends Component {

    // Handler that responds to user interaction on folder/group selection
    onFolderClick(fid) {
        const { dispatch, cid } = this.props
        dispatch(A.setActiveFolderInContainer(cid, fid))
    }

    // Handler that responds to user interaction on View Mode selection (Tile or List)
    onViewModeClick(viewMode) {
        const { dispatch, cid } = this.props
        dispatch(A.setRenderModeInContainer(cid, viewMode))
    }

    render() {
        const { folders, cname, activeFolderId } = this.props

        let _selectedItem = ""
        let _headerItems = []
        let _numObjs = 0

        if (folders) {
            _headerItems = folders.map((f, i) => {
                if (f.fid === activeFolderId) {
                    _selectedItem = f.name

                    if (f.objects)
                        _numObjs = f.objects.length

                    return <RB.MenuItem key={f.fid} onClick={this.onFolderClick.bind(this, f.fid)} active>{f.name}</RB.MenuItem>
                } else
                    return <RB.MenuItem key={f.fid} onClick={this.onFolderClick.bind(this, f.fid)}>{f.name}</RB.MenuItem>
            })
        }

        return (
            <RB.Row>
                <RB.Col xs={12} className="title-bar">
                    <span className="title-icon"><FolderIcon /></span><span  className="title-text" >{cname} ({_numObjs})</span>
                    <RB.DropdownButton bsSize="sm" bsStyle="link" title={_selectedItem} id={Date.now()}>
                        {_headerItems}
                    </RB.DropdownButton>
                    <ListIcon className="pull-right premier-svg title-icon" onClick={this.onViewModeClick.bind(this, 'list')} />
                    <TilesIcon className="pull-right premier-svg title-icon" onClick={this.onViewModeClick.bind(this, 'tile')} />
                </RB.Col>
            </RB.Row>
        )
    }
}

// Redux: we are creating a method that will add the State into Props.
const mapStateToProps = (state, props) => {
    const _c = state.containers.filter(c => c.cid === props.cid)[0]

    return {
        folders: _c.folders,
        activeFolderId: _c.activeFolderId,
        renderMode: _c.renderMode
    }
}

// Registering the method to component using Redux Connect
export default connect(mapStateToProps)(HeaderRow)