import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  userData: User
  authSubscription!: Subscription
  constructor(private store:Store<AppState>) { }
 

  ngOnInit(): void {
    this.authSubscription = this.store.select('auth')
    .pipe(
      filter( auth => auth.user !== null )
    )
    .subscribe( auth => this.userData = auth.user )
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe()
  }


}
