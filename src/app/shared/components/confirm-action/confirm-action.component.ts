import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-action',
  templateUrl: './confirm-action.component.html',
  styleUrls: ['./confirm-action.component.css']
})
export class ConfirmActionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<ConfirmActionComponent>) { }

  ngOnInit(): void {
  }

  aceptar() {
    this.dialog.close({ success: true, message: "Aceptar" });
  }
  cancelar() {
    this.dialog.close({ success: false, message: "Cancelar" });
  }

}
