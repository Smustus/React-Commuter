import { ReactNode } from 'react'
import './tableHeader.css'

interface TableHeaderProps {
  children: ReactNode,
}

const TableHeader = ({children}: TableHeaderProps) => {
  return (
    <h3 className='tableHeader'>
      {children}
    </h3>
  )
}

export default TableHeader