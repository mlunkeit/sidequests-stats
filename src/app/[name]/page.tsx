import {JSX} from "react";
import {Player} from "@/api/Player";
import GoogleApi from "@/api/GoogleApi";
import {redirect} from "next/navigation";
import Quest from "@/api/Quest";

const googleApi = GoogleApi.getInstance();
const datasheet = googleApi.getDataSpreadsheet();

interface PageProps
{
    params: { name: string };
}

function QuestDisplay({quest}: {quest: Quest}): JSX.Element
{
    return (
        <div>
            <h1>{quest.title}</h1>
            <p>{quest.description}</p>
        </div>
    );
}

async function PlayerStats({player}: {player: Player}): Promise<JSX.Element>
{
    const quests = await player.fetchActiveQuests();

    return (
        <div>
            <h1>{player.points} Points</h1>
            <h1>Active quests:</h1>
            <div>
                {quests.map(quest => (
                    <QuestDisplay key={quest.id} quest={quest}/>
                ))}
            </div>
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