import { ALL_NOTES, NATURAL_NOTES, ENHARMONIC_NAMES } from "../constants/notes"
import { getNoteColor } from "../utils/fretboard"

const SOLFEGE_MAP: Record<string, string> = {
  C: "Do", D: "Re", E: "Mi", F: "Fa", G: "Sol", A: "La", B: "Si",
}

export default function ScalePanel() {
  return (
    <section className="max-w-3xl mx-auto px-4 mb-8">
      <h2 className="text-lg font-semibold text-stone-700 mb-4 flex items-center gap-2">
        <span className="w-1.5 h-5 bg-amber-500 rounded-full inline-block" />
        基础音阶 · 一个八度
      </h2>
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
        <div className="flex items-end justify-center">
          {ALL_NOTES.map((note) => {
            const isNatural = NATURAL_NOTES.includes(note)
            const color = getNoteColor(note)

            if (isNatural) {
              return (
                <div key={note} className="flex flex-col items-center shrink-0">
                  <div
                    className="flex flex-col items-center justify-center rounded-md bg-white shadow-sm"
                    style={{
                      width: 48,
                      height: 60,
                      borderWidth: 2,
                      borderStyle: "solid",
                      borderColor: color,
                      color: color,
                    }}
                  >
                    <span className="text-base font-bold leading-tight">{note}</span>
                    <span className="text-[10px] leading-tight opacity-60">
                      {SOLFEGE_MAP[note]}
                    </span>
                  </div>
                </div>
              )
            }

            const enh = ENHARMONIC_NAMES[note]
            return (
              <div key={note} className="relative shrink-0" style={{ width: 0 }}>
                <div
                  className="absolute rounded-full bg-white flex flex-col items-center justify-center shadow-sm"
                  style={{
                    width: 26,
                    height: 26,
                    left: -13,
                    top: -6,
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderColor: color,
                    color: color,
                  }}
                >
                  {enh && (
                    <>
                      <span className="text-[8px] font-bold leading-none">{enh.sharp}</span>
                      <span className="text-[7px] font-medium leading-none opacity-70">{enh.flat}</span>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <p className="text-center text-xs text-stone-400 mt-4">
          方形 = 自然音 (白键)　圆形 = 半音 (黑键)　升降双名标注
        </p>
      </div>
    </section>
  )
}
