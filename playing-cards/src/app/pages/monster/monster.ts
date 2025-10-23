import { Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MonsterType } from '../../utils/monster';
import { filter, of, Subscription, switchMap } from 'rxjs';
import { MonsterService } from '../../services/monster/monster';
import { PlayingCard } from "../../components/playing-card/playing-card";
import { Monster } from '../../model/monster';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';  
import { DeleteMonsterConfirmationDialog } from '../../components/delete-monster-confirmation-dialog/delete-monster-confirmation-dialog';  // ✅ Ajouté

@Component({
  selector: 'app-monster',
  standalone: true,
  imports: [ReactiveFormsModule, PlayingCard, MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './monster.html',
  styleUrl: './monster.css'
})
export class MonsterComponent implements OnInit, OnDestroy {

    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private fb = inject(FormBuilder);
    private monsterService = inject(MonsterService);
    private readonly dialog = inject(MatDialog);

    private routeSubscription: Subscription | null = null;
    private formValuesSubscription: Subscription | null = null;
    private saveSubscription: Subscription | null = null;
    private deleteSubscription: Subscription | null = null;

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

    monster: Monster = Object.assign(new Monster(), this.formGroup.value);
    monsterTypes = Object.values(MonsterType);
    monsterId = -1;

    ngOnInit(): void {

        this.formValuesSubscription = this.formGroup.valueChanges.subscribe(data => {
            this.monster = Object.assign(new Monster(), data);
        });

        this.routeSubscription = this.route.params.pipe(
            switchMap(params => {
                if (params['id']) {
                    this.monsterId = parseInt(params['id']);
                    return this.monsterService.get(this.monsterId);
                }
                return of(null);
            })
        ).subscribe(monster => {
            if (monster) {
                this.monster = monster;
                this.formGroup.patchValue(this.monster);
            }
        });

    }

    ngOnDestroy(): void {
        this.formValuesSubscription?.unsubscribe();
        this.routeSubscription?.unsubscribe();
        this.saveSubscription?.unsubscribe();
        this.deleteSubscription?.unsubscribe();
    }

    submit(event: Event) {
        event.preventDefault();
        let saveObservable;
        if (this.monsterId === -1) {
            saveObservable = this.monsterService.add(this.monster);
        } else {
            this.monster.id = this.monsterId;
            saveObservable = this.monsterService.update(this.monster);
        }
        this.saveSubscription = saveObservable.subscribe(_ => {
            this.navigateBack();
        })
    }

    navigateBack() {
        this.router.navigate(['/home']);
    }

    isFieldValid(name: string) {
        const formControl = this.formGroup.get(name);
        return formControl?.invalid && (formControl?.dirty || formControl?.touched);
    }

    deleteMonster() {
        const dialogRef = this.dialog.open(DeleteMonsterConfirmationDialog);
        this.deleteSubscription = dialogRef.afterClosed().pipe(
            filter(confirmation => confirmation),
            switchMap(_ => this.monsterService.delete(this.monsterId))
        ).subscribe(_ => {
            this.navigateBack();
        })
    }

    onFileChange(event: any) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.formGroup.patchValue({
                    image: reader.result as string,
                });
            };
        }
    }

}

export { Monster };
