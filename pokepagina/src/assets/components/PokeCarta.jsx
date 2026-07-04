function PokeCarta({ name, type, id, sprite }) {
  const tipos = Array.isArray(type) ? type : [type]
  const nombre = name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Pokémon'

  return (
    <article className="pokemon-card">
      <div className="pokemon-card__image">
        {sprite ? (
          <img src={sprite} alt={nombre} loading="lazy" />
        ) : (
          <div className="pokemon-card__placeholder">?</div>
        )}
      </div>

      <div className="pokemon-card__body">
        <p className="pokemon-card__id">#{String(id).padStart(3, '0')}</p>
        <h2>{nombre}</h2>
        <div className="pokemon-card__types">
          {tipos.map((tipo) => (
            <span key={tipo} className={`type-badge ${tipo}`}>
              {tipo}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default PokeCarta
