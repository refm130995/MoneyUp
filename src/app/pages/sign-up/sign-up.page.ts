import { NavController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss']
})
export class SignUpPage implements OnInit {
  isLoading: boolean;
  loading: HTMLIonLoadingElement;
  userData: any;
  user: any = {};
  requeridemail: any = {};
  email: any = {};
  minLength: any;
  myForm: FormGroup;
  constructor(private navCtrl: NavController, public formBuilder: FormBuilder, private service: UserService, public alertController: AlertController, public loadingController: LoadingController) {
    this.myForm = formBuilder.group({
      name:[''],
      phone:[''],
      date_picker:[''],
      Cpassword:[''],
      email: ['', [Validators.compose([Validators.required]), Validators.email]],
      password: ['', [Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])]],
    });
  }

  ngOnInit() {}

  async presentAlert(message: string, header: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  backPage() {
    this.navCtrl.back();
  }
  register() {
    this.navCtrl.navigateBack('/phone-verification');
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  signIn() {
    this.present();
    this.service.signup(this.myForm.value).subscribe(res => {
        console.log(res);
        this.userData = res;
        localStorage.setItem('token', this.userData['token']);
          this.presentAlert('Bienvenido, gracias por confiar en nosotros','Register');
          this.dismiss();
          this.register();
      },
      // tslint:disable-next-line:no-shadowed-variable
      error => {
        this.dismiss();
        if(error.error.code == 400)
        {
          this.presentAlert('Ya hay un registro con los mismos datos', 'Register error');
        }else{
          this.presentAlert('No se ha registrado correctamente', 'Register error');
        }
        //agregar alerta de error
      });
  }

  goToSignIn() {
    this.navCtrl.navigateBack('/sign-in');
  }
}

