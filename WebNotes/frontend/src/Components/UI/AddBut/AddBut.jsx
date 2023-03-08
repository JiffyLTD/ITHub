import React from 'react'
import { Button } from 'react-bootstrap'

const AddBut = ({className, onClick}) => {
  return (
    <Button className={className} onClick={onClick} variant='success'>
        Добавить заметку
    </Button>
  )
}

export default AddBut