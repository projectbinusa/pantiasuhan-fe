import React from 'react'

export const Button = ({setModal}) => {
  return (
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>setModal(true)}>
  Launch demo modal
</button>

  )
}
