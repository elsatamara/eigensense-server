export interface CustomFilterInterface {
  name: string;
  location?: string[];
  agent?: string[];
  queue?: string[];
  status?: string[];
  type?: string[];
  from?: Date | null;
  to?: Date | null;
  customFilterId: string;
}
