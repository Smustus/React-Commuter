import { ReactNode } from 'react'
import './label.css'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode,
}

const Label = ({htmlFor, children}: LabelProps) => {
  return (
    <label htmlFor={htmlFor}>
      {children}
    </label>
  )
}

export default Label