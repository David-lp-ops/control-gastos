import { useState, useEffect } from "react"
import {CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setPresupuesto,
  setGastos,
  setIsValid,

}) => {
  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(presupuesto)
  const [gastado, setGastado] = useState(0)

  useEffect(() => {
    const totalGastos = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
    const disponible = presupuesto - totalGastos
    const Nuevoporcentaje = ((( presupuesto-disponible) / presupuesto) * 100).toFixed(2);
    
    setDisponible(disponible)
    setGastado(totalGastos)
    setTimeout(() => {
      setPorcentaje(Nuevoporcentaje)
    },1000);
  },[gastos])


  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('es-US', {style: 'currency', currency: 'PEN'})
  }
  const handleResetApp = () => {
    const resultado =confirm('¿Estas seguro de Reiniciar presupuesto y gastos?')
    if(resultado) {
      setPresupuesto(0)
      setGastos([])
      setIsValid(false)
    }
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
       <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
            trailColor: '#F5F5F5',
            textColor: '#3B82F6',
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado` }
        ></CircularProgressbar>
       </div>
       
        <div className='contenido-presupuesto'>
            <button className="reset-app" 
            type="button"
            onClick={handleResetApp}
           >
              Resetear App
            </button>
            <p>
                <span>Presupesto: </span> {formatearCantidad(presupuesto)}
            </p>

            <p className={`${disponible < 0 ? 'negativo ': '' }`}>
                <span>Disponible: </span> {formatearCantidad(disponible)}
            </p>

            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
        </div>
        
        </div>
  )
}

export default ControlPresupuesto