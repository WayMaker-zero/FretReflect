import { Guitar } from "lucide-react"

export default function Header() {
  return (
    <header className="text-center py-8">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Guitar className="w-8 h-8 text-amber-700" />
        <h1 className="text-3xl font-bold tracking-wide text-stone-800">
          指映
        </h1>
      </div>
      <p className="text-stone-500 text-sm">FretReflect — 指板映像，一目了然</p>
    </header>
  )
}
