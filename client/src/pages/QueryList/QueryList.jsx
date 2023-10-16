import './QueryList.css';
import { useMainContext } from '../../context/Context';
import NavBar from '../../components/NavBar/NavBar';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import { deleteDocById, getQueryList, useAuth } from '../../firebase/client';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FaPencil } from 'react-icons/fa6';
import { AiFillCopy } from 'react-icons/ai';
import Loading from '../../components/Loading/Loading';
import UpdateQuery from '../../components/UpdateQuery/UpdateQuery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function QueryList() {

  const { showNav, setShowNav, showUpdateQuery, setShowUpdateQuery } = useMainContext()

  const [rows, setRows] = useState()

  const [loading, setLoading] = useState(false)

  const [item, setItem] = useState()

  const currentUser = useAuth()

  useEffect(() => {
    setLoading(true)
    getQueryList(currentUser?.email)
    .then(snapshot => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        // console.log(list);
        setRows(list);
        setLoading(false)
      })
    .catch(err => console.log(err))
  }, [currentUser])

  const handleDeleteDoc = (id) => {
    setLoading(true)
    deleteDocById(id, currentUser.email)
    .then(()=> {
      const rowsFilter = rows.filter((item) => item.id != id)
      setRows(rowsFilter);
      setLoading(false)
    })
    .catch(err => console.log(err))
  }

  const handleUpdate = (item) => {
    setShowUpdateQuery(true)
    setItem(item);
  }

  const notify = () => toast.success("Texto copiado al portapapeles!");

  const renderTable = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
        <table style={{ width: '80%' }}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Sentencia SQL</th>
              <th>Opciones</th>
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
                  <td style={{ padding: '0 10px' }}>
                    <div style={{ display: 'flex', gap: '3px' }}>
                      <FaRegTrashCan className='iconos-table-queryList' style={{ color: '#f54848' }} onClick={() => handleDeleteDoc(item.id)} />
                      <FaPencil onClick={() => handleUpdate(item)} className='iconos-table-queryList' style={{ color: '#09f' }} />
                      <AiFillCopy className='iconos-table-queryList' onClick={() => {navigator.clipboard.writeText(item.query); notify()}} />
                    </div>
                  </td>
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
    <div className={showUpdateQuery ? 'brightness-querylist' : ''}>
      <ToastContainer autoClose={2000} />
      <header>
        <RxHamburgerMenu onClick={() => setShowNav(!showNav)} style={{ cursor: 'pointer' }} />
      </header>
      <div>
        <NavBar show={showNav} />
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} >
        { loading && <Loading /> }
      </div>
      {rows && renderTable() }
    </div>
      { showUpdateQuery && <UpdateQuery item={item} /> }
    </>
  )
}