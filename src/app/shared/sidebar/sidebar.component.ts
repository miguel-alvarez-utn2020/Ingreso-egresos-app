import { filter } from 'rxjs/operators';
import { AppState } from './../../app.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs/internal/Subscription';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  userData: User = {} as User;
  authSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.store
      .select('auth')
      .pipe(filter((auth) => auth.user !== null))
      .subscribe((auth) => (this.userData = auth.user));
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
