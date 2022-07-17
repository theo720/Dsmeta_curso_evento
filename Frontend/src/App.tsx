import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Components/Header/Index"
import NotificationButtton from "./Components/NotificationButton/Index"
import SalesCard from "./Components/Sales Card/Index"


function App() {
  return (
    <>
    <ToastContainer/>
      <Header/>
      
      
    <main>
      <section id="sales">
        <div className="dsmeta-container">
        <SalesCard />
        </div>
        </section>
        </main>

    </>
  )
}

export default App
