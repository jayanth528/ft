import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatToolbarModule, MatIconModule, 
         MatSidenavModule, MatCheckboxModule, MatListModule,
         MatAutocompleteModule, MatFormFieldModule, MatInputModule, 
         MatSelectModule, MatProgressSpinnerModule, MatDialogModule,
         MatSnackBarModule, MatGridListModule, MatSlideToggleModule, 
         MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule } from '@angular/material';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ReportsPageComponent } from './pages/reports-page/reports-page.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import { AppRoutingModule } from './app-routing.module';
import { DataService } from './app.service';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { DefineEventsPageComponent, DialogOverviewExampleDialog } from './pages/define-events-page/define-events-page.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { IconSelectorComponent } from './components/icon-selector/icon-selector.component';
import { ExpensesPageComponent } from './pages/expenses/expenses.component';
import { ManagePageComponent } from './pages/manage-page/manage-page.component';
import { MileageComponent } from './pages/mileage/mileage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SidenavComponent,
    ReportsPageComponent,
    ToolbarComponent,
    EventPageComponent,
    DefineEventsPageComponent,DialogOverviewExampleDialog,
    SpinnerComponent,
    IconSelectorComponent,
    ExpensesPageComponent,
    ManagePageComponent,
    MileageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
