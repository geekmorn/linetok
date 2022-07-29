import { PropsWithChildren } from 'react'
import classNames from 'classnames'
import styles from './text.module.sass'

interface TextProps extends PropsWithChildren {
  Component?: any
}

export const Text: React.FC<TextProps> = ({
  children,
  Component = <span />
}) => {
  return <Component className={classNames(styles.text)}>{children}</Component>
}
