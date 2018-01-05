import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { LandOwnershipComponent } from './land/land-ownership.component';
import { LandListComponent } from './land-list/land-list.component';
import { LandDetailComponent } from './land-detail/land-detail.component';
import { MetacoinComponent } from './metacoin/metacoin.component';
import { LandingComponent } from './landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';

const routes: Routes = [
    { path: 'home',          component: HomeComponent },
    { path: 'about',         component: AboutComponent },
    { path: 'features',      component: FeaturesComponent },
    { path: 'user-profile',  component: ProfileComponent },
    { path: 'signin',        component: SigninComponent },
    { path: 'signup',        component: SignupComponent },
    { path: 'land-ownership',component: LandOwnershipComponent },
    // { path: 'land-list',     component: LandListComponent },
    // { path: 'land-list/:id', component: LandDetailComponent },
    { path: 'land-list', component: LandListComponent,
      children: [
        {
          path: ':id', component: LandDetailComponent 
        }
      ]
    },
    { path: 'metacoin',      component: MetacoinComponent },
    { path: 'landing',       component: LandingComponent },
    { path: 'nucleoicons',   component: NucleoiconsComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
