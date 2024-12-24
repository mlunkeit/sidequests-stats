import {sheets_v4, google} from 'googleapis';
import path from 'path';
import dotenv from 'dotenv';
import {DataSpreadsheet} from "@/api/DataSpreadsheet";
dotenv.config();

/**
 * Represents the interface to Google.
 * This class is supposed to only have one single object.
 */
export default class GoogleApi
{
    /**
     * The singleton object of the {@link GoogleApi} class.
     */
    private static instance: GoogleApi;

    private readonly sheets: sheets_v4.Sheets;

    private constructor()
    {
        process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve("./google-credentials.json");

        const auth = new google.auth.GoogleAuth({
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });

        this.sheets = google.sheets({version: 'v4', auth});
    }

    /**
     * Returns the instance of the {@link DataSpreadsheet} where the quest data is stored.
     */
    getDataSpreadsheet(): DataSpreadsheet
    {
        const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

        if(!spreadsheetId)
            throw new Error("GOOGLE_SPREADSHEET_ID is not set in .env");

        return new DataSpreadsheet(spreadsheetId, this.sheets);
    }

    /**
     * Returns the singleton object of the {@link GoogleApi} or creates a new if none is present.
     */
    static getInstance(): GoogleApi
    {
        if (!GoogleApi.instance)
            return new GoogleApi();
        return GoogleApi.instance;
    }
}