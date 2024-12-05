
import Preguntas from '../../../../Preguntas JSON/Preguntas.json';
import ListaDespegable from '../../../components/ListaDespegable/LIsta';
import Contenedor from '../../../components/Contenedor';

function PreguntasFrecuentes() {
    return (
        <> 
            <h1 className="text-center">Preguntas Frecuentes</h1>
            <div className='container mt-4'>
                <Contenedor>
                    <ListaDespegable Items={Preguntas.preguntas} />
                </Contenedor>
            </div>
        </>
    )
}

export default PreguntasFrecuentes