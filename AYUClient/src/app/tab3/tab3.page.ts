import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { Goal } from '../Models/goal';
import { IonModal } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  myGoal: Goal = new Goal();
  title = 'ng2-charts-demo';
  lineChartData: ChartConfiguration<'line'>['data'];
  lineChartData2: ChartConfiguration<'line'>['data'];
  lineChartOptions: ChartOptions<'line'>;
  lineChartLegend = true;
  lvlArray: any[] = [0];
  lvlArray2: any[] = [0];
  goalStatsArray: any[] = [0];
  goalArray: any[];
  completedGoalsCount = 0;
  datas: number[] = [3, 7, 2, 1];

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private db: AngularFirestore, private alertController: AlertController) {
    console.log("am intrat in constructorul paginii");
  }

  ngOnInit() {
    this.myGoal.name;
    this.myGoal.description;
    console.log("Am intrat pe pagina");
    var lvlCol = this.db.collection('User');
    lvlCol.valueChanges().subscribe(User => {
      this.lvlArray = User;
      this.lvlArray2 = User;
      this.initializeChart(this.lvlArray[0].depression_lvl)
    })
    var lvlCol3 = this.db.collection('User');
    lvlCol3.valueChanges().subscribe(User => {
      this.goalStatsArray = User;
      this.initializeChart2(this.lvlArray[0].goal_lvl)
    })
    var lvlCol2 = this.db.collection('Goals');
    lvlCol2.valueChanges().subscribe(Goals => {
      this.goalArray = Goals;
    })
  }
  removeGoal(goalName: string) {
    const goalToRemove = this.goalArray.find(goal => goal.name === goalName);

    if (goalToRemove) {
      // Remove the goal from the local array
      const goalIndex = this.goalArray.indexOf(goalToRemove);
      this.goalArray.splice(goalIndex, 1);

      // Remove the goal from the database
      this.db.collection("Goals", ref => ref.where("name", "==", goalName))
        .get()
        .subscribe(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete().then(() => {
              console.log(`Goal "${goalName}" successfully removed from the database.`);
            }).catch(error => {
              console.error(`Error removing goal "${goalName}" from the database: `, error);
            });
          });
        });
    } else {
      console.error(`Goal "${goalName}" not found.`);
    }
  }
  addGoal() {
    console.log("salvez");
    this.db.collection("Goals")
      .add({
        name: this.myGoal.name,
        description: this.myGoal.description
      })
      .then((docRef) => {
        console.log('Am adaugat proprietatea', docRef.id)
      })
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  confirm() {
    this.modal.dismiss(null, 'confirm');
    this.addGoal();
  }
  onWillDismiss(event: Event) {}
  
  initializeChart(chartData: number[]): void {
    this.lineChartData = {
      labels: [
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday'
      ],
      datasets: [
        {
          data: chartData,
          //data: [1, 2, 4, 8, 16, 32, 64],
          label: 'Pulse',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(201, 255, 239)',
        }
      ]
    };

    this.lineChartOptions = { responsive: true };
  }
  initializeChart2(chartData: number[]): void {
    this.lineChartData2 = {
      labels: [
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday'
      ],
      datasets: [
        {
          data: chartData,
          //data: [1, 2, 4, 8, 16, 32, 64],
          label: 'Goals completed',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgb(106,100,255)',
        }
      ]
    };

    this.lineChartOptions = { responsive: true };
  }
}

