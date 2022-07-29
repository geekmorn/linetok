import { PropsWithChildren } from 'react'
import classnames from 'classnames'
import styles from './box.module.sass'

export const Box: React.FC<PropsWithChildren> = ({ children }) => (
  <div className={classnames(styles.box)}>{children}</div>
)
