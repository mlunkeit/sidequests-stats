import {JSX} from "react";
import {Player} from "@/api/Player";
import GoogleApi from "@/api/GoogleApi";
import {redirect} from "next/navigation";

const googleApi = GoogleApi.getInstance();
const datasheet = googleApi.getDataSpreadsheet();

interface PageProps
{
    params: { name: string };
}

function PlayerStats({player}: {player: Player}): JSX.Element
{
    return (
        <div>
            <h1>{player.getPoints()} Points</h1>
        </div>
    );
}

export default async function StatsPage({params}: PageProps): Promise<JSX.Element>
{
    const {name} = await params;

    const player = await datasheet.fetchPlayerByName(name);

    return (
    <div
        className="flex flex-col items-center justify-between min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
    >
        {/* Header */}
        <header className="text-center">
            <h1 className="text-3xl font-bold">Stats of {name}</h1>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center sm:items-start w-full max-w-lg">
            {player ? (<PlayerStats player={player}/>) : redirect("/")}
        </main>

        <footer></footer>
    </div>
    );
}