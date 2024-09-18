import { ReactNode } from 'react'
import './tableHead.css'

interface TableHeadProps {
  children: ReactNode,
}

const TableHead = ({children}: TableHeadProps) => {
  return (
    <div className='tableHead'>
      {children}
    </div>
  )
}

export default TableHead