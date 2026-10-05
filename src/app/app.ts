import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Regisatrion } from './regisatrion/regisatrion';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  imports: [CommonModule,Regisatrion,
    ReactiveFormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('VPL_UI');
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],

      phone: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: [''],
      daysAvailable: [''],
      terms: [false, Validators.requiredTrue]
    });
  }



  imagePreview: string | ArrayBuffer | null = "noImage.png";
  selectedFile!: File;

  onFileSelected(event: any): void {
    
    const file = event.target.files[0];

    if (file) {

      this.selectedFile = file;

      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  register() {

  const formData = new FormData();

  formData.append('name', this.registerForm.value.name);
  formData.append('email', this.registerForm.value.email);
  formData.append('phone', this.registerForm.value.phone);
  formData.append('password', this.registerForm.value.password);

  if (this.selectedFile) {
    formData.append('profileImage', this.selectedFile);
  }

  console.log('Form Submitted');
}
}
