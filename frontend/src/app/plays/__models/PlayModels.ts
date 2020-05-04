import { Opponent } from "app/opponents/__models/OpponentModels";

export interface PlayResultRow {
    opponent: Opponent;
    position?: number;
    points?: number;
}
