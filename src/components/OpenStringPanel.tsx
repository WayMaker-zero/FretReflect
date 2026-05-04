import { STANDARD_TUNING } from "../constants/tuning"
import { NOTE_LABEL_CN } from "../constants/notes"
import { getNoteColor } from "../utils/fretboard"

export default function OpenStringPanel() {
  return (
    <section className="max-w-3xl mx-auto px-4 mb-8">
      <h2 className="text-lg font-semibold text-stone-700 mb-4 flex items-center gap-2">
        <span className="w-1.5 h-5 bg-emerald-500 rounded-full inline-block" />
        空弦音 · 标准调弦
      </h2>
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5">
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          {STANDARD_TUNING.map((s) => {
            const color = getNoteColor(s.note)
            const label = NOTE_LABEL_CN[s.note]
            return (
              <div key={s.stringNumber} className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-stone-400">{s.stringNumber}弦</span>
                <div
                  className="w-14 h-14 rounded-full flex flex-col items-center justify-center shadow-sm"
                  style={{ backgroundColor: color, color: "#fff" }}
                >
                  <span className="text-lg font-bold leading-tight">{s.note}</span>
                  <span className="text-[10px] opacity-80 leading-tight">{s.octave}</span>
                </div>
                <span className="text-[11px] text-stone-500">{label.split(" ")[1]?.replace(/[()]/g, "") || label}</span>
              </div>
            )
          })}
        </div>
        <p className="text-center text-xs text-stone-400 mt-3">
          从右到左：1弦(最细) → 6弦(最粗)　标准音高 E4·B3·G3·D3·A2·E2
        </p>
      </div>
    </section>
  )
}
