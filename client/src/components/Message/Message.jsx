export default function Message({ message, error }) {

    const renderTypeMessage = () => {
        if(message.error){
            return <><span style={{ color: '#ff0000' }}>SQL-Error: </span><h5>{message.data}</h5></>
        }else{
            return <><span style={{ color: '#1199f5' }}>SQL-Mensaje: </span><h5>{message.data}</h5></>
        }
    }

    return(
        <div style={{ background: '#fff', borderRadius: '10px', padding: '13px' }}>
            {
                renderTypeMessage()
            }
        </div>
    )
}