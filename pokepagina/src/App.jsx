import './App.css'
import PokeListado from './assets/components/PokeListado'

function App() {
  return (
    <main className="app">
      <section className="page">
        <header className="page-header">
          <p className="eyebrow">Etapa 2</p>
          <h1>Pokédex inicial</h1>
          <p className="subtitle">
            Explora los primeros 151 Pokémon con su sprite y su tipo.
          </p>
        </header>
        <PokeListado />
      </section>
    </main>
  )
}

export default App
