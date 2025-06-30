import { Suspense, lazy, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'

const PetList = lazy(() => import ('./pages/PetList'))
const PetDetail = lazy(() => import ('./pages/PetDetail'))
const EditPet = lazy(() => import ('./pages/EditPet'))
const AddPet = lazy(() => import ('./pages/AddPet'))

function App() {

  const [petToEdit, setPetToEdit] = useState(null)

  return (
    <div className="App bg-[#1B4D3E] min-h-screen p-10" >
      <Router>
        <div className='flex justify-between items-center p-4 bg-[#1B4D3E] text-white font-poppins'>
          <h1 className='text-[#F9F6EE]'>Pet shelter</h1>

          <Link to='/add'>
            <button className='bg-[#F9F6EE] text-[#1B4D3E] hover:border-none rounded-3xl'>Add new pet</button>
          </Link>
        </div>

        <Routes>
          <Route path='/' element={<Suspense fallback={<></>}><PetList /></Suspense>}/>

          <Route path='/:petId' element={<Suspense fallback={<></>}><PetDetail setPetToEdit={setPetToEdit} /></Suspense>}/>

          <Route path='/:petId/edit' element={<Suspense fallback={<></>}><EditPet petToEdit={petToEdit} /></Suspense>}/>

          <Route path='/add' element={<Suspense fallback={<></>}><AddPet /></Suspense>}/>
        </Routes>

      </Router>
    </div>
  )
}

export default App