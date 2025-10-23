import { Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MonsterType } from '../../utils/monster';
import { Subscription } from 'rxjs';
import { MonsterService } from '../../services/monster/monster';
import { PlayingCard } from "../../components/playing-card/playing-card";
import { Monster as MonsterModel } from '../../model/monster';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';  // ✅ Ajouté
import { DeleteMonsterConfirmationDialog } from '../../components/delete-monster-confirmation-dialog/delete-monster-confirmation-dialog';  // ✅ Ajouté

@Component({
  selector: 'app-monster',
  standalone: true,
  imports: [ReactiveFormsModule, PlayingCard, MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './monster.html',
  styleUrl: './monster.css'
})
export class Monster implements OnInit, OnDestroy {
    private monsterService = inject(MonsterService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private fb = inject(FormBuilder);
    private readonly dialog = inject(MatDialog);  // ✅ Ajouté

    private routeSubscription: Subscription | null = null;
    private formValuesSubscription: Subscription | null = null;

    formGroup = this.fb.group({
        name: ['', [Validators.required]],
        image: ['', [Validators.required]],
        type: [MonsterType.ELECTRIC, [Validators.required]],
        hp: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
        figureCaption: ['', [Validators.required]],
        attackName: ['', [Validators.required]],
        attackStrength: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
        attackDescription: ['', [Validators.required]]
    });

    monsterTypes = Object.values(MonsterType);
    monsterId = -1;
    monster = signal<MonsterModel>(new MonsterModel());

    ngOnInit(): void {
        // ✅ D'ABORD s'abonner aux changements du formulaire
        this.formValuesSubscription = this.formGroup.valueChanges.subscribe(values => {
            const updatedMonster = new MonsterModel();
            updatedMonster.id = this.monsterId;
            updatedMonster.name = values.name || '';
            updatedMonster.image = values.image || '';
            updatedMonster.type = values.type || MonsterType.ELECTRIC;
            updatedMonster.hp = values.hp || 0;
            updatedMonster.figureCaption = values.figureCaption || '';
            updatedMonster.attackName = values.attackName || '';
            updatedMonster.attackStrength = values.attackStrength || 0;
            updatedMonster.attackDescription = values.attackDescription || '';
            
            this.monster.set(updatedMonster);
        });

        // ✅ ENSUITE charger le monstre si on est en mode édition
        this.routeSubscription = this.route.params.subscribe(params => {
            if (params['id']) {
                this.monsterId = parseInt(params['id']);
                
                const foundMonster = this.monsterService.get(this.monsterId);
                
                if (foundMonster) {
                    this.monster.set(foundMonster);
                    
                    this.formGroup.patchValue({
                        name: foundMonster.name,
                        image: foundMonster.image,
                        type: foundMonster.type,
                        hp: foundMonster.hp,
                        figureCaption: foundMonster.figureCaption,
                        attackName: foundMonster.attackName,
                        attackStrength: foundMonster.attackStrength,
                        attackDescription: foundMonster.attackDescription
                    });
                }
            } else {
                this.monsterId = -1;
                this.monster.set(new MonsterModel());
            }
        });
    }

    ngOnDestroy(): void {
        this.routeSubscription?.unsubscribe();
        this.formValuesSubscription?.unsubscribe();  // ✅ Ajouté
    }

    submit(event: Event) {
        event.preventDefault();
        
        if (this.formGroup.valid) {
            const monsterToSave = this.monster();
            
            if (this.monsterId === -1) {
                this.monsterService.add(monsterToSave);
            } else {
                monsterToSave.id = this.monsterId;
                this.monsterService.update(monsterToSave);
            }
            
            this.navigateBack();
        }
    }

    isFieldValid(fieldName: string) {
        const formControl = this.formGroup.get(fieldName);
        return formControl?.invalid && (formControl?.dirty || formControl?.touched);
    }

    onFileChange(event: any) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.formGroup.patchValue({
                    image: reader.result as string
                });
            };
        }
    }

    navigateBack() {
        this.router.navigate(['/home']);
    }

    // ✅ Fonction complète pour supprimer un monstre
    deleteMonster() {
        const dialogRef = this.dialog.open(DeleteMonsterConfirmationDialog);
        
        dialogRef.afterClosed().subscribe(confirmation => {
            if (confirmation) {
                this.monsterService.delete(this.monsterId);
                this.navigateBack();
            }
        });
    }
}