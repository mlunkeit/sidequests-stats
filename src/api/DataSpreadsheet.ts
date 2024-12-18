import {sheets_v4} from "googleapis";
import {Player} from "@/api/Player";
import Sheets = sheets_v4.Sheets;

export class DataSpreadsheet
{
    private readonly spreadsheetId: string;
    private readonly sheets: Sheets;

    constructor(spreadsheetId: string, sheets: Sheets)
    {
        this.spreadsheetId = spreadsheetId;
        this.sheets = sheets;
    }

    async fetchPlayerList()
    {
        const range = "Points!A2:B";

        return this.sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range: range
        })
            .then(response => response.data.values)
            .then(rows => {
                if (rows)
                {
                    return rows.map(row => {
                        const playerName = row[0];
                        const points = row[1];

                        return new Player(playerName, points);
                    });
                }
            });
    }
}