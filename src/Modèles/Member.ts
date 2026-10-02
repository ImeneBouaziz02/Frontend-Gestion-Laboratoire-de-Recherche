export interface Member {
  id?: number;
  cin: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  cv: string;
  email: string;
  password?: string;

  // Enseignant
  grade?: string;
  etablissement?: string;
  etudiants?: Member[];

  // Étudiant
  dateInscription?: string;
  sujet?: string;
  diplome?: string;
}
