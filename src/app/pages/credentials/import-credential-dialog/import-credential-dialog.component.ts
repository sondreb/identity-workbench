import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CredentialService } from '../../../services/credential.service';

@Component({
  selector: 'app-import-credential-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './import-credential-dialog.component.html',
  styleUrls: ['./import-credential-dialog.component.css']
})
export class ImportCredentialDialogComponent {
  jsonContent = '';

  constructor(
    public dialogRef: MatDialogRef<ImportCredentialDialogComponent>,
    private credentialService: CredentialService,
    private snackBar: MatSnackBar
  ) {}

  importCredential() {
    if (!this.jsonContent) {
      this.showError('Please enter valid JSON content');
      return;
    }

    try {
      const jsonData = JSON.parse(this.jsonContent);
      const result = this.credentialService.importCredential(jsonData);
      
      if (result) {
        this.showSuccess('Credential imported successfully');
        this.dialogRef.close(true);
      } else {
        this.showError('Failed to import credential. Invalid format.');
      }
    } catch (error) {
      this.showError('Invalid JSON format');
    }
  }

  onFileSelected(event: Event) {
    debugger;
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.jsonContent = e.target?.result as string;
    };
    
    reader.readAsText(file);
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: 'success-snackbar'
    });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: 'error-snackbar'
    });
  }
}
