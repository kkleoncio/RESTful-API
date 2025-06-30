import React, { useState } from 'react'
import axios from 'axios'

function AddPet() {

    const [petName, setPetName] = useState()
    const [petType, setPetType] = useState()
    const [petAge, setPetAge] = useState()
    const [petBreed, setPetBreed] = useState()

    const addPet = async () => {
        try {
            const petData = {
                name: petName,
                type: petType,
                age: petAge,
                breed: petBreed
            }

            /* FETCH */
            // const response = await fetch('http://localhost:3000/pets/', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(petData)
            // })

            // if (response.status === 200) {
            //     const data = await response.json()
            //     window.location.href = `/${data.id}`
            // }

            /* AXIOS */
            const response = await axios.post(
                'http://localhost:3000/pets/',
                petData,
                { headers: { 'Content-Type': 'application/json' } }
            )

            if (response.status === 200) window.location.href = `/`

        } catch (error) {
            console.error('error', error)
        }
    }

    return (
        <div className='bg-white rounded-lg w-[50%] mx-auto p-5 shadow-xl' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className='bg-[#1B4D3E] h-2 w-full mx-auto rounded-2xl mb-2'></div>
            <h2 className='flex text-[#1B4D3E] text-xl font-semibold mb-5 mt-4'>Add Pet</h2>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', aligniItems: 'center' }}>

                <div style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>
                    <label>Pet name</label>
                    <input className='p-2 rounded-lg bg-green-100 w-80 mt-2' type='text' value={petName} onChange={e => setPetName(e.target.value)} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>
                    <label>Pet type</label>
                    <input className='p-2 rounded-lg bg-green-100 w-80 mt-2' type='text' value={petType} onChange={e => setPetType(e.target.value)} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>
                    <label>Pet age</label>
                    <input className='p-2 rounded-lg bg-green-100 w-80 mt-2' type='text' value={petAge} onChange={e => setPetAge(e.target.value)} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>
                    <label>Pet breed</label>
                    <input className='p-2 rounded-lg bg-green-100 w-80 mt-2' type='text' value={petBreed} onChange={e => setPetBreed(e.target.value)} />
                </div>

                <button
                    className='px-2 py-1 text-sm text-[#F9F6EE] bg-[#1B4D3E] font-semibold rounded-3xl hover:bg-[#043927] hover:text-green-200 transition w-40 m-auto'
                    style={{ marginTop: 30 }}
                    onClick={() => addPet()}
                >
                    Add pet
                </button>
            </div>
        </div>
    )
}

export default AddPet