import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'testul',
    loadChildren: () => import('./testul/testul.module').then( m => m.TestulPageModule)
  },
  {
    path: 'loginintrebare',
    loadChildren: () => import('./loginintrebare/loginintrebare.module').then( m => m.LoginintrebarePageModule)
  },
  {
    path: 'loginquery',
    loadChildren: () => import('./loginquery/loginquery.module').then( m => m.LoginqueryPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
