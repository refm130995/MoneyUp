import { NavController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss']
})

export class SignInPage {

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
      email: ['', [Validators.compose([Validators.required]), Validators.email]],
      password: ['', [Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])]],
    });
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

    async presentAlert(message: string, header: string) {
      const alert = await this.alertController.create({
        header: header,
        message: message,
        buttons: ['OK']
      });
      await alert.present();
    }

  login() {
    this.navCtrl.navigateForward('/slider');
    }
  forgotPassword() {
    this.navCtrl.navigateForward('/forgot-password');
  }
  signUp() {
    this.navCtrl.navigateForward('/sign-up');
  }

  signIn() {
    this.present();
    this.service.login(this.myForm.value).subscribe(res => {
        console.log(res);
        this.userData = res;
        localStorage.setItem('token', this.userData['token']);
        this.dismiss();
        this.login();
      },
      // tslint:disable-next-line:no-shadowed-variable
      error => {
        this.dismiss();
        if(error.error.code == 401)
        {
          this.presentAlert('La contraseña o correo ingresado son invalidos. ', 'Disculpe');
        }else{
          this.presentAlert('No se ha registrado correctamente', 'Error');          
        }
      });
  }
 
}

