import styled from './Title.module.css'

const Title = ({ Size = "h1", text }) => {
  return (
    <Size className={ styled.title }> { text } </Size>
  )
}

export default Title
