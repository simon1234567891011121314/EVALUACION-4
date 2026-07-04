import { useMemo, useState } from 'react'
import './App.css'
import PokeFiltrado from './assets/components/PokeFiltrado'
import PokeListado from './assets/components/PokeListado'

function App() {
  const [filtroTipo, setFiltroTipo] = useState('')
  const [busqueda, setBusqueda] = useState('')

  const tiposDisponibles = useMemo(
    () => [
      'normal',
      'fire',
      'water',
      'grass',
      'electric',
      'ice',
      'fighting',
      'poison',
      'ground',
      'flying',
      'psychic',
      'bug',
      'rock',
      'ghost',
      'dragon',
      'dark',
      'steel',
      'fairy',
    ],
    []
  )

  return (
    <main className="app">
      <section className="page">
        <header className="page-header">
          <h1>Pokédex inicial</h1>
          <p className="subtitle">
            Explora los primeros 151 Pokémon con su sprite y su tipo.
          </p>
        </header>

        <PokeFiltrado
          filtroTipo={filtroTipo}
          setFiltroTipo={setFiltroTipo}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          tiposDisponibles={tiposDisponibles}
        />

        <PokeListado filtroTipo={filtroTipo} busqueda={busqueda} />
      </section>
    </main>
  )
}

export default App
