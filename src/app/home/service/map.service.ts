import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parking } from './response_public_parking';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  // ZARAGOZA API CALLS
  API_CYCLE = 'https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/equipamiento/aparcamiento-bicicleta'
  API_MOTORCYLE = 'https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/equipamiento/aparcamiento-moto'
  API_PARKING_DISABILITY = 'https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/equipamiento/aparcamiento-personas-discapacidad'
  API_PUBLIC_PARKING = 'https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/equipamiento/aparcamiento-publico';

  constructor(
    private http: HttpClient
  ) { }

  getPublicParking(): Observable<Parking> {
    return this.http.get<Parking>(this.API_PUBLIC_PARKING);
  }

  getCycleParking(): Observable<any> {
    return this.http.get(this.API_CYCLE);
  }

  getMotorcycleParking(): Observable<any> {
    return this.http.get(this.API_MOTORCYLE);
  }

  getDisabilityParking(): Observable<any> {
    return this.http.get(this.API_PARKING_DISABILITY);
  }
}
