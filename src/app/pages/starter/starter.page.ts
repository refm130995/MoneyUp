import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.page.html',
  styleUrls: ['./starter.page.scss']
})
export class StarterPage implements OnInit {
  constructor(private navController: NavController) {}

  ngOnInit() {}
  signInPage() {
    this.navController.navigateForward('sign-in');
  }
}
