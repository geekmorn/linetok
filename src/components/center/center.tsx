import { PropsWithChildren } from 'react'
import classnames from 'classnames'
import styles from './center.module.sass'

interface CenterProps extends PropsWithChildren {
  sx?: any
}

export const Center: React.FC<CenterProps> = ({ children, sx }) => (
  <div className={classnames(styles.center)} style={sx}>
    {children}
  </div>
)
