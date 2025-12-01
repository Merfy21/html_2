export interface ChartDataPoint {
  year: string;
  value: number;
  label?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export enum AnalysisTopic {
  HISTORY = "Development History",
  BUSINESS_MODEL = "Business Model & Monetization",
  COMPETITION = "Competition (vs Douyin)",
  FUTURE = "Future Outlook"
}

export interface AnalysisResponse {
  topic: AnalysisTopic;
  content: string;
}

// Hardcoded data types for the visual charts
export const DAU_DATA: ChartDataPoint[] = [
  { year: '2017', value: 66, label: '66M' },
  { year: '2018', value: 117, label: '117M' },
  { year: '2019', value: 176, label: '176M' },
  { year: '2020', value: 264, label: '264M' },
  { year: '2021', value: 323, label: '323M' },
  { year: '2022', value: 366, label: '366M' },
  { year: '2023', value: 383, label: '383M' },
];

export const REVENUE_DATA: ChartDataPoint[] = [
  { year: '2017', value: 8.3, label: '¥8.3B' },
  { year: '2018', value: 20.3, label: '¥20.3B' },
  { year: '2019', value: 39.1, label: '¥39.1B' },
  { year: '2020', value: 58.8, label: '¥58.8B' },
  { year: '2021', value: 81.1, label: '¥81.1B' },
  { year: '2022', value: 94.2, label: '¥94.2B' },
  { year: '2023', value: 113.5, label: '¥113.5B' },
];
