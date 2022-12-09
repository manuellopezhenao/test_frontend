import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { errorTailorImports } from '@ngneat/error-tailor';
import { AlertComponent } from './components/alert/alert.component';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmActionComponent } from './components/confirm-action/confirm-action.component';
import { LoadingDialogComponent } from './components/loading-dialog/loading-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';




@NgModule({
  declarations: [
    AlertComponent,
    ConfirmActionComponent,
    LoadingDialogComponent
  ],
  imports: [
    CommonModule,
    errorTailorImports,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  exports: [
    errorTailorImports,
    AlertComponent,
    ConfirmActionComponent,
    LoadingDialogComponent
  ]
})
export class SharedModule { }
