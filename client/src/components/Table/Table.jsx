export default function Table ({ rows }) {
    return(
        <table>
          <thead>
            <tr>
              {
                Object.keys(rows[0]).map((item) => (
                  <th key={item}>{item}</th>
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
    )
}