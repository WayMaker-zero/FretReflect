import { useEffect, useRef } from "react"
import { Application, Graphics, Text, TextStyle, Container } from "pixi.js"
import { getAllFretNotes, FRET_COUNT } from "../constants/tuning"
import { getNoteColor } from "../utils/fretboard"
import type { ChordDefinition } from "../types"

const FRETBOARD_COLOR = 0x5c3a21
const FRET_COLOR = 0xd4c5b9
const STRING_COLOR = 0xb8a99a
const NUT_COLOR = 0xf5f0eb
const FRETBOARD_WIDTH = 800
const FRETBOARD_HEIGHT = 320
const LEFT_MARGIN = 80
const TOP_MARGIN = 32
const BOTTOM_MARGIN = 16

const INLAY_FRETS = [3, 5, 7, 9, 12]
const DOUBLE_INLAY = [12]

const CHORD_MARKER_COLOR = 0xf59e0b
const CHORD_MARKER_ALPHA = 0.9

interface FretboardCanvasProps {
  projectedChord: ChordDefinition | null
}

const fretAreaWidth = FRETBOARD_WIDTH - LEFT_MARGIN - 16
const fretAreaHeight = FRETBOARD_HEIGHT - TOP_MARGIN - BOTTOM_MARGIN
const fretWidth = fretAreaWidth / (FRET_COUNT + 1)
const stringGap = fretAreaHeight / 5

export default function FretboardCanvas({ projectedChord }: FretboardCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<Application | null>(null)
  const chordLayerRef = useRef<Container | null>(null)

  useEffect(() => {
    let destroyed = false

    async function init() {
      if (!containerRef.current) return

      const app = new Application()
      await app.init({
        width: FRETBOARD_WIDTH,
        height: FRETBOARD_HEIGHT,
        backgroundColor: 0xfffbeb,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      })

      if (destroyed) {
        app.destroy(true, { children: true })
        return
      }

      containerRef.current.appendChild(app.canvas)
      appRef.current = app

      drawFretboard(app)
    }

    init()

    return () => {
      destroyed = true
      if (appRef.current) {
        appRef.current.destroy(true, { children: true })
        appRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const app = appRef.current
    if (!app) return

    if (chordLayerRef.current) {
      app.stage.removeChild(chordLayerRef.current)
      chordLayerRef.current.destroy({ children: true })
      chordLayerRef.current = null
    }

    if (!projectedChord) return

    const chordContainer = new Container()
    drawChordOverlay(chordContainer, projectedChord)
    app.stage.addChild(chordContainer)
    chordLayerRef.current = chordContainer
  }, [projectedChord])

  return (
    <section className="max-w-4xl mx-auto px-4 mb-8">
      <h2 className="text-lg font-semibold text-stone-700 mb-4 flex items-center gap-2">
        <span className="w-1.5 h-5 bg-blue-500 rounded-full inline-block" />
        指板音位图 · {FRET_COUNT}品
      </h2>
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-4 overflow-x-auto">
        <div
          ref={containerRef}
          className="min-w-[800px] flex justify-center"
        />
        <p className="text-center text-xs text-stone-400 mt-2">
          横向 = 品丝　纵向 = 琴弦(上1弦最细 → 下6弦最粗)　左侧方形 = 空弦音
        </p>
      </div>
    </section>
  )
}

function drawFretboard(app: Application) {
  const allNotes = getAllFretNotes()

  const container = new Container()
  app.stage.addChild(container)

  const board = new Graphics()
  board.roundRect(LEFT_MARGIN - 4, TOP_MARGIN - 4, fretAreaWidth + 8, fretAreaHeight + 8, 6)
  board.fill(FRETBOARD_COLOR)
  container.addChild(board)

  for (let f = 0; f <= FRET_COUNT; f++) {
    const x = LEFT_MARGIN + f * fretWidth
    const line = new Graphics()
    if (f === 0) {
      line.rect(x - 3, TOP_MARGIN - 6, 6, fretAreaHeight + 12)
      line.fill(NUT_COLOR)
    } else {
      line.rect(x - 1, TOP_MARGIN, 2, fretAreaHeight)
      line.fill(FRET_COLOR)
    }
    container.addChild(line)
  }

  for (let s = 0; s < 6; s++) {
    const y = TOP_MARGIN + s * stringGap
    const line = new Graphics()
    line.roundRect(LEFT_MARGIN, y - (6 - s) * 0.5, fretAreaWidth, 1 + s * 0.3, 1)
    line.fill({ color: STRING_COLOR, alpha: 0.8 })
    container.addChild(line)
  }

  for (const fret of INLAY_FRETS) {
    const x = LEFT_MARGIN + fret * fretWidth - fretWidth / 2
    const y = TOP_MARGIN + fretAreaHeight / 2
    const isDouble = DOUBLE_INLAY.includes(fret)

    const dot = new Graphics()
    if (isDouble) {
      dot.circle(x, y - stringGap, 4)
      dot.fill({ color: 0xf5f0eb, alpha: 0.6 })
      const dot2 = new Graphics()
      dot2.circle(x, y + stringGap, 4)
      dot2.fill({ color: 0xf5f0eb, alpha: 0.6 })
      container.addChild(dot)
      container.addChild(dot2)
    } else {
      dot.circle(x, y, 4)
      dot.fill({ color: 0xf5f0eb, alpha: 0.6 })
      container.addChild(dot)
    }
  }

  const fret0TextStyle = new TextStyle({
    fontSize: 11,
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    fontWeight: "700",
    fill: "#ffffff",
    align: "center",
  })

  for (let s = 0; s < 6; s++) {
    const y = TOP_MARGIN + s * stringGap
    const stringNotes = allNotes[s]

    for (let f = 0; f <= FRET_COUNT; f++) {
      const note = stringNotes[f]
      const x = LEFT_MARGIN + f * fretWidth - fretWidth / 2
      const cssColor = getNoteColor(note.note)

      if (f === 0) {
        const boxSize = 22
        const box = new Graphics()
        box.roundRect(x - boxSize / 2, y - boxSize / 2, boxSize, boxSize, 5)
        box.fill(cssHexToNumber(cssColor))
        box.stroke({ color: 0xffffff, width: 1 })
        container.addChild(box)

        const text = new Text({
          text: note.note.replace("#", "♯"),
          style: fret0TextStyle,
        })
        text.anchor.set(0.5)
        text.x = x
        text.y = y
        container.addChild(text)
      } else {
        const textStyle = new TextStyle({
          fontSize: 14,
          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: "700",
          fill: cssColor,
          align: "center",
        })
        const text = new Text({
          text: note.note.replace("#", "♯"),
          style: textStyle,
        })
        text.anchor.set(0.5)
        text.x = x
        text.y = y
        container.addChild(text)
      }
    }
  }

  const stringLabelStyle = new TextStyle({
    fontSize: 11,
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    fontWeight: "500",
    fill: "#78716c",
    align: "right",
  })

  const stringLabels = ["1弦", "2弦", "3弦", "4弦", "5弦", "6弦"]
  for (let s = 0; s < 6; s++) {
    const y = TOP_MARGIN + s * stringGap
    const label = new Text({ text: stringLabels[s], style: stringLabelStyle })
    label.anchor.set(1, 0.5)
    label.x = LEFT_MARGIN - 36
    label.y = y
    container.addChild(label)
  }

  const fretLabelStyle = new TextStyle({
    fontSize: 10,
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    fontStyle: "italic",
    fill: "#78716c",
    align: "center",
  })

  for (let f = 1; f <= FRET_COUNT; f++) {
    const x = LEFT_MARGIN + f * fretWidth - fretWidth / 2
    const label = new Text({ text: `${f}`, style: fretLabelStyle })
    label.anchor.set(0.5, 0)
    label.x = x
    label.y = TOP_MARGIN + fretAreaHeight + 6
    container.addChild(label)
  }

  const nutLabel = new Text({ text: "琴枕", style: fretLabelStyle })
  nutLabel.anchor.set(0.5, 0)
  nutLabel.x = LEFT_MARGIN
  nutLabel.y = TOP_MARGIN + fretAreaHeight + 6
  container.addChild(nutLabel)
}

function drawChordOverlay(container: Container, chord: ChordDefinition) {
  const { fingering } = chord

  for (let i = 0; i < 6; i++) {
    const fretValue = fingering[i]
    const y = TOP_MARGIN + i * stringGap

    if (fretValue !== null && fretValue > 0) {
      const x = LEFT_MARGIN + fretValue * fretWidth - fretWidth / 2

      const ring = new Graphics()
      ring.circle(x, y, 10)
      ring.stroke({ color: CHORD_MARKER_COLOR, width: 2, alpha: CHORD_MARKER_ALPHA })
      container.addChild(ring)

      const dot = new Graphics()
      dot.circle(x, y, 4)
      dot.fill({ color: CHORD_MARKER_COLOR, alpha: CHORD_MARKER_ALPHA })
      container.addChild(dot)

    } else if (fretValue === 0) {
      const indicatorStyle = new TextStyle({
        fontSize: 14,
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        fontWeight: "700",
        fill: "#f59e0b",
        align: "center",
      })
      const indicator = new Text({ text: "○", style: indicatorStyle })
      indicator.anchor.set(0.5)
      indicator.x = LEFT_MARGIN - 20
      indicator.y = y
      container.addChild(indicator)

    } else if (fretValue === null) {
      const indicatorStyle = new TextStyle({
        fontSize: 14,
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        fontWeight: "700",
        fill: "#78716c",
        align: "center",
      })
      const indicator = new Text({ text: "✕", style: indicatorStyle })
      indicator.anchor.set(0.5)
      indicator.x = LEFT_MARGIN - 20
      indicator.y = y
      container.addChild(indicator)
    }
  }
}

function cssHexToNumber(css: string): number {
  return parseInt(css.replace("#", ""), 16)
}
