import buttonStyles from './button.module.css'

const ON_CLICK = function () { console.log('Botón accionado!') }
const VARIANT = {
  primary: buttonStyles.buttonPrimary,
  secondary: buttonStyles.buttonSecondary
}
const OPTIONS = {
  uppercase: {
    true: buttonStyles.buttonUppercase,
    false: buttonStyles.buttonLowercase
  }
}

function Button({ variant = VARIANT, action = ON_CLICK, text = '', options = OPTIONS }) {
  const CLASSNAME = [
    typeof variant === "object"
      ? VARIANT['primary']
      : VARIANT[variant],
    Object.entries(options).map((el) => OPTIONS[el[0]][el[1]]).join(' ')
  ]
    .join(' ')
    .trim()

  return (
    <button
      className={CLASSNAME}
      onClick={typeof action !== 'function' ? ON_CLICK : action}
    >
      {text || 'Botón'}
    </button>
  )
}

export default Button
