import { Timestamp } from './Timestamp';

export interface TimeWindow {
  readonly start: Timestamp;
  readonly end: Timestamp | null;
}
