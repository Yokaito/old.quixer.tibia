import { MenuBox } from '@/components/ui'
import Button from '@/components/ui/Button'
import styles from './box-login.module.scss'
import Link from 'next/link'

export const BoxLogin = () => {
  return (
    <div className={`${styles.qxBoxLogin}`}>
      <MenuBox>
        <Button>Login</Button>
        <Link
          data-qx-box-login-link
          href="/register"
          className="fondamentoTitle"
        >
          Create account
        </Link>
      </MenuBox>
    </div>
  )
}

export default BoxLogin
