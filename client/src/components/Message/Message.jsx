export default function Message({ message, error }) {

    const renderTypeMessage = () => {
        if(message.error){
            return <><span style={{ color: '#ff0000' }}>SQL-Error: </span><h4>{message.data}</h4></>
        }else{
            return <><span style={{ color: '#1199f5' }}>SQL-Mensaje: </span><h4>{message.data}</h4></>
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