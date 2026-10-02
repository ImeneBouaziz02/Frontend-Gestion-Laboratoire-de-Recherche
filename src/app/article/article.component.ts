import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pub } from 'src/Modèles/Pub';
import { PublicationService } from 'src/Services/publication.service';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  displayedColumns: string[] = ['id', 'type', 'titre', 'date', 'sourcepdf', 'action'];
  dataSource: Pub[] = [];

  constructor(private PS: PublicationService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.PS.getAll().subscribe(data => {
      this.dataSource = data;
    });
  }

  openCreate(): void {
    const dialogRef = this.dialog.open(ArticleFormComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.PS.add(res).subscribe(() => this.fetch());
      }
    });
  }

  openEdit(pub: Pub): void {
    const dialogRef = this.dialog.open(ArticleFormComponent, {
      width: '500px',
      data: pub
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res && pub.id) {
        this.PS.update(pub.id, res).subscribe(() => this.fetch());
      }
    });
  }

  delete(id: number): void { // ⚠️ Changé de string à number
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.PS.delete(id).subscribe(() => this.fetch());
      }
    });
  }
}