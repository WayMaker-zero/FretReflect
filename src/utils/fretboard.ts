import type { NoteName } from "../types"

export const NOTE_COLORS: Record<NoteName, string> = {
  "C": "#EF4444",
  "C#": "#F97316",
  "D": "#EAB308",
  "D#": "#84CC16",
  "E": "#22C55E",
  "F": "#06B6D4",
  "F#": "#3B82F6",
  "G": "#8B5CF6",
  "G#": "#A855F7",
  "A": "#EC4899",
  "A#": "#F43F5E",
  "B": "#6366F1",
}

export function getNoteColor(note: NoteName): string {
  return NOTE_COLORS[note]
}
