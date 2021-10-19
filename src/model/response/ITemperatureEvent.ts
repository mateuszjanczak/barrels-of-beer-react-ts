export interface ITemperatureEvent {
    content: ITemperatureEventContent[]
    totalPages: number
}

export interface ITemperatureEventContent {
    id: string;
    tapId: number;
    barrelContent: string;
    temperature: number;
    date: Date;
}