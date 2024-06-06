import React from 'react'
import PropTypes from 'prop-types'

export default function Header (props) {
  const { heading, subHeading } = props
  return (
    <div className="text-center heading">
      <h1>{heading}</h1>
      <p>{subHeading}</p>
      <p>
        <a href="#form">{'Click here '}</a>
        {'to add a new game'}
      </p>
    </div>
  )
}

Header.propTypes = {
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string
}

Header.defaultProps = {
  subHeading: ''
}
