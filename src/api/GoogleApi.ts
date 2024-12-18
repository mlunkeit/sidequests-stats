import {sheets_v4, google} from 'googleapis';
import path from 'path';
import dotenv from 'dotenv';
import {DataSpreadsheet} from "@/api/DataSpreadsheet";
dotenv.config();

export default class GoogleApi
{
    static instance: GoogleApi;

    private readonly sheets: sheets_v4.Sheets;

    constructor()
    {
        process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve("./google-credentials.json");

        const auth = new google.auth.GoogleAuth({
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });

        this.sheets = google.sheets({version: 'v4', auth});
    }

    getDataSpreadsheet(): DataSpreadsheet
    {
        const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

        if(!spreadsheetId)
            throw new Error("GOOGLE_SPREADSHEET_ID is not set in .env");

        return new DataSpreadsheet(spreadsheetId, this.sheets);
    }

    static getInstance(): GoogleApi
    {
        if (!GoogleApi.instance)
            return new GoogleApi();
        return GoogleApi.instance;
    }
}