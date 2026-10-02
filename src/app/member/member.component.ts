import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Member } from 'src/Modèles/Member';
import { MemberService } from 'src/Services/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
displayedColumns: string[] = ['id', 'cin', 'nom', 'prenom', 'email', 'dateNaissance', 'type', 'action'];
  dataSource: Member[] = [];

  constructor(private MS: MemberService, private dialog: MatDialog) { }

  fetch(): void {
    this.MS.GetAllMembers().subscribe((members) => {
      this.dataSource = members;
    });
  }

  ngOnInit(): void {
    this.fetch();
  }

  delete(id: number): void { // ⚠️ Changé de string à number
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.MS.deleteMemberById(id).subscribe(() => {
          this.fetch();
        });
      }
    });
  }
}