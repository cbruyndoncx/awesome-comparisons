import { CriteriaData } from './criteriaData';

export interface CriteriaGroupData {
  label: CriteriaData;
  children: Array<string>;
}

export class DataElement {
  public name: string;
  public url: string;
  public shortDescription: string;
  public criteriaData: Map<string, CriteriaData>;
  public groupData: Map<string, CriteriaGroupData>;
  public criteriaGroup: Map<string, string>;
  public html: string;
  public latex: string;
  public sourcePath?: string | null;
  public editLink?: string | null;
  public mcpEnrichment?: any;

  constructor(
    name: string,
    url: string,
    shortDescription: string,
    criteriaData: Map<string, CriteriaData>,
    averageRating?: number,
    html?: string,
    latex?: string,
    groupData?: Map<string, CriteriaGroupData>,
    criteriaGroup?: Map<string, string>,
    sourcePath?: string
  );

  public static loadJson(json, configuration): DataElement;

  public json();

  public markdown(): string;

  public getCriteriaData(id: string): CriteriaData;

  public getGroupData(id: string): CriteriaGroupData;

  public getGroupLabel(id: string): CriteriaData;

  public getGroupChildren(id: string): Array<string>;

  public getGroupForCriteria(criteriaId: string): string;

  public listGroups(): Array<string>;

  // Return criteriaData + criteriaData for (name,url) and (ShortDescription)
  public getCriteriaDataExtended(): Array<CriteriaData>;
}
