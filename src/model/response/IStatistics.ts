export interface IStatistics {
    name: string;
    items: IStatisticsData[];
}

export interface IStatisticsData {
    date: string;
    count: number;
}