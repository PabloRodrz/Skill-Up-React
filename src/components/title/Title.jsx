import React from 'react'

const Title = ({ Size = "h1", text }) => {
  return (
    <Size> { text } </Size>
  )
}

export default Title