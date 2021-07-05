import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id!: string;
  client!: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

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
    this.clientService.getClient(this.id).subscribe(client => {
      if (this.client != null) {
        if (client.balance && client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
    })
  }

  updateBalance(){
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Balance has been updated', {
      cssClass: 'alert-success', timeout: 3000
    });    
  }

}
