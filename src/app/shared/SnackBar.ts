import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AlertComponent } from "./components/alert/alert.component";
import { ConfirmActionComponent } from "./components/confirm-action/confirm-action.component";
import { LoadingDialogComponent } from "./components/loading-dialog/loading-dialog.component";


const openSnackBar = (estado: string, mensaje: string, icon: string, color: string, duration: number = 3000, _snackBar: MatSnackBar) => {
    _snackBar.openFromComponent(AlertComponent, {
      duration: duration,
      horizontalPosition: "right",
      verticalPosition: "top",
      data: {
        estado: estado,
        message: mensaje,
        icon: icon,
      },
      panelClass: [color]
    });
  }

const openSnackBarLoading = (dialog: MatDialog) => {
    dialog.open(LoadingDialogComponent, {
      width: '500px',
      disableClose: true,
    });
}

const opeDialogAlert = (id:number, dialog: MatDialog, message: string, title: string, icon: string) => {
    const dialogo = dialog.open(ConfirmActionComponent, {
      width: '500px',
      disableClose: false,
      data: {
        id: id,
        message: message,
        title: title,
        icon: icon,
        dialog: dialog,
      }
    });


    return dialogo;

}

const closeSnackBarLoading = (dialog: MatDialog) => {
    dialog.closeAll();
}

export { openSnackBar, openSnackBarLoading, closeSnackBarLoading, opeDialogAlert }