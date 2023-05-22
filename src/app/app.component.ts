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
  title = 'Test-Email-front-end';

  data: FormGroup;
  // Inyectamos HttpClient para establecer la conexion con el back-end
  constructor(private httpClient: HttpClient){
    // Incializamos el FormGroup
    this.data = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      about: new FormControl('', Validators.required),
      mssg: new FormControl('',Validators.required)
    })
  }

  sendEmail(){
    Notiflix.Loading.circle('Loading...');
    // Recuperamos los datos del form
    let params = {
      email: this.data.value.email,
      about: this.data.value.about,
      mssg: this.data.value.mssg
    }

    // Establecemos la conexion con el back-end
    console.log(params);
    this.httpClient.post('http://localhost:3000/send',params).subscribe(res => {
      console.log(res);
      Notiflix.Loading.remove();
      Notiflix.Notify.success('Successfully sent');
      this.data.reset();
    })
  }
}
