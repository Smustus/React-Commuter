import { ReactNode } from 'react'
import './tableRow.css'

interface TableRowProps {
  children: ReactNode,
  onClick?: () => void,
  interactive?: boolean,
  active?: boolean,
}

const TableRow: React.FC<TableRowProps> = ({children, onClick, interactive, active}) => {
  return (
    <div className={`${interactive ? "interactive" : ""} ${active ? "active" : ""} tableRow`} onClick={onClick}>
      {children}
    </div>
  )
}

export default TableRow