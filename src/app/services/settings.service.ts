import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';

@Injectable()
export class SettingsService {
  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true
  }
  constructor() {
   }

  getSettings(): Settings {
    return this.settings;
  }

  changeSettings(settings: Settings){
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  clearSettings(){
    localStorage.clear()
  }
}
