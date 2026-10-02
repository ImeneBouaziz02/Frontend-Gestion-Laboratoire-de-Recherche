import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Outil } from 'src/Modèles/Outil';
import { OutilService } from 'src/Services/outil.service';
import { ToolFormComponent } from '../tool-form/tool-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {

  displayedColumns: string[] = ['id', 'date', 'source', 'action'];
  dataSource: Outil[] = [];

  constructor(private OS: OutilService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.OS.getAll().subscribe(data => {
      this.dataSource = data;
    });
  }

  openCreate(): void {
    const dialogRef = this.dialog.open(ToolFormComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.OS.add(res).subscribe(() => this.fetch());
      }
    });
  }

  openEdit(outil: Outil): void {
    const dialogRef = this.dialog.open(ToolFormComponent, {
      width: '400px',
      data: outil
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res && outil.id) {
        this.OS.update(outil.id, res).subscribe(() => this.fetch());
      }
    });
  }

  delete(id: number): void { // ⚠️ Changé de string à number
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.OS.delete(id).subscribe(() => this.fetch());
      }
    });
  }
}