import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-form',
  templateUrl: './confirm-form.component.html',
  styleUrls: ['./confirm-form.component.css']
})
export class ConfirmFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmFormComponent>) { }

  ngOnInit(): void {
  }
  public cancel() {
    this.dialogRef.close(false);
  }

  public agree() {
    this.dialogRef.close(true);
  }
}
