//import libs
import React from 'react'
import PropTypes from 'prop-types'

// import components
import AppBar from 'material-ui/AppBar';
import topbarLogout from '../components/navigation/topbarLogout'

const propTypes = {
  children: PropTypes.node.isRequired,
  authed: PropTypes.bool.isRequired,

}

function PrivateLayout({ children }) {
  return<div>
    <AppBar
      title="Meeting Room Scheduler"
      iconElementRight={topbarLogout}
      iconStyleRight={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '0'
      }}
    />
    <div className="container d-flex justify-content-center mt-3">
      <div className="row">
        <main style={{minHeight: '90vh'}}>
          {children}

        </main>
      </div>
    </div>
  </div>
}

PrivateLayout.propTypes = propTypes

export default PrivateLayout
