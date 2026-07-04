function PokeCarta({ name, type, id, sprite, smallSprite }) {
  const tipos = Array.isArray(type) ? type : [type]
  const nombre = name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Pokémon'
  const pokeBallSprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'

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
        <div className="pokemon-card__id-row">
          <img className="pokemon-card__id-sprite" src={pokeBallSprite} alt="" loading="lazy" />
          <p className="pokemon-card__id">#{String(id).padStart(3, '0')}</p>
        </div>
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
