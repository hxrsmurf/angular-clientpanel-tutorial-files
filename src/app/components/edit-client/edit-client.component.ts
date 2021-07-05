import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id!: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disableBalanceOnEdit: boolean = true;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }


  ngOnInit(): void {
    // Get id from URL
    // atIendqw9AgKeVy1gWjS
    this.id = this.route.snapshot.params['id']

    // Get Client
    this.clientService.getClient(this.id).subscribe(client => this.client = client)
  }

  onSubmit(value: NgForm){
    if(!value.valid){
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 3000
      });

    } else {
      // Add ID to client
      value.value.id = this.id
      // Update Client
      this.clientService.updateClient(value.value);
      // Message
      
      this.flashMessage.show('Client Updated', {
        cssClass: 'alert-success', timeout: 3000
      });
      this.router.navigate(['/']);
    }

  }
}
