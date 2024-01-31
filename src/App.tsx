import { Routes, Route } from 'react-router-dom';
import { DesignerLayout } from './layout/DesignerLayout';
import { Home } from './pages/Home';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import NotFound from './pages/NotFound';


function App() {

  return (
    <main className='w-[70%] midscreen:w-full md:m-auto h-scre scroll-smooth overflow-y-scroll'>
      <Routes>
        <Route path='/' element={<DesignerLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </main>
  )
}

export default App
