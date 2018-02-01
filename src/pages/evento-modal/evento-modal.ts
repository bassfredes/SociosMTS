import { ViewChild, Component } from '@angular/core';
import { IonicPage, NavController, Navbar, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EventosService } from '../../providers/eventos-service';
import { ConnectivityService } from '../../providers/connectivity-service';

@IonicPage()
@Component({
	selector: 'page-evento-modal',
	templateUrl: 'evento-modal.html',
})
export class EventoModalPage {
	@ViewChild(Navbar) navBar: Navbar;
	private eventFormData: FormGroup;
	evento: any;
	dataNombre: boolean = false;
	dataRut: boolean = false;
	tipoSelected: string = "socio";
	respuestasSocio: any = [];
	respuestasComprador: any = [];
	titleMensaje: string = "Inscripción a Evento MTS";
	enviarButtonText: string = "Inscribirse";

	preguntasSocio: any;
	preguntasComprador: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public formBuilder: FormBuilder,
		public alertCtrl: AlertController,
		public toastCtrl: ToastController,
		public viewCtrl: ViewController,
		public eventosService: EventosService,
		public connectivityService: ConnectivityService) {
		this.eventFormData = this.formBuilder.group({
			tipo: [this.tipoSelected, Validators.compose([Validators.required])],
		});
	}
	ionViewDidLoad() {
		this.evento = this.navParams.get('eventoData');
		this.dataNombre = this.navParams.get('dataNombre');
		this.dataRut = this.navParams.get('dataRut');
		this.preguntasSocio = this.evento.invitacion.preguntas.socio;
		this.preguntasComprador = this.evento.invitacion.preguntas.comprador;
		this.preguntasSocio.forEach((value, index) => {
			this.respuestasSocio["pregunta" + (eval(index) + 1)] = false;
		});
		this.preguntasComprador.forEach((value, index) => {
			this.respuestasComprador["pregunta" + (eval(index) + 1)] = false;
		});
		this.navBar.backButtonClick = (e: UIEvent) => {
			this.viewCtrl.dismiss();
		};
		if (this.dataNombre) {
			this.titleMensaje = "Invitación a Evento MTS";
			this.enviarButtonText = "Invitar";
		}
	}
	updatePreguntaSocio(item: number) {
		let preguntaSelected = item + 1;
		if (this.respuestasSocio["pregunta" + preguntaSelected] == true){
			this.respuestasSocio["pregunta" + preguntaSelected] = false;
		}
		else {
			this.respuestasSocio["pregunta" + preguntaSelected] = true;
		}
	}
	updatePreguntaComprador(item: number) {
		let preguntaSelected = item + 1;
		if (this.respuestasComprador["pregunta" + preguntaSelected] == true) {
			this.respuestasComprador["pregunta" + preguntaSelected] = false;
		}
		else {
			this.respuestasComprador["pregunta" + preguntaSelected] = true;
		}
	}
	checkForm() {
		let respuestas;
		if (this.tipoSelected == "socio") {
			respuestas = this.respuestasSocio;
		}
		else {
			respuestas = this.respuestasComprador;
		}
		let respuestasAEvnviar = "";
		for (let value of Object.keys(respuestas)) {
			respuestasAEvnviar += "&" + value + "=" + eval(respuestas[value]);
		}
		if (this.connectivityService.isOnline()) {
			let alert;
			if (this.dataNombre) {
				let datosInvitado = "nombre=" + this.dataNombre + "&rut=" + this.dataRut;
				alert = this.alertCtrl.create({
					title: 'Confirmar Invitación',
					message: '¿Estás seguro que quieres invitar a ' + this.dataNombre + ' al  Evento?',
					buttons: [
						{
							text: 'Cancelar',
							role: 'cancel',
							handler: () => { }
						},
						{
							text: 'Aceptar',
							handler: () => {
								this.eventosService.invitarEvento(this.evento._id, this.tipoSelected, datosInvitado, respuestasAEvnviar).then((data) => {
									this.viewCtrl.dismiss(data);
								}).catch(e => console.log("login error", e));
							}
						}
					]
				});
			}
			else {
				alert = this.alertCtrl.create({
					title: 'Confirmar Inscripción',
					message: '¿Estás seguro que quieres inscribirte en el evento?',
					buttons: [
						{
							text: 'Cancelar',
							role: 'cancel',
							handler: () => { }
						},
						{
							text: 'Aceptar',
							handler: () => {
								this.eventosService.inscribirse(this.evento._id, this.tipoSelected, respuestasAEvnviar).then((data) => {
									this.viewCtrl.dismiss(data);
								}).catch(e => console.log("login error", e));
							}
						}
					]
				});
			}
			alert.present();
		}
		else {
			let failed = this.toastCtrl.create({
				message: 'Necesitas conexión a internet para inscribirte a los Eventos MTS.',
				duration: 4000,
				position: 'bottom',
				closeButtonText: "OK"
			});
			failed.present();
			this.navCtrl.setRoot('HomePage');
		}

		
	}
	onSelectChange(selectedValue: any) {
		this.tipoSelected = selectedValue;
	}
}
