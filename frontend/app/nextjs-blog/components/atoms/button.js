import PropTypes from 'prop-types';

const Button = ({
  color,
  size,
  disabled,
  onClick,
  children,
}) => {

  let height = "h-8"
  switch (size) {
    case 'small':
      height = "h-8"
      break;
    case 'medium':
      height = "h-10"
      break;
    case 'large':
      height = "h-12"
      break;
  }

  return (
  <button className = {
    `disabled:opacity-50 bg-${color}-600 min-w-min ${height} text-white font-bold px-2 py-1 rounded text-center`
  } disabled={disabled} onClick={onClick}
  >
    {children}
  </button>
  )
}

export default Button

Button.propTypes = {
  color: PropTypes.oneOf(['red', 'blue', 'green']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.string,
};

