import { ErrorMessage } from './errorMessages';
import ValidationError from './ValidationError';

export function noRecordFound(recordType: string): never {
  throw new ValidationError(
    `${ErrorMessage.RECORD_NOT_FOUND} ${recordType}`,
    404
  );
}
