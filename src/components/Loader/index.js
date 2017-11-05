import React from 'react'

import './index.css'

export default ({ type, size }) =>
  type === 'spinner' ? (
    <div className="loader">
      <div className="spinner" style={{ width: size, height: size }} />
    </div>
  ) : (
    <div id="circleG">
      <div id="circleG_1" className="circleG" />
      <div id="circleG_2" className="circleG" />
      <div id="circleG_3" className="circleG" />
    </div>
  )
