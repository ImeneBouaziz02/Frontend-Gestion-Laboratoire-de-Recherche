import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Evt } from 'src/Modèles/Evt';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  form!: FormGroup;
  isEditMode: boolean = false;
  eventId?: number; // ✅ Changé de string à number

  constructor(
    private dialogRef: MatDialogRef<EventCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Evt | null
  ) {
    if (data) {
      this.isEditMode = true;
      this.eventId = data.id;
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    if (this.isEditMode && this.data) {
      // ✅ Convertir la date string en Date pour le datepicker
      const dateValue = this.data.date ? new Date(this.data.date) : null;
      
      this.form = new FormGroup({
        titre: new FormControl(this.data.titre, [Validators.required]),
        date: new FormControl(dateValue, [Validators.required]),
        lieu: new FormControl(this.data.lieu, [Validators.required])
      });
    } else {
      this.form = new FormGroup({
        titre: new FormControl(null, [Validators.required]),
        date: new FormControl(null, [Validators.required]),
        lieu: new FormControl(null, [Validators.required])
      });
    }
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