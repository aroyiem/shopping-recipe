import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {Subject} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean = false;
  destroyed$ = new Subject<void>();

  constructor(
    private service: DataStorageService,
    private authService: AuthService
  ) {
  }
  ngOnInit(): void {
    this.authService.user.pipe(takeUntil(this.destroyed$))
      .subscribe(user=> {
        this.isAuthenticated = !! user;
        console.log(user);
      })
  }

  onSaveData() {
    this.service.storeRecipes();
  }

  onFetchData() {
    this.service.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onLogout() {
    this.authService.logout();
  }
}
