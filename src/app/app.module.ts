import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ConfirmRegisterComponent } from './pages/confirm-register/confirm-register.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MyContactListComponent } from './pages/my-contact-list/my-contact-list.component';
import { MyTransactionsComponent } from './pages/my-transactions/my-transactions.component';
import { NewContactComponent } from './pages/new-contact/new-contact.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { AccessDeinedComponent } from './pages/access-deined/access-deined.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { MainAdminPageComponent } from './admin/main-admin-page/main-admin-page.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { NewTransactionComponent } from './pages/new-transaction/new-transaction.component';
import { LightInfoComponent } from './components/light-info/light-info.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccessDeinedComponent,
    ConfirmRegisterComponent,
    MainPageComponent,
    MyContactListComponent,
    MyTransactionsComponent,
    NewContactComponent,
    ProfileComponent,
    RegisterComponent,
    UserDashboardComponent,
    AccessDeinedComponent,
    AdminDashboardComponent,
    MainAdminPageComponent,
    ManageUsersComponent,
    NewTransactionComponent,
    LightInfoComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
