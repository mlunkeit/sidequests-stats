import {sheets_v4} from "googleapis";
import {Player} from "@/api/Player";
import Sheets = sheets_v4.Sheets;
import Quest from "@/api/Quest";

export class DataSpreadsheet
{
    private readonly spreadsheetId: string;
    private readonly sheets: Sheets;

    private soloQuestsCached = false;
    private readonly cachedSoloQuests: Map<string, Quest> = new Map();

    constructor(spreadsheetId: string, sheets: Sheets)
    {
        this.spreadsheetId = spreadsheetId;
        this.sheets = sheets;
    }

    async fetchPlayerList()
    {
        const range = "Points!A2:D";

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

                        const quests = row[3];

                        return quests
                            ? new Player(this, playerName, points, quests.split(", "))
                            : new Player(this, playerName, points, [] as string[]);
                    });
                }
            });
    }

    async fetchPlayerByName(name: string)
    {
        return this.fetchPlayerList()
            .then(players => {
                if (players)
                    return players.find(player => player.name === name);
            });
    }

    private async fetchSoloQuests(): Promise<void>
    {
        const range = "Solo Side Quests!A2:F"

        return this.sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range: range
        })
            .then(response => response.data.values)
            .then(rows => {
                if(!rows)
                    return [] as Quest[];

                return rows.map(((row, index) => {
                    const questDescriptionAndTitle = row[0].split(": ");
                    const title = questDescriptionAndTitle[0];
                    const description = questDescriptionAndTitle[1];

                    const points = row[2];
                    const flags = row[1].split(", ");

                    return new Quest(title, description, "S" + index, points, flags);
                }));
            })
            .then(quests => {
                quests.forEach(quest => this.cachedSoloQuests.set(quest.id, quest))
            })
    }

    private async fetchMultiplayerQuests(): Promise<void>
    {

    }

    async fetchAllQuests()
    {
        if(!this.soloQuestsCached)
            await this.fetchSoloQuests();
    }

    private getSoloQuestById(id: string)
    {
        const quest = this.cachedSoloQuests.get(id);

        if(!quest)
            throw new Error(`Could not find solo quest with id ${id}`);

        return quest;
    }

    /**
     * Returns the quest with the given unique id.
     *
     * <p><b>NOTE: </b>this method only searches the cached quests. You may need to update the cached quests first.</p>
     *
     * @param id the unique id of the quest
     */
    getQuestById(id: string): Quest
    {
        if(id.startsWith("S"))
            return this.getSoloQuestById(id);
        else
            throw new Error("Invalid quest id: " + id);
    }
}