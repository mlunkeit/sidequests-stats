export class Player
{
    private readonly name: string;
    private points: number;

    constructor(name: string, points: number)
    {
        this.name = name;
        this.points = points;
    }

    getName()
    {
        return this.name;
    }

    getPoints()
    {
        return this.points;
    }
}