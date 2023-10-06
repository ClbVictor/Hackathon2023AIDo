import { Component } from '@angular/core';
import { ActionSheetController  } from '@ionic/angular'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  result: string;
  bol = false;
  
  constructor(private actionSheetCtrl: ActionSheetController) {}
  resetRobo()
  {
    this.bol=false;
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Robot',
      buttons: [
        {
          text: 'Smart Water Sensor',
          data: {
            action: 'connect',
          },
        },
        
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    console.log(result.data);
    
    if(result.data = "caca")
    {
      this.bol = true;
    }
    //this.result = JSON.stringify(result, null, 2);
  }
  

}
