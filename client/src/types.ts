export interface Product {
  asin: string;
  title: string;
}

export interface PainPoint {
  theme: string;
  frequency: number;
  description: string;
}

export interface ConsumerLanguageGroup {
  theme: string;
  phrases: string[];
}

export interface AdAngle {
  hook: string;
  targetsTheme: string;
}

export interface UploadPreview {
  product: Product;
  reviewCount: number;
  detectedTextColumn?: string | null;
}

export interface AnalysisResult {
  product: Product;
  reviewCount: number;
  painPoints: PainPoint[];
  consumerLanguage: ConsumerLanguageGroup[];
  adAngles: AdAngle[];
  strategyNotes: string;
  detectedTextColumn?: string | null;
}
