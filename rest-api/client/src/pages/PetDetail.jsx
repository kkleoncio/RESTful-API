import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import dogImg from '../assets/dog.avif'
import { Dog, PawPrint, Shell } from 'lucide-react'

function PetDetail({ setPetToEdit, open, onClose, petId: propPetId }) {

    const [pet, setPet] = useState([])
    const { petId: routePetId } = useParams()
    const idToUse = propPetId || routePetId

    const getPet = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/pets/${idToUse}`)
            if (response.status === 200) {
                setPet(response.data)
                setPetToEdit && setPetToEdit(response.data)
            }
        } catch (error) {
            console.error('error', error)
        }
    }

    useEffect(() => { if (open) getPet() }, [open, idToUse])

    const deletePet = async () => {
        try {
            /* FETCH */
            // const response = await fetch(`http://localhost:3000/pets/${petId}`, {
            //     method: 'DELETE'
            // })

            /* AXIOS */
            const response = await axios.delete(`http://localhost:3000/pets/${idToUse}`)

            if (response.status === 200) window.location.href = '/'
        } catch (error) {
            console.error('error', error)
        }
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className='bg-[#F9F6EE] rounded-xl shadow-lg p-8 flex flex-col justify-between items-center border border-[#F9F6EE] w-full max-w-md relative animate-fade-in'>
                <button onClick={onClose} className="absolute top-4 right-4 text-[#1B4D3E] border-none bg-transparent text-2xl font-bold hover:border-none cursor-pointer">&times;</button>
                <p className='text-[#1B4D3E] font-semibold text-2xl mb-0'>{pet?.name}</p>
                <div className='w-full flex flex-col items-center'>
                    <div className='flex items-center justify-between w-full mt-6'>
                        <div className='flex items-center justify-between'>
                            <Dog className="w-6 h-6 text-[#1B4D3E] mr-2" />
                            <p className='text-[#1B4D3E] italic'>Pet Breed:</p>
                        </div>
                         <p className='text-[#1B4D3E] italic'>{pet?.breed}</p>
                    </div>
                    <div className='flex items-center justify-between w-full mt-2'>
                        <div className='flex items-center justify-between'>
                            <PawPrint className="w-6 h-6 text-[#1B4D3E] mr-2" />
                            <p className='text-[#1B4D3E] italic'>Pet Type:</p>
                        </div>
                         <p className='text-[#1B4D3E] italic'>{pet?.type}</p>
                    </div>
                    <div className='flex items-center justify-between w-full mt-2'>
                        <div className='flex items-center justify-between'>
                            <Shell className="w-6 h-6 text-[#1B4D3E] mr-2" />
                            <p className='text-[#1B4D3E] italic'>Pet Age:</p>
                        </div>
                         <p className='text-[#1B4D3E] italic'>{pet?.age}</p>
                    </div>
                </div>
                <div className='flex items-center justify-center w-full mt-8 gap-4'>
                    <Link to={`/${pet?.id}/edit`} className="p-0 m-0 bg-transparent w-1/2">
                        <button className="w-full px-4 py-2 text-[#F9F6EE] bg-[#1B4D3E] font-bold rounded-3xl hover:bg-[#043927] hover:text-green-200 transition">Edit pet</button>
                    </Link>
                    <button
                        className="w-1/2 px-4 py-2 text-[#F9F6EE] bg-[#BD3039] font-bold rounded-3xl hover:bg-red-800 transition"
                        onClick={deletePet}
                    >
                        Delete pet
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PetDetail