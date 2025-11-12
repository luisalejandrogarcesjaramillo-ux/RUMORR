import Scene from '../components/Scene'
import LeadModal from '../components/LeadModal'
import { UI_STRINGS } from '../src/config'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-900">
      <div className="w-full max-w-6xl">
        <h1 className="text-5xl font-bold mb-2 text-center">{UI_STRINGS.HERO_TITLE}</h1>
        <p className="text-center text-gray-400 mb-8">{UI_STRINGS.HERO_SUBTITLE}</p>
        <Scene />
        <section className="max-w-2xl mx-auto mt-8 text-center">
          <p className="text-lg text-gray-300">
            Interactúa con el objeto, descubre la historia y déjanos tus datos si quieres saber más.
          </p>
        </section>
      </div>
      <LeadModal />
    </main>
  )
}
