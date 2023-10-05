import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private lastDismissedRole: string | null = null; // Track the role of the last dismissed alert

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
        this.lastDismissedRole = 'cancel'; // Update the last dismissed role
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.lastDismissedRole = 'confirm'; // Update the last dismissed role
      },
    },
  ];

  constructor() {
    // Call the showAlert method automatically every 5 seconds
    setInterval(() => this.showAlert(), 5000);
  }

  showAlert() {
    // Trigger the alert only if the last dismissed role was not 'cancel'
    if (this.lastDismissedRole !== 'cancel') {
      const alert = document.querySelector('ion-alert');
      if (alert) {
        alert.present(); // Display the alert
      }
    }
  }

  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
    this.lastDismissedRole = ev.detail.role; // Update the last dismissed role
  }
}
