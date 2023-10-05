import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AlertController } from '@ionic/angular';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-testul',
  templateUrl: './testul.page.html',
  styleUrls: ['./testul.page.scss'],
})
export class TestulPage implements OnInit {

  selectedValue: any = 'simple';
  constructor(private db: AngularFirestore) { }
  questionsArray: any;


  ngOnInit() {
    var questionsCol = this.db.collection('questions');
    questionsCol.valueChanges().subscribe(questions => {
      this.questionsArray = questions;
      console.log(this.questionsArray);
    })
  }
  print(event) {
    console.log('Selected value: ', this.selectedValue);
  }

}



//class alertbox {  
//  show() {}  
// }  
// window.onload = () => {  
//  var msb = new alertbox();  
//  var bttn = document.getElementById("Button1");  
//  bttn.onclick = function() { 
//  alert("Bravo! Datele tale au fost salvate!");   
//   msb.show();  
//  }  
// };  

