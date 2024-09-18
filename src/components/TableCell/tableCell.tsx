import { ReactNode } from 'react'
import './tablecell.css'

interface TablecellProps {
  children: ReactNode,

}

const Tablecell = ({children}: TablecellProps) => {
  return (
    <div className='tableCell'>
      <p>{children}</p>
    </div>
  )
}

export default Tablecell