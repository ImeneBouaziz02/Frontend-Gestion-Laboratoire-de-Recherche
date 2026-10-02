export interface Evt {
  id?: number;
  titre: string;
  date: string; // Format: "yyyy-MM-dd"
  lieu: string;
  membreIds?: number[];
}
// tejem taamelha class ama tzid constructor 