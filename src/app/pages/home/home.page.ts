import { FilterPage } from './../filter/filter.page';
import { NavController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { EnableLocationPage } from './../enable-location/enable-location.page';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServicesService } from '../../services/services/services.service';
declare var google;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map: any;
  isLoading: boolean;
  loading: HTMLIonLoadingElement;
  searchText: any;
  salonList: any = [
    {
      name: 'E de casa',//224x100
      image: 'https://via.placeholder.com/173x100',
    /*   duration: '45 min Aprox', */
      price: '8'
    },
    {
      name: 'BELA MASSA',
      image: 'https://via.placeholder.com/173x100',
    /*   duration: '45 min Aprox', */
      star: '5'
    },
    {
      name: 'ITÁLIA BELLA',
      image: 'https://via.placeholder.com/173x100',
    /*   duration: '1 y 30 min Aprox', */
      star: '15'
    },
  ];
  constructor(
    public modalController: ModalController,
    public navCtrl: NavController,
    private service: ServicesService,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {
    this.enableLocation();
  }

  async enableLocation() {
    const modal = await this.modalController.create({
      component: EnableLocationPage,
      cssClass: 'enableLocation-modal'
    });
    return await modal.present();
  }
  ngOnInit() {
    this.getService();
    this.initMap();
  }

  initMap() {
    const markerData: any = [
      { lat: 22.3, lng: 70.8, text: 'Looks Unisex Salon' },
      { lat: 22.3, lng: 70.81, text: 'Beauty Plus Spa' },
      { lat: 22.31, lng: 70.8, text: 'RedBox Barber' },
      { lat: 22.33, lng: 70.81, text: 'Divine Salon' }
    ];
    const latLng = new google.maps.LatLng(22.3, 70.8);
    const mapoption = {
      center: latLng,
      zoom: 15,
      streetViewControl: false,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapoption);
    const markerIcon = {
      url: '../../../assets/images/near-by/map-image.png',
      labelOrigin: new google.maps.Point(25, 63),
      scaledSize: new google.maps.Size(56, 64)
    };
    markerData.forEach((element: any, index) => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(element.lat, element.lng),
        map: this.map,
        icon: markerIcon,
        label: {
          text: element.text,
          fontSize: '12px',
          fontFamily: 'tofini_medium',
          width: '30px'
        }
      });
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
  bookSalon(event) {
    event.stopPropagation();
    this.navCtrl.navigateForward('/select-service');
  }
  salonDetail(event) {
    event.stopPropagation();
    this.navCtrl.navigateForward('/salon-detail');
  }
  searchCancel() {
    this.searchText = '';
  }
  async openFilter() {
    const modal = await this.modalController.create({
      component: FilterPage
    });
    return await modal.present();
  }
  getService() {
    this.present();
    this.service.getServices().subscribe(res => {
        console.log(res);
       // this.salonList = res;
        this.dismiss();
      },
      // tslint:disable-next-line:no-shadowed-variable
      error => {
        this.dismiss();
      });
  }
}
