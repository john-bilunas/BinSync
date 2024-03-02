import React from 'react'

function CustomerOptions({name, id}) {
  return (
    <>
        <option value={id}>{name}</option>
    </>
  )
}

export default CustomerOptions;