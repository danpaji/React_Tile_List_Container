import React, { Component } from 'react';
import ReportContainer from './components/ReportContainer'

class App extends Component {

  render() {
    const { store } = this.props
    const _storeState = store.getState()

    const _containerElems = _storeState.containers.map((c, i) => {
      return <ReportContainer key={i} cid={c.cid} />
    })

    return (
      <div>
        {_containerElems}
      </div>
    )
  }
}

export default App