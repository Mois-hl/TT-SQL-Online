import './QueryList.css';
import { useMainContext } from '../../context/Context';
import NavBar from '../../components/NavBar/NavBar';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import { deleteDocById, getQueryList } from '../../firebase/client';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FaPencil } from 'react-icons/fa6';
import Loading from '../../components/Loading/Loading';
import UpdateQuery from '../../components/UpdateQuery/UpdateQuery';

export default function QueryList() {

  const { showNav, setShowNav, showUpdateQuery, setShowUpdateQuery } = useMainContext()

  const [rows, setRows] = useState()

  const [loading, setLoading] = useState(false)

  const [item, setItem] = useState()

  useEffect(() => {
    setLoading(true)
    getQueryList()
    .then(snapshot => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        console.log(list);
        setRows(list);
      })
    .catch(err => console.log(err))
    setLoading(false)
  }, [])

  const handleDeleteDoc = (id) => {
    setLoading(true)
    deleteDocById(id)
    .then(()=> {
      console.log('success');
      const rowsFilter = rows.filter((item) => item.id != id)
      setRows(rowsFilter);
    })
    .catch(err => console.log(err))
    setLoading(false)
  }

  const handleUpdate = (item) => {
    setShowUpdateQuery(true)
    setItem(item);
  }

  const renderTable = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
        <table style={{ width: '80%' }}>
          <thead>
            <tr>
              <th>título</th>
              <th>descripción</th>
              <th>sentencia SQL</th>
              <th>opciones</th>
            </tr>
          </thead>
          <tbody>
            {
              rows.map((item, rowId) => (
                <tr key={rowId}>
                  {
                    <td>{item['title']}</td>
                  }
                  {
                    <td>{item['description']}</td>
                  }
                  {
                    <td>{item['query']}</td>
                  }
                  <td><FaRegTrashCan className='iconos-table-queryList' style={{ color: '#f54848' }} onClick={() => handleDeleteDoc(item.id)} /><FaPencil onClick={() => handleUpdate(item)} className='iconos-table-queryList' style={{ color: '#09f', marginLeft: '10px'}} /></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <>
      <header>
        <RxHamburgerMenu onClick={() => setShowNav(!showNav)} style={{ cursor: 'pointer' }} />
      </header>
      <div>
        <NavBar show={showNav} />
      </div>
      { loading && <Loading /> }
      { showUpdateQuery && <UpdateQuery item={item} /> }
      {rows && renderTable()}
    </>
  )
}