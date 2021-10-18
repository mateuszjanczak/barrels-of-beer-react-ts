export interface IActionEvent {
    content: IActionEventContent[]
}

export interface IActionEventContent {
    id: string;
    tapId: number;
    barrelContent: string;
    currentLevel: number;
    totalUsage: number;
    singleUsage: number;
    date: Date;
    logType: string;
}