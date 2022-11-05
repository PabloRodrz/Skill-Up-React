import './Title.css'

const Title = ({ Size = "h1", text }) => {
  return (
    <Size className="Title"> { text } </Size>
  )
}

export default Title
