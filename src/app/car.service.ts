import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Car, CarModel } from './car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private model = new CarModel();
  private currentCarSubject = new BehaviorSubject<Car | null>(null);

  constructor() {
    // Inicializa el coche actual con el primer coche de la lista
    this.setCurrentCar(this.model.cars[0]);
  }

  getCars(): Car[] {
    return this.model.cars;
  }

  getCurrentCar(): Car | null {
    return this.model.currentCar;
  }

  setCurrentCar(car: Car): void {
    this.model.currentCar = car;
    this.currentCarSubject.next(car); // Notifica a los suscriptores sobre el cambio
  }

  incrementCounter(): void {
    if (this.model.currentCar) {
      this.model.currentCar.clickCount++;
      this.currentCarSubject.next(this.model.currentCar); // Notifica a los suscriptores sobre el cambio
    }
  }

  getCurrentCarObservable() {
    return this.currentCarSubject.asObservable(); // Proporciona el observable para la suscripción
  }
}
