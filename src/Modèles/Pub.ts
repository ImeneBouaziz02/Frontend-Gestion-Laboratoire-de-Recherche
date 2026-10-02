
export interface Pub {
  id?: number;
  type: string;
  titre: string;
  lien: string;
  date: string; // Format: "yyyy-MM-dd"
  sourcePdf: string; // ⚠️ Backend utilise "sourcePdf" (avec P majuscule)
  membreId?: number;
}