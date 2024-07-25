import React from 'react'
import styles from "./Button.module.css"
type buttonProps = {
    children?:React.ReactNode,
    onClick?:(e:React.MouseEvent<HTMLButtonElement>)=> void ,
    type?:string
}

export default function Button({children,onClick,type}: buttonProps) {
    if(!type) return 
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>{children}</button>
  )
}