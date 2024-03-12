import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'
import './index.scss'
import './main.scss'
import api from './services/api'

function App() {
  const [count, setCount] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {
    if (count === '') {
      alert("preencha algun cep")
    }

    try {
      const response = await api.get(`${count}/json`)
      setCep(response.data)
      setCount("")

    } catch {

      setCount("")
    }
  }

  return (
    <>
      <div className="container" id=''>
        <h1 className='title'>Buscador Cep</h1>

        <div className="containerInput">
          <input
            placeholder='Digite seu Cep'
            type="text"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
          <button className='buttonSearch'
            onClick={handleSearch}>
            <FiSearch size={25} color='black' />
          </button>
        </div>
        {Object.keys(cep).length > 0 && (
          <main className='Main'>
            <h2>Cep: {cep.cep}</h2>
            <span>Rua:{cep.logradouro}</span>
            <span>Complemento:{cep.complemento}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>Localidade: {cep.localidade} {cep.uf}</span>
          </main>
        )}

      </div>
    </>
  )
}

export default App