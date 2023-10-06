import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { IonModal, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Goal } from '../Models/goal';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  private lastDismissedRole: string | null = null;

  constructor(private db: AngularFirestore, private alertController: AlertController) {
    // Initialize constructor variables
  }

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
  private alertInterval: any;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  public alertButtons = [
    {
      text: 'Done',
      role: 'done',
      handler: () => {
        console.log('Done button pressed');
        this.lastDismissedRole = 'done';
        this.scheduleAlert();
      },
    },
    {
      text: 'Remind Me',
      role: 'remind',
      handler: () => {
        console.log('Remind Me button pressed');
        this.lastDismissedRole = 'remind';
        // You can add code here to handle the "Remind Me" button action
      },
    },
  ];

  async showAlert() {
    if (this.lastDismissedRole !== 'done') {
      const alert = await this.alertController.create({
        header: 'Reminder!',
        message: 'You have to drink water!',
        buttons: this.alertButtons,
      });

      // Display the alert
      await alert.present();

      // Schedule the next alert after 2 minutes
      this.alertInterval = setTimeout(() => {
        this.showAlert();
      }, 2 * 5000); // 2 minutes in milliseconds
    }
  }

  async scheduleAlert() {
    setTimeout(() => {
      this.showAlert();
    }, 2 * 5000); // 2 minutes in milliseconds
  }

  ngOnInit() {
    this.showAlert();
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
      this.initializeChart2(this.lvlArray2[0].goal_lvl)
    })
    var lvlCol2 = this.db.collection('Goals');
    lvlCol2.valueChanges().subscribe(Goals => {
      this.goalArray = Goals;
    })
  }
  ngOnDestroy() {
    // Clear the alert interval when the component is destroyed
    if (this.alertInterval) {
      clearTimeout(this.alertInterval);
    }
  }
  removeGoal(goalName: string) {
    const goalToRemove = this.goalArray.find(goal => goal.name === goalName);

    if (goalToRemove) {
      const goalIndex = this.goalArray.indexOf(goalToRemove);
      this.goalArray.splice(goalIndex, 1);

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

  async showConfirmationDialog(goal: Goal) {
    const alert = await this.alertController.create({
      header: 'Confirm Action',
      message: 'What would you like to do with this goal?',
      buttons: [
        {
          text: 'Mark as Done',
          handler: () => {
            this.markAsDone(goal);
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.removeGoal(goal.name);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  markAsDone(goal: Goal) {
    this.completedGoalsCount = this.completedGoalsCount + 1;
    this.db.collection("User").doc('docu').update({
      goal_lvl: [0, 3, 5, 3, 4, 2, this.completedGoalsCount]
    }).then(() => {
      console.log(`Goal "${goal.name}" marked as done. Count updated in the database.`);
    }).catch(error => {
      console.error(`Error updating count for goal "${goal.name}" in the database: `, error);
    });
    console.log(this.completedGoalsCount);
    this.removeGoal(goal.name);
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
          label: 'Water',
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
