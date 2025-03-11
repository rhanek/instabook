import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AxiosEndpoint } from '../utils/query-service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { ConfirmDialogComponent } from '../utils/components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-details',
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  queryCommand!: Promise<any>;
  _id: string = "";

  readonly dialog = inject(MatDialog);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.route.paramMap.subscribe(params => {
      this._id = params.get('id') ?? "";
    })
  }

  ngOnInit() {
    if (this._id !== "" && this._id !== undefined) {
      this.queryCommand = AxiosEndpoint.users.getById(this._id);
    }
  }

  deleteUser() {
    this.queryCommand.then(userData => {
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: userData
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          AxiosEndpoint.users.delete(userData._id).then(() => {
            this.snackBar.open('¡Comando ejecutado exitosamente!', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center', 
              verticalPosition: 'bottom',
              panelClass: ['snackbar'] 
            });
            this.router.navigate(['home']);
          });
        }
      });
    });
  }

  updateUser() {
    this.queryCommand.then(userData => {
      let dialogRef = this.dialog.open(UserFormComponent, {
        height: '100vh',
        minWidth: '50vw',
        position: { right: '0px' },
        panelClass: 'full-height-dialog',
        data: userData
      });

      dialogRef.afterClosed().subscribe(x => {
        this.queryCommand = AxiosEndpoint.users.getById(this._id);
      })
    });
  }

  close() {
    this.router.navigate(['home'])
  }
}
