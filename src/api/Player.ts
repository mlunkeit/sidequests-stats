/**
 * This class represents a player who completes quests.
 */
export class Player
{
    private readonly name: string;
    private points: number;

    constructor(name: string, points: number)
    {
        this.name = name;
        this.points = points;
    }

    /**
     * Returns the name of the player.
     */
    getName()
    {
        return this.name;
    }

    /**
     * Returns the current player's points.
     */
    getPoints()
    {
        return this.points;
    }
}