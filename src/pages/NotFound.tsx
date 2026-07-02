import { Button } from "../components/ui/Button"

export function NotFound() {
  return (
    <section className="grid min-h-[60vh] place-items-center bg-slate-50 px-4 py-24">
      <div className="text-center">
        <div className="text-7xl font-bold text-gold-500">404</div>
        <h1 className="mt-4 text-2xl font-bold text-navy-900">Səhifə tapılmadı</h1>
        <p className="mt-2 text-slate-600">Axtardığınız səhifə mövcud deyil və ya köçürülüb.</p>
        <div className="mt-8 flex justify-center">
          <Button to="/">Əsas səhifəyə qayıt</Button>
        </div>
      </div>
    </section>
  )
}
