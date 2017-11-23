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
import { XoComponent } from './components/Games/xo/xo.component';
import { SnakeComponent } from './components/Games/snake/snake.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { XoVsPlayerComponent } from './components/Games/xo/xo-vs-player/xo-vs-player.component';
import { XoVsServerComponent } from './components/Games/xo/xo-vs-server/xo-vs-server.component';
import { ChatComponent } from './components/chat/chat.component';
import { DataService } from './services/data/data.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ChatService } from './services/chat/chat.service';
import { UsersComponentComponent } from './components/users-component/users-component.component';
import { SignComponent } from './components/sign/sign.component';



const routes:Routes=[
  {path:'',redirectTo:'home',pathMatch: 'full'},
  {path:'about',component:AboutComponentComponent},
  {path:'home',component:HomeComponent},
  {path:'XO',component:XoComponent},
  {path:'Snake',component:SnakeComponent},
  {path:'XO/vsPlayer',component:XoVsPlayerComponent},
  {path:'XO/vsServer',component:XoVsServerComponent},
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
    XoVsPlayerComponent,
    XoVsServerComponent,
    ChatComponent,
    UsersComponentComponent,
    SignComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [DataService,AuthenticationService,ChatService,Config],
  bootstrap: [AppComponent]
})
export class AppModule { }
