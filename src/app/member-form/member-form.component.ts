import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/Services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  memberId?: number;

  constructor(
    private MS: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.params['id'];
    
    if (idParam) {
      // ✅ Mode édition
      this.isEditMode = true;
      this.memberId = Number(idParam); // Convertir string en number
      
      this.MS.getMemberById(this.memberId).subscribe((membre: any) => {
        // ✅ Convertir la date string en Date pour le datepicker
        const dateNaissanceValue = membre.dateNaissance ? new Date(membre.dateNaissance) : null;
        
        this.form = new FormGroup({
          cin: new FormControl(membre.cin, Validators.required),
          nom: new FormControl(membre.nom, Validators.required),
          prenom: new FormControl(membre.prenom, Validators.required),
          dateNaissance: new FormControl(dateNaissanceValue, Validators.required),
          cv: new FormControl(membre.cv, Validators.required),
          email: new FormControl(membre.email, [Validators.required, Validators.email]),
          password: new FormControl(membre.password),
          
          // ✅ Champs conditionnels selon le type
          grade: new FormControl(membre.grade),
          etablissement: new FormControl(membre.etablissement),
          dateInscription: new FormControl(membre.dateInscription ? new Date(membre.dateInscription) : null),
          sujet: new FormControl(membre.sujet),
          diplome: new FormControl(membre.diplome)
        });
      });
    } else {
      // ✅ Mode création
      this.isEditMode = false;
      
      this.form = new FormGroup({
        cin: new FormControl(null, Validators.required),
        nom: new FormControl(null, Validators.required),
        prenom: new FormControl(null, Validators.required),
        dateNaissance: new FormControl(null, Validators.required),
        cv: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        
        // Champs optionnels
        grade: new FormControl(null),
        etablissement: new FormControl(null),
        dateInscription: new FormControl(null),
        sujet: new FormControl(null),
        diplome: new FormControl(null)
      });
    }
  }

  onsub(): void {
    if (this.form.invalid) return;

    const formValue = { ...this.form.value };

    // ✅ Convertir toutes les dates en format "yyyy-MM-dd"
    ['dateNaissance', 'dateInscription'].forEach(field => {
      if (formValue[field] instanceof Date) {
        const date = formValue[field];
        formValue[field] = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      }
    });

    // ✅ Nettoyer les champs vides (null/undefined)
    Object.keys(formValue).forEach(key => {
      if (formValue[key] === null || formValue[key] === undefined || formValue[key] === '') {
        delete formValue[key];
      }
    });

    if (this.isEditMode && this.memberId) {
      // ✅ Mise à jour
      this.MS.updateMember(this.memberId, formValue).subscribe(() => {
        this.router.navigate(['/member']);
      });
    } else {
      // ✅ Création
      this.MS.addMember(formValue).subscribe(() => {
        this.router.navigate(['/member']);
      });
    }
  }
}