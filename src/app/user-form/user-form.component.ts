import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { AxiosEndpoint } from '../utils/query-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form',
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  mainForm: FormGroup = new FormGroup({});
  submitCommand!: Promise<any>;

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.createFormGroup();
    
    if (this.data) {
      this.applyValues(this.data)
    }
  }

  public createFormGroup(){
    this.mainForm.addControl("id", new FormControl(0));
    this.mainForm.addControl("_id", new FormControl(""));
    this.mainForm.addControl("first_name", new FormControl("", [Validators.required]));
    this.mainForm.addControl("last_name", new FormControl("", [Validators.required]));
    this.mainForm.addControl("email", new FormControl("", [Validators.required, Validators.email]));
    this.mainForm.addControl("image", new FormControl("", [Validators.required]));
    this.mainForm.addControl("password", new FormControl(""));
    this.mainForm.addControl("username", new FormControl(""));
  }

  public applyValues(user: any) {
    this.mainForm.controls['id'].setValue(user.id);
    this.mainForm.controls['_id'].setValue(user._id);
    this.mainForm.controls['first_name'].setValue(user.first_name);
    this.mainForm.controls['last_name'].setValue(user.last_name);
    this.mainForm.controls['email'].setValue(user.email);
    this.mainForm.controls['image'].setValue(user.image);
    this.mainForm.controls['password'].setValue(user.password);
    this.mainForm.controls['username'].setValue(user.username);
  }

  ////Esse methodo escolhe se vai adcionar um novo cadastro
  ////ou se vai atualizar o cadastro atual com base em se
  ////ele recebeu ou não algum dado do componente pai.
  public save() {
    if(this.data){
      this.submitCommand = AxiosEndpoint.users.update(this.mainForm.value);
    }
    else {
      this.submitCommand = AxiosEndpoint.users.create(this.mainForm.value);
    }

    this.submitCommand.then(result => {
      if(result && result.length !== 0) {
        this.dialogRef.close();
        this.snackBar.open('¡Comando ejecutado exitosamente!', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center', 
          verticalPosition: 'bottom',
          panelClass: ['snackbar'] 
        });
      }
    }).catch(error => {
      this.snackBar.open('¡Error al ejecutar el comando!', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center', 
        verticalPosition: 'bottom',
        panelClass: ['snackbar'] 
      });
    });
  }

  close() {
    this.dialogRef.close();
  }
}
