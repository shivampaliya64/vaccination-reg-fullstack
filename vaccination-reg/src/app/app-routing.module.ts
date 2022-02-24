import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { VaccinesComponent } from './vaccines/vaccines.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'registration',component:SignUpComponent},
  {path:'login',component:LoginComponent},
  {path:'user/:id',component:UserinfoComponent, canActivate:[AuthGuard]},
  {path:'contact',component:ContactUsComponent},
  {path:'vaccines/:vid',component:VaccinesComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
