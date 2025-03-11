import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterOutlet } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Actividad6';

  readonly dialog = inject(MatDialog);

  constructor(
    private router: Router
  ) {

  }

  newUser() {
    let dialogRef = this.dialog.open(UserFormComponent, {
      height: '100vh',
      minWidth: '50vw',
      position: { right: '0px' },
      panelClass: 'full-height-dialog',
    });
  }

  close() {
    this.router.navigate(['home'])
  }
}
