import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AxiosEndpoint } from '../utils/query-service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../utils/components/confirm-dialog/confirm-dialog.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  queryCommand!: Promise<any>;

  readonly dialog = inject(MatDialog);
  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {
    this.queryCommand = AxiosEndpoint.users.getAll();
  }

  viewDetails(id: string) {
    this.router.navigate(['user', id])
  }

  deleteUser(user: any) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        AxiosEndpoint.users.delete(user._id).then(() => {
          this.snackBar.open('¡Comando ejecutado exitosamente!', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center', 
            verticalPosition: 'bottom',
            panelClass: ['snackbar'] 
          });
          this.queryCommand = AxiosEndpoint.users.getAll();
        });
      }
    });
  }

  updateUser(userData: any) {
    let dialogRef = this.dialog.open(UserFormComponent, {
      height: '100vh',
      minWidth: '50vw',
      position: { right: '0px' },
      panelClass: 'full-height-dialog',
      data: userData
    });

    dialogRef.afterClosed().subscribe(x => {
      this.queryCommand = AxiosEndpoint.users.getAll();
    });
  }
}
