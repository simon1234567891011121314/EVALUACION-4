import { useEffect, useState } from 'react'
import PokeCarta from './PokeCarta'

function PokeListado() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargarPokemones = async () => {
      try {
        const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')

        if (!respuesta.ok) {
          throw new Error('No se pudo obtener la lista de Pokémon')
        }

        const datos = await respuesta.json()

        const resultadosDetallados = await Promise.all(
          datos.results.map(async (pokemon) => {
            const detalleRespuesta = await fetch(pokemon.url)

            if (!detalleRespuesta.ok) {
              throw new Error(`No se pudo obtener ${pokemon.name}`)
            }

            const detalle = await detalleRespuesta.json()

            return {
              id: detalle.id,
              name: detalle.name,
              type: detalle.types.map((entry) => entry.type.name),
              sprite: detalle.sprites.front_default,
            }
          })
        )

        setPokemons(resultadosDetallados)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    cargarPokemones()
  }, [])

  if (loading) {
    return <p className="status">Cargando Pokémon...</p>
  }

  if (error) {
    return <p className="status error">{error}</p>
  }

  return (
    <section className="pokemon-grid" aria-label="Listado de Pokémon">
      {pokemons.map((pokemon) => (
        <PokeCarta
          key={pokemon.id}
          name={pokemon.name}
          type={pokemon.type}
          id={pokemon.id}
          sprite={pokemon.sprite}
        />
      ))}
    </section>
  )
}

export default PokeListado
