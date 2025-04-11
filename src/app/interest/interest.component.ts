import { Component } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests.service';
import { Interests } from '../models/interests/interests.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-interests',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css']
})
export class InterestsComponent {

  interestsList: Interests[] = [];

  constructor(public interestsService: InterestsService) {
    console.log(this.interestsService);
    this.interestsService.getInterests().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() }) as Interests
        )
      )
    ).subscribe(data => {
      this.interestsList = data;
      console.log(this.interestsList);
    });
  }
}

