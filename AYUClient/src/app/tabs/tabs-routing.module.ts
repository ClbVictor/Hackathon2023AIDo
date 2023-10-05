import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'testul',
        loadChildren: () => import('../testul/testul.module').then(m => m.TestulPageModule)
      },
      {
        path: 'loginintrebare',
        loadChildren: () => import('../loginintrebare/loginintrebare.module').then(m => m.LoginintrebarePageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../loginquery/loginquery.module').then(m => m.LoginqueryPageModule)
      },
      {
        path: 'signup',
        loadChildren: () => import('../signup/signup.module').then(m => m.SignupPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/loginintrebare',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/loginintrebare',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
