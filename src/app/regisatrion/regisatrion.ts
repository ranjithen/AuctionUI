
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
interface PlayerRegistration {
  name: string;
  phone: string;
  roleID: string;
  daysAvailable: string;
  password: string;
  imageUrl?: string;
}
@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-regisatrion',
  styleUrl: './regisatrion.css',
  templateUrl: './regisatrion.html',
})
export class Regisatrion {
  player: PlayerRegistration = {
    name: '',
    phone: '',
    roleID: '',
    daysAvailable: '',
    password: '',
    imageUrl: ''
  };

  imagePreview: string = 'noImage.png';
  selectedFile!: File;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  onFileSelected(event: any): void {

    const file = event.target.files[0];

    if (!file) {
      return;
    }

    this.selectedFile = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.player.imageUrl = this.imagePreview;
      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);
  }

  isSubmitted = false;
  isSaving = false;
  registerPlayer(form: any): void {

    this.isSubmitted = true;

    if (form.invalid || !this.selectedFile) {
      return;
    }
    this.isSaving = true;
    imageUrl: this.selectedFile // Assuming you want to save the image with the phone number as the filename

    const payload = {
      name: this.player.name,
      phone: this.player.phone,
      roleID: this.player.roleID,
      daysAvailable: this.player.daysAvailable,
      password: this.player.password,
      profileImage: this.selectedFile // Assuming you want to save the image with the phone number as the filename
    };

    const formData = new FormData();

    formData.append('name', this.player.name);
    formData.append('phone', this.player.phone);
    formData.append('roleID', this.player.roleID.toString());
    formData.append('daysAvailable', this.player.daysAvailable.toString());
    formData.append('password', this.player.password);
    if (this.selectedFile) {
      formData.append('ProfileImage', this.selectedFile);
    }

    this.http.post(
      'http://localhost:5286/api/player/register',
      formData
    ).subscribe({
      next: () => {

        Swal.fire({
          icon: 'success',
          title: '🏏 Welcome to VPL',
          html: `
    <b>Player Registered Successfully!</b><br><br>
    Get ready to showcase your talent in
    <span style="color:#ffc107;">
      Vattapinni Premier League
    </span>`,
          confirmButtonText: 'Lets Play',
          confirmButtonColor: '#28a745',
          background: '#0f172a',
          color: '#fff',
          backdrop: `
    rgba(0,0,0,0.8)
  `
        });

        form.resetForm();
        this.isSaving = false;
        this.imagePreview = 'noImage.png';
        this.selectedFile = null as any;
        this.isSubmitted = false;
      },
      error: (err: any) => {
        this.isSaving = false;
        if (err.status === 400) {
          //alert(err.error.message);
          Swal.fire({
            icon: 'warning',
            title: 'Already Registered',
            text: err.error.message,
            confirmButtonColor: '#f59e0b'
          });
        } else {
          alert('Registration failed');
        }
      }
    });
  }

  resetForm(): void {

    this.player = {
      name: '',
      phone: '',
      roleID: '',
      daysAvailable: '',
      password: '',
      imageUrl: ''
    };

    this.imagePreview = 'noImage.png';
  }

}
