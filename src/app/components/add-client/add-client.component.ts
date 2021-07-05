import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd!: boolean;
  
  @ViewChild('clientForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.settingsService.getSettings().disableBalanceOnAdd;
  }
  
  onSubmit(value: NgForm) {
    if (this.disableBalanceOnAdd) {
      value.value.balance = 0;
    }

    if (!value.valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 3000
      });
    } else {
      // Add new client
      this.clientService.newClient(value.value);
      // Show message
      this.flashMessage.show('New client added', {
        cssClass: 'alert-success', timeout: 3000
      });
      // Redirect to dash
      this.router.navigate(['/']);
    }

  }

}
