import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { Housinglocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">
          {{ housingLocation?.city }} , {{ housingLocation?.state }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section -heading">About this housing location</h2>
        <ul>
          <li>Units Available: {{ housingLocation?.availableUnits }}</li>
          <li>
            Does this location have Wifi:
            {{ housingLocation?.wifi ? 'Yes' : 'No' }}
          </li>
          <li>
            Does this location has Laundry:
            {{ housingLocation?.laundry ? 'Yes' : 'No' }}
          </li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input type="text" id="first-name" formControlName="firstName" />

          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" formControlName="lastName" />

          <label for="email">Email</label>
          <input type="email" id="email" formControlName="email" />
          <button type="submit" class="primary">Apply Now</button>
        </form>
      </section>
    </article>
  `,
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: Housinglocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });
  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((housingLocaction: Housinglocation | undefined) => {
        this.housingLocation = housingLocaction;
      });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
