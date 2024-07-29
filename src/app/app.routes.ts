import { Routes } from '@angular/router';
import { AddWorkoutComponent } from './MyComponents/add-workout/add-workout.component';
import { AppComponent } from './app.component';
import { BodyyComponent } from './MyComponents/bodyy/bodyy.component';
import { ReportComponent } from './MyComponents/report/report.component';
import { ProgressComponent } from './MyComponents/progress/progress.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: "full"
    },
    {
        path: 'add-workout',
        component: AddWorkoutComponent
    },
    {
        path: 'home',
        component: BodyyComponent
    },
    {
        path: 'report',
        component: ReportComponent
    },
    {
        path: 'progress',
        component: ProgressComponent
    }

];
