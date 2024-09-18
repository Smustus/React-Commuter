import { ReactNode } from 'react'
import './header.css'

interface HeaderProps {
  children: ReactNode,
}

const Header = ({children}: HeaderProps) => {
  return (
    <header className='header'>
      {children}
    </header>
  )
}

export default Header