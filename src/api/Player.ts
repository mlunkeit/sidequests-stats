import Quest from "@/api/Quest";
import {DataSpreadsheet} from "@/api/DataSpreadsheet";

/**
 * This class represents a player who completes quests.
 */
export class Player
{
    private readonly datasheet: DataSpreadsheet;

    private readonly _name: string;
    private readonly _points: number;
    private readonly _activeQuests: string[];

    /**
     * Constructs a new {@link Player} instance.
     *
     * @param datasheet
     * @param name
     * @param points
     * @param activeQuests
     */
    constructor(datasheet: DataSpreadsheet, name: string, points: number, activeQuests: string[] = [])
    {
        this.datasheet = datasheet;

        this._name = name;
        this._points = points;
        this._activeQuests = activeQuests;
    }

    /**
     * Returns the name of the player.
     */
    get name()
    {
        return this._name;
    }
    
    /**
     * Returns the current player's points.
     */
    get points()
    {
        return this._points;
    }

    async fetchActiveQuests(): Promise<Quest[]>
    {
        await this.datasheet.fetchAllQuests();

        return this._activeQuests.map(id => this.datasheet.getQuestById(id));
    }
}