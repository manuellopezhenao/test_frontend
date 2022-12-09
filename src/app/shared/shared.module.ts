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
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { RouterModule } from '@angular/router';







@NgModule({
  declarations: [
    AlertComponent,
    ConfirmActionComponent,
    LoadingDialogComponent,
    MainNavComponent
  ],
  imports: [
    CommonModule,
    errorTailorImports,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    RouterModule
  ],
  exports: [
    errorTailorImports,
    AlertComponent,
    ConfirmActionComponent,
    LoadingDialogComponent,
    MainNavComponent
  ]
})
export class SharedModule { }
