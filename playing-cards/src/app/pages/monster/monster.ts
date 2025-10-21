import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-monster',
  standalone: true,
  imports: [],
  templateUrl: './monster.html',
  styleUrl: './monster.css'
})
export class Monster {

    private route = inject(ActivatedRoute);
    private router = inject(Router);

    routeSubscription: Subscription | null = null;
    monsterId = signal<number | undefined>(undefined);

    ngOnInit(): void {
        this.routeSubscription = this.route.params.subscribe(params => {
            this.monsterId.set(params['id'] ? parseInt(params['id']) : undefined);
        });
    }

    ngOnDestroy(): void {
        this.routeSubscription?.unsubscribe();
    }

    next() {
        let nextId = this.monsterId() || 0;
        nextId++;
        this.router.navigate(['monster/' + nextId]);
    }

}
