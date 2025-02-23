import { Injectable } from '@nestjs/common';
import { Status } from '@conidea/model';

@Injectable()
export class StatusTransitionValidatorService {
  static checkStatusTransitionValidity(from: Status, to: Status): boolean {
    return this.validTransitions()[from].includes(to);
  }

  static validTransitions() {
    return {
      [Status.Submitted]: [Status.InReview],
      [Status.InReview]: [Status.Submitted, Status.Accepted, Status.Rejected],
      [Status.Rejected]: [Status.Submitted, Status.InReview, Status.Accepted],
      [Status.Accepted]: [
        Status.Submitted,
        Status.InReview,
        Status.Rejected,
        Status.Finished,
      ],
      [Status.Finished]: [],
    };
  }
}
