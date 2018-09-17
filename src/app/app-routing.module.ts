import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReportsPageComponent } from './pages/reports-page/reports-page.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { DefineEventsPageComponent } from './pages/define-events-page/define-events-page.component';
import { ExpensesPageComponent } from './pages/expenses/expenses.component';
import { ManagePageComponent } from './pages/manage-page/manage-page.component';
import { MileageComponent } from './pages/mileage/mileage.component';

const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'manage', component: ManagePageComponent},
    {path: 'reports', component: ReportsPageComponent},
    {path: 'addEvents', component: EventPageComponent},
    {path: 'defineEvents', component: DefineEventsPageComponent},
    {path: 'expenses', component: ExpensesPageComponent},
    {path: 'mileage', component: MileageComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

