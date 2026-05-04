import { ALL_NOTES, NATURAL_NOTES, NOTE_LABEL_CN } from "../constants/notes"
import { getNoteColor } from "../utils/fretboard"

export default function ScalePanel() {
  return (
    <section className="max-w-3xl mx-auto px-4 mb-8">
      <h2 className="text-lg font-semibold text-stone-700 mb-4 flex items-center gap-2">
        <span className="w-1.5 h-5 bg-amber-500 rounded-full inline-block" />
        基础音阶 · 一个八度
      </h2>
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5">
        <div className="flex items-end justify-center gap-1 sm:gap-2 flex-wrap">
          {ALL_NOTES.map((note) => {
            const isNatural = NATURAL_NOTES.includes(note)
            const color = getNoteColor(note)
            return (
              <div
                key={note}
                className="flex flex-col items-center"
                style={{ minWidth: isNatural ? "44px" : "28px" }}
              >
                <div
                  className="rounded-full flex items-center justify-center font-bold transition-shadow hover:shadow-md"
                  style={{
                    width: isNatural ? "40px" : "22px",
                    height: isNatural ? "40px" : "22px",
                    backgroundColor: isNatural ? color : `${color}40`,
                    color: isNatural ? "#fff" : color,
                    fontSize: isNatural ? "0.9rem" : "0.65rem",
                    marginTop: isNatural ? "0" : "9px",
                    marginBottom: isNatural ? "0" : "9px",
                  }}
                  title={NOTE_LABEL_CN[note]}
                >
                  {isNatural ? note : note.replace("#", "♯")}
                </div>
                {isNatural && (
                  <span className="text-[10px] text-stone-400 mt-1">
                    {NOTE_LABEL_CN[note].split(" ")[1]?.replace(/[()]/g, "") || ""}
                  </span>
                )}
              </div>
            )
          })}
        </div>
        <p className="text-center text-xs text-stone-400 mt-3">
          大圆 = 自然音 (白键)　小圆 = 半音 (黑键)
        </p>
      </div>
    </section>
  )
}
