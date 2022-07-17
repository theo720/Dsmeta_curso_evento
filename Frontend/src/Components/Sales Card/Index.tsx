import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NotificationButton from "../NotificationButton/Index"
import ptBr from "date-fns/locale/pt-BR"
import { registerLocale } from "react-datepicker"
import "./Estilos.css"
import axios from "axios";
import { BASE_URL } from "../../util/request";
import { Sale } from "../../models/sale";
registerLocale("ptBr", ptBr);
function SalesCard() {

  const min = new Date(new Date().setDate(new Date().getDate() - 365));
  const max = new Date();
  const [Min_Data, setMin_data] = useState(min);
  
  const [Max_Data, setMax_data] = useState(max);
  const [sales, setsales] = useState<Sale[]>([])
  useEffect(() => {
    const dmin = Min_Data.toISOString().slice(0,10);
    const dmax = Max_Data.toISOString().slice(0,10)
    axios.get(`${BASE_URL}/sales?mindate=${dmin}&maxdate=${dmax}`).then(response => {
      setsales(response.data.content);
    });
  }, [Min_Data,Max_Data])
  return (
    <div className="dsmeta-card">
      <h2 className="dsmeta-sales-title">Vendas</h2>
      <div>
        <div className="dsmeta-form-control-container">
          <DatePicker
            locale={ptBr}
            selected={Min_Data}
            onChange={(date: Date) => setMin_data(date)}
            className="dsmeta-form-control"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="dsmeta-form-control-container">
          <DatePicker
            locale={ptBr}
            selected={Max_Data}
            onChange={(date: Date) => setMax_data(date)}
            className="dsmeta-form-control"
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      <div>
        <table className="dsmeta-sales-table">
          <thead>
            <tr>
              <th className="show992">ID</th>
              <th className="show576">Data</th>
              <th>Vendedor</th>
              <th className="show992">Visitas</th>
              <th className="show992">Vendas</th>
              <th>Total</th>
              <th>Notificar</th>
            </tr>
          </thead>
          <tbody>
            {
              sales.map(sale => {
                return (
                  <tr key={sale.id}>
                    <td className="show992">{sale.id}</td>
                    <td className="show576">{new Date(sale.date).toLocaleDateString()}</td>
                    <td>{sale.sellerName}</td>
                    <td className="show992">{sale.visited}</td>
                    <td className="show992">{sale.deals}</td>
                    <td>R$ {parseFloat(sale.amount.toFixed(2)).toLocaleString('pt-BR', {
                      currency: 'BRL',
                      minimumFractionDigits: 2
                    })}</td>
                    <td>
                      <NotificationButton saleId={sale.id} />
                    </td>
                  </tr>
                )
              })
            }

          </tbody>

        </table>
      </div>

    </div>

  )


}
export default SalesCard 