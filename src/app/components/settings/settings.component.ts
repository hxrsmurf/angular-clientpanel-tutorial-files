import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Client } from 'src/app/models/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';
import { Settings } from 'src/app/models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings!: Settings;

 
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private settingService: SettingsService
  ) { }

  ngOnInit() {
    this.settings = this.settingService.getSettings();
  }

  onSubmit(){
    this.settingService.changeSettings(this.settings);
    this.flashMessage.show('Settings saved', {
      cssClass: 'alert-success', timeout: 3000
    });
  }

  onClearClick(){
    this.settingService.clearSettings();
    this.flashMessage.show('Settings Cleared', {
      cssClass: 'alert-success', timeout: 3000
    });

  }

}
