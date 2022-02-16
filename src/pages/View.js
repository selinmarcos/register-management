import {useState, useEffect} from 'react'
import fireDb from "../firebase"
import { useNavigate, useParams, Link } from 'react-router-dom';
import "./View.css"

const View = () => {
    const [user, setUser] = useState({})

    const {id} = useParams()
    
    useEffect(()=>{
        fireDb.child(`contacts/${id}`).get().then((snapshot)=>{
            if(snapshot.exist()){
                setUser({...snapshot.val()})
            }else{
                setUser({})
            }
        })   
     }, [id])
    return ( 
        <div style={{marginTop:"150px"}}>
            <div className='card'>
                <div className='card-header'>
                    <p>User Contact Detail</p>
                </div>
                <div className='container'>
                    <strong>ID:</strong>
                    <span>{id}</span>
                    <br />
                    <br />

                    <strong>Nombre:</strong>
                    <span>{user.name}</span>
                    <br />
                    <br />

                    <strong>Correo:</strong>
                    <span>{user.email}</span>
                    <br />
                    <br />

                    <strong>Contacto:</strong>
                    <span>{user.contact}</span>
                    <br />
                    <br />

                    <Link to="/">
                        <button className='btn btn-edit'>Ir atras</button>
                    </Link>

                </div>
            </div>
           
        </div>
     );
}
 
export default View;