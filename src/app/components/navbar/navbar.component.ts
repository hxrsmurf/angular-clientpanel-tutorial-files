import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Client } from 'src/app/models/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  loggedInUser!: string;
  showRegister!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private settingService: SettingsService
  ) { }

  ngOnInit(): void {

    this.authService.getAuth().subscribe(auth =>{
      if(auth){
        this.isLoggedIn = true;
        if (auth.email){
          this.loggedInUser = auth.email;
        }
      } else {
        this.isLoggedIn = false;
      }
    });

    this.settingService.getSettings().allowRegistration;

  }

  onLogoutClick(){
    this.authService.logout();    
    this.flashMessage.show('You logged out', {
      cssClass: 'alert-success', timeout: 3000
    });
    this.router.navigate(['/login']);
  }

}
