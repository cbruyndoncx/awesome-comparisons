import { CriteriaGroupData } from './dataElement';
import { DataElement } from './dataElement';

export interface DataGroupSummary {
  name: string;
  children: Array<string>;
  labels: Set<string>;
}

export class Data {
  public dataElements: Array<DataElement>;
  public groups: Map<string, DataGroupSummary>;

  constructor(dataElement: Array<DataElement>, groups?: Map<string, DataGroupSummary>);

  public static loadJson(json, configuration): Data;

  public json();

  public markdown(): Array<string>;
}
