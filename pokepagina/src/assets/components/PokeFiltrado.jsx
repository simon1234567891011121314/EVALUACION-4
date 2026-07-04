function PokeFiltrado({ filtroTipo, setFiltroTipo, busqueda, setBusqueda, tiposDisponibles }) {
  const manejarBusqueda = (evento) => {
    const valor = evento.target.value.trimStart().slice(0, 20)
    setBusqueda(valor.toLowerCase())
  }

  return (
    <section className="filtro-panel" aria-label="Filtrar Pokémon">
      <label className="filtro-busqueda" htmlFor="buscar-pokemon">
        <span>Buscar por nombre</span>
        <input
          id="buscar-pokemon"
          type="text"
          value={busqueda}
          onChange={manejarBusqueda}
          placeholder="Ej. Pikachu"
          maxLength={20}
        />
      </label>

      <div className="filtro-tipos" role="group" aria-label="Filtrar por tipo">
        <button type="button" className={`tipo-boton ${filtroTipo === '' ? 'activo' : ''}`} onClick={() => setFiltroTipo('')}>
          Todos
        </button>
        {tiposDisponibles.map((tipo) => (
          <button
            key={tipo}
            type="button"
            className={`tipo-boton ${filtroTipo === tipo ? 'activo' : ''}`}
            onClick={() => setFiltroTipo(tipo)}
          >
            {tipo}
          </button>
        ))}
      </div>
    </section>
  )
}

export default PokeFiltrado
