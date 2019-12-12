import { RouterModule, Routes } from '@angular/router';
import { MetodoSimplexComponent } from './metodo-simplex/metodo-simplex.component';

const routes: Routes = [
    //{ path: 'routePath', component: Component },
    { path: '**', pathMatch:'full', redirectTo: 'routePath' },
    { path: 'metodo-simplex', component: MetodoSimplexComponent }

];

export const appRouting = RouterModule.forRoot(routes); 