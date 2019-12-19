import { ImageModalPage } from './../image-modal/image-modal.page';
import { SharePage } from './../share/share.page';
import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salon-detail',
  templateUrl: './salon-detail.page.html',
  styleUrls: ['./salon-detail.page.scss']
})
export class SalonDetailPage implements OnInit {
  empployeeList: any = [
    {
      index: 1,
      image: 'https://promoactual.la/wp-content/uploads/2018/07/oasis-barberia-y-peluqueria-4.1.jpg',
      name: 'Sandra Caldas',
      post: 'Manager'
    },
    {
      index: 2,
      image: '../../../assets/Baberia/Barbero.jpg',
      name: 'Omar Perez',
      post: 'Barbero'
    }
  ];
  services: any = [
    {
      title: 'Corte de Cabello',
      type: '10',
      color: '#FD6C57',
      icon: '../../../assets/Baberia/iconocorte.png'
    },
    {
      title: 'Afeitado',
      type: '6',
      color: '#FE9654',
      icon: '../../../assets/Baberia/IconP1.png'
    },
    {
      title: 'Secados',
      type: '4',
      color: '#615DD9',
      icon: '../../../assets/Baberia/secadoricono.png'
    },
    {
      title: 'Pintura de cabello',
      type: '4',
      color: '#3885FF',
      icon: '../../../assets/Baberia/Pinturaicono.png'
    }
  ];
  reviews: any = [
    {
      name: 'Ramon Figuera',
      time: '2 horas',
      text:
        'Estoy satisfecho con el servicio, son higienico y unsas productos de buena calidad',
      star: 4
    },
    {
      name: 'Calor Marcano',
      time: '3 meses',
      text:
        'Buena atensión, ambiente agradable sin embargo deberia de mejorar el tiempo de espera dentro del establecimiento. ',
      star: 3
    }
  ];
  galleryimg: any = [
    '../../../assets/Baberia/empresa.jpg',
    '../../../assets/Baberia/barbaOasis.jpg',
    '../../../assets/Baberia/Barbero.jpg',
    '../../../assets/Baberia/servicio3.jpg'
  ];
  state: any = 1;
  activeStar: any = 3;
  avtiveSegment: any = 'About';
  constructor(
    public modalController: ModalController,
    public navCtrl: NavController
  ) {}

  ngOnInit() {}
  setRating(no) {
    this.activeStar = no;
  }
  backPage() {
    this.navCtrl.navigateRoot('/tabs');
  }
  bookmark() {}
  setEmployee(data) {}
  segmentChanged(event) {
    this.avtiveSegment = event.detail.value;
  }

  logScrolling(ev) {
    if (ev.detail.scrollTop >= 200) {
      this.state = 2;
    } else {
      this.state = 1;
    }
  }
  book() {
    this.navCtrl.navigateForward('/select-service');
  }
  openPreview(img, ind) {
    this.modalController
      .create({
        component: ImageModalPage,
        componentProps: {
          img: img,
          index: ind
        },
        cssClass: 'my-modal'
      })
      .then(modal => {
        modal.present();
      });
  }
  serviceBooking() {
    this.navCtrl.navigateForward('/select-service');
  }
  async share() {
    const modal = await this.modalController.create({
      component: SharePage,
      cssClass: 'shareModal'
    });
    return await modal.present();
  }
}
