import axios from "axios";
import { toast } from "react-toastify";
import icon from "../../assets/Imagens/avatar-icon 1.svg";
import { BASE_URL } from "../../util/request";
import "./Estilos.css"
type props={
    saleId : number
}
function clicado(id:number){

    axios.get(`${BASE_URL}/sales/${id}/notification`).then(response => {
        toast.info("SMS foi enviado com sucesso!")
      });
}

function NotificationButtton({saleId}:props) {

    return (
        <>
            <div className="dsmeta-red-btn" onClick={()=>clicado(saleId)}>
                <img src={icon} alt="Notificar" />
            </div>

        </>
    )
}

export default NotificationButtton
