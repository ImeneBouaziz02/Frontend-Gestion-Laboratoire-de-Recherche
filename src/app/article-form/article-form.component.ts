import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pub } from 'src/Modèles/Pub';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html'
})
export class ArticleFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ArticleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pub | null
  ) {}

  ngOnInit(): void {
    // ✅ Convertir la date string en Date pour le datepicker
    const dateValue = this.data?.date ? new Date(this.data.date) : null;
    
    this.form = new FormGroup({
      type: new FormControl(this.data?.type || null, Validators.required),
      titre: new FormControl(this.data?.titre || null, Validators.required),
      lien: new FormControl(this.data?.lien || null, Validators.required),
      date: new FormControl(dateValue, Validators.required),
      sourcePdf: new FormControl(this.data?.sourcePdf || null, Validators.required) // ✅ Avec majuscule
    });
  }

  save(): void {
    if (this.form.valid) {
      const formValue = { ...this.form.value };
      
      // ✅ Convertir Date en format "yyyy-MM-dd" pour Spring Boot
      if (formValue.date instanceof Date) {
        const year = formValue.date.getFullYear();
        const month = String(formValue.date.getMonth() + 1).padStart(2, '0');
        const day = String(formValue.date.getDate()).padStart(2, '0');
        formValue.date = `${year}-${month}-${day}`;
      }
      
      this.dialogRef.close(formValue);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}