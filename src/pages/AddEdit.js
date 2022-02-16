import {useState, useEffect} from 'react'
import {useNavigate, useLinkClickHandler, useParams} from 'react-router-dom'
import './AddEdit.css'
import fireDb from '../firebase'
import {toast} from 'react-toastify'

const initialState ={
    name:"",
    email :"",
    contact :""
}

const AddEdit = () => {
    const [state, setState] = useState(initialState)
    const [data, setData] = useState({})

    const  {name, email, contact} = state


    const history = useNavigate()

    const {id} = useParams()

    useEffect(()=>{
        fireDb.child("contacts").on("value", (snapshot) =>{
            if (snapshot.val() !== null){
                setData({...snapshot.val()})
            }else{
                setData({})
            }
        })
        return() =>{
            setData({})
        }
    },[])

    useEffect(()=>{
        if(id){
            setState({...data[id]})
        }
        else{
            setState({...initialState})
        }
        
        return() =>{
            setState({...initialState})
        }

    },[id, data])

    const handleInputChange = (e) =>{
        const {name, value} = e.target
        setState({...state, [name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!name || !email || !contact){
            toast.error("Por favor rellene todos los campos")
        }else{
            if(!id){
                fireDb.child("contacts").push(state,(err)=>{
                    if(err){
                        toast.error(err)
                    }else{
                        toast.success("Registro añadido !")
                    }
                })

            }else{
                fireDb.child(`contacts/${id}`).set(state,(err)=>{
                    if(err){
                        toast.error(err)
                    }else{
                        toast.success("Registro actualizado !")
                    }
                })

            }

            setTimeout(()=>history("/"), 500)
        }
    }


    return ( 
        <div style={{marginTop:"100px"}}>
            <form 
                style={{margin:'auto', padding: '15px', maxWidth:'400px', alignContent:'center'}}
                onSubmit={handleSubmit}
            >
                <label htmlFor="name">Name</label>
                <input type="text" id='name' name='name' placeholder='Your name' value={name || ""} onChange={handleInputChange} />

                <label htmlFor="email">Email</label>
                <input type="text" id='email' name='email' placeholder='Your email' value={email || ""} onChange={handleInputChange} />

                <label htmlFor="contact">Contact</label>
                <input type="text" id='contact' name='contact' placeholder='Your contact Number' value={contact || ""} onChange={handleInputChange} />

                <input type="submit" value={id ? "Actualizar" :"Guardar"} />
            </form>
           
        </div>
     );
}
 
export default AddEdit;