import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Custom Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClientsComponent } from './components/clients/clients.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate:[RegisterGuard] },
  { path: 'client/add', component: AddClientComponent, canActivate:[AuthGuard] },
  { path: 'client/edit/:id', component: EditClientComponent, canActivate:[AuthGuard] },
  { path: 'client/:id', component: ClientDetailsComponent, canActivate:[AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate:[AuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [],
  providers: [AuthGuard, RegisterGuard],
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})

export class AppRoutingModule { }