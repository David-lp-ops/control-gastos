import React from 'react'
import Mensaje from './Mensaje'
const NuevoPresupuesto = ({presupuesto,setPresupuesto,setIsValid}) => {

  const [mensaje, setMensaje] = React.useState('')

  const handlePresupuesto = (e) => {
    e.preventDefault();
    if(!presupuesto || presupuesto < 0){
      setMensaje('No es un presupuesto válido')
      return;
    }
    setMensaje('')
    setIsValid(true)

    
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
       <form onSubmit={handlePresupuesto} className='formulario'>
        <div className="campo">
            <label>Definir el Presupuesto

            </label>
            <input type="number" className="nuevo-presupuesto"
             placeholder="Ingrese el Presupuesto"
             value={presupuesto}
             onChange={e => setPresupuesto(Number(e.target.value))}
             />
        </div>
        <input type="submit"  value="Añadir" />
        {mensaje && <Mensaje  children={mensaje} tipo='error'/>}
       </form>
       
    </div>
  )
}

export default NuevoPresupuesto