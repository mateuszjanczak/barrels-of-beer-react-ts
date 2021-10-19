export interface IActionEvent {
    content: IActionEventContent[]
    totalPages: number
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