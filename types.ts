export interface LCAStage {
    id: number;
    name: string;
    conventionalValue: string | number;
    ecoValue: string | number;
    insight: string;
}

export interface LCASavings {
    value: number;
    unit: string;
    description: string;
    statement: string;
}

export interface ProductComparison {
    id: string;
    title: string;
    conventionalImage: string;
    ecoImage: string;
    stages: LCAStage[];
    savings: LCASavings;
    chartData: {
        name: string;
        Conventional: number;
        EcoFriendly: number;
    }[];
}

export interface CompanyProfile {
    id: string;
    name: string;
    logo: string;
    productType: string; // Links to ProductComparison.id
    co2Total: number;
    ecoPoints: number;
    description: string;
    features: string[];
}

export interface ResearchFinding {
    id: string;
    title: string;
    hypothesisStatus: 'Accepted' | 'Rejected';
    content: string;
    citations: number[];
}

export enum Tab {
    LCA_TRACKER = 'lca-tracker',
    SIMULATOR = 'simulator',
    RESEARCH = 'research'
}