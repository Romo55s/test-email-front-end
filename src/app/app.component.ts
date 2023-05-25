import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test-Email;-front-end';
  receiveDatadMsg: any = {};
  okBack: boolean = false;
  showReceivedData: boolean = false;
  data: FormGroup;
  // Inyectamos HttpClient para establecer la conexion con el back-end
  constructor(private httpClient: HttpClient) {
    // Incializamos el FormGroup
    this.data = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      about: new FormControl('', Validators.required),
      mssg: new FormControl('', Validators.required)
    })
  }

  sendEmail() {
    Notiflix.Loading.circle('Loading...');
    // Recuperamos los datos del form
    let params = {
      email: this.data.value.email,
      about: this.data.value.about,
      mssg: this.data.value.mssg
    }

    // Establecemos la conexión con el backend
    console.log(params);
    this.httpClient.post('https://test-email-api.onrender.com/send', params).subscribe((res: any) => {
      console.log(res);
      Notiflix.Loading.remove();
      this.data.reset();
      if (res.ok) {
        Notiflix.Notify.success('Successfully sent');
        this.okBack = res.ok;
        this.receiveDatadMsg = JSON.parse(res.msg);  // Guardamos los datos recibidos en `receivedData`
        console.log(this.receiveDatadMsg);
        // Puedes realizar cualquier acción adicional con los datos recibidos, como mostrarlos en el frontend
      } else {
        // La solicitud no fue exitosa, puedes realizar acciones específicas para manejar errores
        this.okBack = res.ok;
        Notiflix.Notify.failure('Something went wrong. Try again...');
        console.log('Error en la respuesta del servidor');
      }
    })
  }

  status() {
    if(this.okBack ){
      this.showReceivedData = true;
    }else{
      Notiflix.Notify.failure('No data available.');
    }
    
  }

}
