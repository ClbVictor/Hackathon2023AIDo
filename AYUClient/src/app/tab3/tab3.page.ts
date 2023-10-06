import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from "chart.js";
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
  private lastDismissedRole: string | null = null; // Track the role of the last dismissed alert

  constructor(private db: AngularFirestore, private alertController: AlertController) {
    console.log("am intrat in constructorul paginii");
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

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  async showAlert() {
    // Trigger the alert only if the last dismissed role was not 'done'
    if (this.lastDismissedRole !== 'done') {
      const alert = await this.alertController.create({
        header: 'Reminder!',
        message: 'You have to drink water!',
        buttons: this.alertButtons,
      });
      await alert.present(); // Display the alert
    }
  }

  // Function to schedule the alert again after 2 minutes
  async scheduleAlert() {
    setTimeout(() => {
      this.showAlert();
    }, 2 * 1000); // 2 minutes in milliseconds
  }
  public alertButtons = [
    {
      text: 'Done',
      role: 'done',
      handler: () => {
        console.log('Done button pressed');
        this.lastDismissedRole = 'done';
        this.scheduleAlert(); // Schedule the alert again
      },
    },
    {
      text: 'Remind Me',
      role: 'remind',
      handler: () => {
        console.log('Remind Me button pressed');
        this.lastDismissedRole = 'remind';
        this.scheduleAlert(); // Schedule the alert again
      },
    },
  ];
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
    // Increase the count variable or perform any necessary action
    this.completedGoalsCount= this.completedGoalsCount + 1;
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
          //data: [1, 2, 4, 8, 16, 32, 64],
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
    //make the 7th element of the array completeGoalsCount
    
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

