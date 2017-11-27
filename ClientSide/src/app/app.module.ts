import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import {Config} from './config/config';


import { MenuComponentComponent } from './components/menu-component/menu-component.component';
import { AboutComponentComponent } from './components/about-component/about-component.component';
import { HomeComponent } from './components/home/home.component';
import { SnakeComponent } from './components/Games/snake/snake.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ChatComponent } from './components/chat/chat.component';
import { DataService } from './services/data/data.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import {XoService} from './services/XO/xo.service';
import { ChatService } from './services/chat/chat.service';
import { UsersComponentComponent } from './components/users-component/users-component.component';
import { SignComponent } from './components/sign/sign.component';
import { XoComponent } from './components/Games/XO/xo/xo.component';

import {MatRadioModule,MatButtonModule,MatCardModule} from '@angular/material';



const routes:Routes=[
  {path:'',redirectTo:'home',pathMatch: 'full'},
  {path:'about',component:AboutComponentComponent},
  {path:'home',component:HomeComponent},
  {path:'XO',component:XoComponent},
  {path:'Snake',component:SnakeComponent},
  {path:'chat',component:ChatComponent},
  {path:'users',component:UsersComponentComponent},
  {path:'signup',component:SignComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    MenuComponentComponent,
    AboutComponentComponent,
    HomeComponent,
    XoComponent,
    SnakeComponent,
    SideBarComponent,
    ChatComponent,
    UsersComponentComponent,
    SignComponent,
    XoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [DataService,AuthenticationService,ChatService,Config,XoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
