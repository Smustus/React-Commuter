import { ReactNode } from 'react'
import './tableBody.css'

interface TableBodyProps {
  children: ReactNode,
}

const TableBody = ({children}: TableBodyProps) => {
  return (
    <div className='tableBody'>
      {children}
    </div>
  )
}

export default TableBody