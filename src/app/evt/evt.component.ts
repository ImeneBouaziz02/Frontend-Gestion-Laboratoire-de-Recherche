import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Evt } from 'src/Modèles/Evt';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EvenementService } from 'src/Services/evenement.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EventCreateComponent } from '../event-create/event-create.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-evt',
  templateUrl: './evt.component.html',
  styleUrls: ['./evt.component.css']
})
export class EvtComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Evt>;
  displayedColumns: string[] = ['id', 'titre', 'date', 'lieu', 'action'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private ES: EvenementService, 
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    this.fetch();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetch(): void {
    this.ES.GetAllEvts().subscribe((events: Evt[]) => {
      this.dataSource.data = events;
    });
  }

  applyFilter(evt: Event): void {
    const filterValue = (evt.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  open(): void {
    const dialogRef = this.dialog.open(EventCreateComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((data: Evt) => {
      if (data) {
        this.ES.addEvent(data).subscribe(() => {
          this.fetch();
        });
      }
    });
  }

  openEdit(id: number): void { // ⚠️ Changé de string à number
    this.ES.getEventById(id).subscribe((event: Evt) => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '500px';
      dialogConfig.disableClose = true;
      dialogConfig.data = event;

      const dialogRef = this.dialog.open(EventCreateComponent, dialogConfig);

      dialogRef.afterClosed().subscribe((updatedData: Evt) => {
        if (updatedData) {
          this.ES.updateEvent(id, updatedData).subscribe(() => {
            this.fetch();
          });
        }
      });
    });
  }

  deleteEvent(id: number): void { // ⚠️ Changé de string à number
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.ES.deleteEvent(id).subscribe(() => {
          this.fetch();
        });
      }
    });
  }
}