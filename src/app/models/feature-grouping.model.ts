import { Criteria, Configuration, Data } from '../../../lib/gulp/model/model.module';

export interface FeatureGroupLabel {
    value: string;
    tooltip?: string;
    colors?: {
        background?: string;
        text?: string;
        clazz?: string;
    };
}

export interface FeatureGroupView {
    key: string;
    displayName: string;
    label: FeatureGroupLabel;
    children: Criteria[];
    isExcluded: boolean;
    isExpanded: boolean;
}

export interface GroupedCriteriaStructure {
    groups: FeatureGroupView[];
    flat: Criteria[];
    columnGroupMap: Record<string, string>;
}

export interface MarkdownComparisonPayload {
    configuration: Configuration;
    data: Data;
}

export interface GroupTogglePayload {
    groupKey: string;
    expanded: boolean;
}
