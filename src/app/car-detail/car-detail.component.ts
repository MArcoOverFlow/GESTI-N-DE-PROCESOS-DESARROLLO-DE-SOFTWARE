import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarService } from '../car.service';
import { CommonModule } from '@angular/common';
import { Car } from '../car.model';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit, OnDestroy {
  currentCar : Car | null = null;
  subscription: Subscription | undefined;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.currentCar = this.carService.getCurrentCar();
    // Suscríbete al observable para recibir los cambios del coche actual
    this.subscription = this.carService.getCurrentCarObservable().subscribe(car => {
      this.currentCar = car;
    });

    console.log(this.currentCar);
    
  }

  ngOnDestroy(): void {
    // Asegúrate de desuscribirte para evitar fugas de memoria
    if (this.subscription)
    this.subscription.unsubscribe();
  }

  incrementCounter(): void {
    this.carService.incrementCounter();
  }
}
