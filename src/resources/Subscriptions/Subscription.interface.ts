export interface forMe {
  userId?: string;
  noOfMonths?: number;
  renewable?: boolean;
}

export interface forOthers {
  noOfMonths?: number;
  renewable?: boolean;
}

export interface ISubscriptions {
  forMe?: forMe;
  forOthers?: forOthers;
  totalCost: string;
  cancelMe?: boolean;
  cancelOthers?: boolean;
  reason?: string;
}
