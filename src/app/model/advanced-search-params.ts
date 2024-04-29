export interface AdvancedSearchParams {
  clusterName: string;
  customerName: string;
  ssn: string;
  thirdPartyCode: string;
  statuses: string[];
  createdDate_begin: Date;
  createdDate_end: Date;
  updatedDate_begin: Date;
  updatedDate_end: Date;
  closedBy: string;
  [key: string]: string | Date | string[];
}
