import { StatusTransitionValidatorService } from './status-transition-validator.service';
import { Status } from '@conidea/model';

describe('StatusTransitionValidatorService', () => {
  describe('checkStatusTransitionValidity', () => {
    const allStatuses = [
      Status.Submitted,
      Status.InReview,
      Status.Rejected,
      Status.Accepted,
      Status.Finished,
    ];

    allStatuses.forEach((fromStatus) => {
      allStatuses.forEach((toStatus) => {
        const isValidTransition =
          StatusTransitionValidatorService.validTransitions()[
            fromStatus
          ]?.includes(toStatus) ?? false;

        it(`should return ${isValidTransition} for transition from ${fromStatus} to ${toStatus}`, () => {
          expect(
            StatusTransitionValidatorService.checkStatusTransitionValidity(
              fromStatus,
              toStatus
            )
          ).toEqual(isValidTransition);
        });
      });
    });
  });
});
