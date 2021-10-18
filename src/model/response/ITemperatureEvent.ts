export interface ITemperatureEvent {
    content: ITemperatureEventContent[]
}

export interface ITemperatureEventContent {
    id: string;
    tapId: number;
    barrelContent: string;
    temperature: number;
    date: Date;
}