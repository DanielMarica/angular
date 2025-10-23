import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { 
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatDialogClose 
} from '@angular/material/dialog';

@Component({
    selector: 'app-delete-monster-confirmation-dialog',
    standalone: true,
    imports: [
        MatButtonModule, 
        MatDialogTitle, 
        MatDialogContent, 
        MatDialogActions, 
        MatDialogClose
    ],
    templateUrl: './delete-monster-confirmation-dialog.html',
    styleUrl: './delete-monster-confirmation-dialog.css'
})
export class DeleteMonsterConfirmationDialog {}