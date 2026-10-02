import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Outil } from 'src/Modèles/Outil';

@Component({
  selector: 'app-tool-form',
  templateUrl: './tool-form.component.html'
})
export class ToolFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ToolFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Outil | null
  ) {}

  ngOnInit(): void {
    // ✅ Convertir la date string en Date pour le datepicker
    const dateValue = this.data?.date ? new Date(this.data.date) : null;
    
    this.form = new FormGroup({
      date: new FormControl(dateValue, Validators.required),
      source: new FormControl(this.data?.source || null, Validators.required)
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