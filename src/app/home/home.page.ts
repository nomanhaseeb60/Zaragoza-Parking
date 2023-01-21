import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { Subject, takeUntil, tap } from 'rxjs';
import { Parking } from './service/response_public_parking';
import { MapService } from './service/map.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {
  map: any;
  unSubscribe$ = new Subject();
  constructor(private _map: MapService) { }

  ngOnInit() { }

  ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {
    this.setLocation();
    this.copyRights();
    this.publicParking();
    this.publicCycleParking();
    this.publicMotorCycleParking();
    this.disabilityParking();
  }

  private disabilityParking() {
    this._map.getDisabilityParking().pipe(
      takeUntil(this.unSubscribe$),
      tap((response: any) => {
        response.result.forEach((element: any) => {
          Leaflet.marker([element.geometry.coordinates[1], element.geometry.coordinates[0]], {
            icon: Leaflet.icon({
              iconUrl: element.icon
            })
          }).addTo(this.map)
            .bindPopup(
              `<b>${element.calle_1}</b><br>
              Estado Reserva: ${element.estado_reserva}<br>
              Horario: ${element.horario}<br>
              Tipo de reserva: ${element.tipo_reserva}<br>
              <br>
              <a href="https://www.google.com/maps/search/?api=1&query=${element.geometry.coordinates[1]},${element.geometry.coordinates[0]}" target="_blank">Open in Google Maps</a>
              `
            );
        });
      }
      )
    ).subscribe();
  }

  private publicMotorCycleParking() {
    this._map.getMotorcycleParking().pipe(
      takeUntil(this.unSubscribe$),
      tap((response: any) => {
        response.result.forEach((element: any) => {
          Leaflet.marker([element.geometry.coordinates[1], element.geometry.coordinates[0]], {
            icon: Leaflet.icon({
              iconUrl: element.icon
            })
          }).addTo(this.map)
            .bindPopup(
              `<b>${element.title}</b><br>
              Plazas: ${element.plazas}<br>
              <br>
              <a href="https://www.google.com/maps/search/?api=1&query=${element.geometry.coordinates[1]},${element.geometry.coordinates[0]}" target="_blank">Open in Google Maps</a>
              `
            );
        });
      }
      )
    ).subscribe();
  }

  private publicCycleParking() {
    this._map.getCycleParking().pipe(
      takeUntil(this.unSubscribe$),
      tap((response: any) => {
        response.result.forEach((element: any) => {
          Leaflet.marker([element.geometry.coordinates[1], element.geometry.coordinates[0]], {
            icon: Leaflet.icon({
              iconUrl: element.icon
            })
          }).addTo(this.map)
            .bindPopup(
              `<b>${element.title}</b><br>
              Horario: ${element.tipo}<br>
              Plazas: ${element.plazas}<br>
              <br>
              <a href="https://www.google.com/maps/search/?api=1&query=${element.geometry.coordinates[1]},${element.geometry.coordinates[0]}" target="_blank">Open in Google Maps</a>
              `
            );
        });
      }
      )
    ).subscribe();
  }

  private publicParking() {
    this._map.getPublicParking().pipe(
      takeUntil(this.unSubscribe$),
      tap((response: Parking) => {
        response.result.forEach((element: any) => {
          Leaflet.marker([element.geometry.coordinates[1], element.geometry.coordinates[0]], {
            icon: Leaflet.icon({
              iconUrl: element.icon
            })
          }).addTo(this.map)
            .bindPopup(
              `<b>${element.title}</b><br>
              ${element.description}<br>
              <br>
              <a href="https://www.google.com/maps/search/?api=1&query=${element.geometry.coordinates[1]},${element.geometry.coordinates[0]}" target="_blank">Open in Google Maps</a>
              `
            );
        });
      })
    ).subscribe();
  }

  private copyRights() {
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Angular LeafLet',
    }).addTo(this.map);
  }

  setLocation() {
    this.map = Leaflet.map('mapId').setView([41.645691, -0.885471], 13);
  }

  ngOnDestroy() {
    this.unSubscribe$.next('');
    this.unSubscribe$.complete();
  }

}
