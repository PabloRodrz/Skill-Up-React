import React from 'react'

export const Title = ({ Size = "h1", text }) => {
  return (
    <Size> { text } </Size>
  )
}
