import { useEffect, useMemo, useState } from 'react'
import './App.css'
import PokeFiltrado from './assets/components/PokeFiltrado'
import PokeListado from './assets/components/PokeListado'

const STORAGE_KEYS = {
  favoritos: 'pokepagina-favoritos',
  bloqueados: 'pokepagina-bloqueados',
}

const leerDesdeStorage = (clave) => {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const valor = window.localStorage.getItem(clave)
    return valor ? JSON.parse(valor) : []
  } catch {
    return []
  }
}

const guardarEnStorage = (clave, valor) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(clave, JSON.stringify(valor))
}

const TOTAL_POKEMONES = 151

function App() {
  const [filtroTipo, setFiltroTipo] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [favoritos, setFavoritos] = useState(() => leerDesdeStorage(STORAGE_KEYS.favoritos))
  const [bloqueados, setBloqueados] = useState(() => leerDesdeStorage(STORAGE_KEYS.bloqueados))

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

  const alternarFavorito = (pokemon) => {
    setFavoritos((actual) => {
      const yaEsFavorito = actual.some((item) => item.id === pokemon.id)

      if (yaEsFavorito) {
        return actual.filter((item) => item.id !== pokemon.id)
      }

      return [...actual, pokemon]
    })
  }

  const alternarBloqueo = (pokemon) => {
    setBloqueados((actual) => {
      const yaBloqueado = actual.some((item) => item.id === pokemon.id)

      if (yaBloqueado) {
        return actual.filter((item) => item.id !== pokemon.id)
      }

      setFavoritos((favoritosActuales) => favoritosActuales.filter((item) => item.id !== pokemon.id))

      return [...actual, pokemon]
    })
  }

  useEffect(() => {
    setFavoritos((favoritosActuales) => favoritosActuales.filter((pokemon) => !bloqueados.some((bloqueado) => bloqueado.id === pokemon.id)))
  }, [bloqueados])

  useEffect(() => {
    guardarEnStorage(STORAGE_KEYS.favoritos, favoritos)
  }, [favoritos])

  useEffect(() => {
    guardarEnStorage(STORAGE_KEYS.bloqueados, bloqueados)
  }, [bloqueados])

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

        <div className="layout-principal">
          <PokeListado
            filtroTipo={filtroTipo}
            busqueda={busqueda}
            favoritos={favoritos}
            alternarFavorito={alternarFavorito}
            bloqueados={bloqueados}
            alternarBloqueo={alternarBloqueo}
          />

          <aside className="panel-favoritos">
            <h2>Favoritos</h2>
            <div className="estadisticas">
              <div className="estadistica-item">
                <span className="estadistica-label">Favoritos</span>
                <strong>{favoritos.length}</strong>
              </div>
              <div className="estadistica-item">
                <span className="estadistica-label">Pokémon</span>
                <strong>{TOTAL_POKEMONES}</strong>
              </div>
              <div className="estadistica-item">
                <span className="estadistica-label">Bloqueados</span>
                <strong>{bloqueados.length}</strong>
              </div>
            </div>
            {favoritos.length === 0 ? (
              <p className="favoritos-vacio">Aún no has marcado favoritos.</p>
            ) : (
              <ul>
                {favoritos.map((pokemon) => (
                  <li key={pokemon.id}>
                    <span>{pokemon.name}</span>
                    <button type="button" onClick={() => alternarFavorito(pokemon)}>
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </section>
    </main>
  )
}

export default App
