import classnames from 'classnames'
import styles from './button.module.sass'

interface Button
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    React.PropsWithChildren {}

export const Button: React.FC<Button> = ({
  children,
  onClick,
  type,
  disabled
}) => (
  <button
    className={classnames(styles.button)}
    onClick={onClick}
    type={type}
    disabled={disabled}
  >
    {children}
  </button>
)
