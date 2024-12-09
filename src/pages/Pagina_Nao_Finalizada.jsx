import React from 'react';
import Barra_de_Navegacao from '../components/Navbar';
import "../css/pagina_nao_finalizada.css"; // Reutilizando o mesmo CSS para manter o estilo consistente
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer } from '@fortawesome/free-solid-svg-icons';

function EmDesenvolvimento() {
    return (
        <div>
            <Barra_de_Navegacao />
            <div className="em-desenvolvimento">
                <h1>Página em Desenvolvimento</h1>
                <p>
                    Este recurso está em construção. Em breve, traremos novidades para você!
                </p>
                <FontAwesomeIcon icon={faHammer} className="icone-desenvolvimento" />
            </div>
        </div>
    );
}

export default EmDesenvolvimento;
