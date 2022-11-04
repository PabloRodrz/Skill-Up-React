import './button.css'

const ON_CLICK = function () { console.log('Botón accionado!') }
const OPTIONS = {
  uppercase: [true, false]
}

function Button({ variant = 'primary', action = ON_CLICK, text = '', options = OPTIONS }) {
  const UPPERCASE = options.uppercase === true ? 'button-uppercase' : 'button-lowercase'
  const CLASS_NAME = `button${'-' + variant} ${options === OPTIONS ? '' : UPPERCASE}`.trim()

  return (
    <button
      className={CLASS_NAME}
      onClick={typeof action !== 'function' ? ON_CLICK : action}
    >
      {text || 'Botón'}
    </button>
  )
}

export default Button
