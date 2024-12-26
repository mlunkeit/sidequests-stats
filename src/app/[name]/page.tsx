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

function PointDisplay({points}: {points: number})
{
    return (
        <div className="relative mb-20">
            <h1 className={"text-violet-700 font-bold text-3xl absolute left-1/2 top-1/2"}
                style={{transform: "translate(-50%, -50%)"}}>{points} Points</h1>
        </div>
    )
}

function QuestDisplay({quest}: {quest: Quest}): JSX.Element
{
    return (
        <div className={"quest-container bg-gray-100 shadow rounded hover:shadow-lg transition-all"}
             style={{margin: "10px", padding: "10px", cursor: "default"}}>
            <h1 className={"font-bold"}>{quest.title}</h1>
            <p>{quest.description}</p>
        </div>
    );
}

function Divider({title}: {title: string}): JSX.Element
{
    return (
        <div className={"divider bg-gray-600 relative h-1 m-10"}>
            <label className={"absolute left-1/2 top-1/2 bg-white p-1"} style={{transform: "translate(-50%, -50%)"}}>{title}</label>
        </div>
    )
}

async function PlayerStats({player}: { player: Player }): Promise<JSX.Element> {
    const quests = await player.fetchActiveQuests();

    return (
        <div>
            <PointDisplay points={player.points}/>
            <Divider title={"Active Quests"} />
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