import { useState } from "react"

export default function Table({ rows, responseFlag, responseArray, setRowsSaveResponse, index, name }) {

  const handleDeleteTable = () => {
    responseArray.splice(index, 1)
    setRowsSaveResponse([...responseArray])
  }
  
  return (
    <>
      {responseFlag && <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="button-delete-table-save-response" onClick={handleDeleteTable}>X</button>
      </div>}
      {
        name && <div style={{ marginLeft: '10px', marginBottom: '5px', color: '#ddd' }} >{name}</div>
      }
      <table style={ responseFlag ? { background: '#252525' } : {} }>
        <thead>
          <tr>
            {
              Object.keys(rows[0]).map((item) => (
                <th style={ responseFlag ? { color: '#d6d6d6' } : {} } key={item}>{item}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            rows.map((item, rowId) => (
              <tr key={rowId}>
                {
                  Object.keys(rows[0]).map((key, keyId) => (
                    <td key={keyId}>{item[key]}</td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}