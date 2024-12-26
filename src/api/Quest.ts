export default class Quest
{
    private readonly _title: string;
    private readonly _description: string;
    private readonly _id: string;
    private readonly _points: number;
    private readonly _flags: string[];

    constructor(title: string, description: string, id: string, points: number, flags: string[] = [])
    {
        this._title = title;
        this._description = description;
        this._id = id;
        this._points = points;
        this._flags = flags;
    }

    /**
     * Returns the title of the quest.
     */
    get title(): string
    {
        return this._title;
    }

    /**
     * Returns the description of the quest.
     */
    get description(): string
    {
        return this._description;
    }

    /**
     * Returns the id of the quest.
     */
    get id(): string
    {
        return this._id;
    }

    /**
     * Returns how many points the player gets, if they complete the quest.
     */
    get points(): number
    {
        return this._points;
    }

    /**
     * Returns the flags of the quest.
     */
    get flags(): string[]
    {
        return this._flags;
    }
}