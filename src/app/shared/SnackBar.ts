import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AlertComponent } from "./components/alert/alert.component";
import { ConfirmActionComponent } from "./components/confirm-action/confirm-action.component";



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


export { opeDialogAlert }