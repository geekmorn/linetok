import classnames from 'classnames'
import styles from './input.module.sass'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange
}) => (
  <input
    className={classnames(styles.input)}
    type={type}
    placeholder={placeholder}
    value={value ?? ''}
    onChange={onChange}
  />
)
