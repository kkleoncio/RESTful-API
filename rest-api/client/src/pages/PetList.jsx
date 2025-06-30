import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import dogImg from '../assets/dog.avif'
import PetDetail from './PetDetail'
import { Dog } from 'lucide-react' 

function PetList() {
    const [pets, setPets] = useState([])
    const [selectedPetId, setSelectedPetId] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    const getPets = async () => {
        try {
            /* FETCH */
            // const response = await fetch('http://localhost:3000/pets')
            // const data = await response.json()
            // if (response.status === 200) setPets(data)

            /* AXIOS */
            const response = await axios.get('http://localhost:3000/pets')
            if (response.status === 200) setPets(response.data)

        } catch (error) {
            console.error('error', error)
        }
    }

    useEffect(() => { getPets() }, [])

    return (
        <>
            <h2 className='flex px-4 pt-10 text-[#F9F6EE] text-xl'>Pet List</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {pets?.map((pet) => {
                return (
                    <div
                        key={pet.id}
                        className='bg-[#F9F6EE] rounded-xl shadow-lg p-6 flex flex-col justify-between items-start border border-[#F9F6EE] transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-[#1B4D3E] hover:bg-[#e5e3d7] cursor-pointer'
                        onClick={() => { setSelectedPetId(pet.id); setModalOpen(true); }}
                    >
                        <div className='bg-[#043927] h-4 w-[40%] mx-auto rounded-2xl mb-2'></div>
                        <img src={dogImg} className='w-full h-48 object-cover rounded mb-4 mt-4 transition-transform duration-300 hover:scale-105' alt="Dog" />
                        <div className="flex items-center gap-2 mb-0">
                            <p className='text-[#1B4D3E] font-semibold text-2xl mb-0'>{pet?.name}</p>
                            <Dog className="w-6 h-6 text-[#1B4D3E]" />
                        </div>
                        
                        <p className='text-[#1B4D3E] mb-1 italic'>{pet?.breed}</p>
                        <div className='flex items-center justify-between w-full mt-10'>
                        <p className='text-[#1B4D3E] bg-green-200 py-1 px-4 rounded-2xl'>{pet?.type}</p>
                            <span className="p-0 m-0 bg-transparent">
                                <button className="px-4 py-1 text-[#F9F6EE] bg-[#1B4D3E] font-bold rounded-3xl hover:bg-[#043927] hover:text-green-200 transition" onClick={e => { e.stopPropagation(); setSelectedPetId(pet.id); setModalOpen(true); }}>Pet detail</button>
                            </span>
                        </div>
                    </div>
                )
            })}
            </div>
            <PetDetail open={modalOpen} onClose={() => setModalOpen(false)} petId={selectedPetId} />
        </>
    )
}

export default PetList