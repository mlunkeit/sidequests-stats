import {JSX} from "react";
import {Player} from "@/api/Player";
import GoogleApi from "@/api/GoogleApi";
import {redirect} from "next/navigation";
import Quest from "@/api/Quest";

const googleApi = GoogleApi.getInstance();
const datasheet = googleApi.getDataSpreadsheet();

export interface PageProps
{
    params: Promise<{ name: string }>;
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
        <div className={"quest-container border-2 shadow rounded hover:shadow-lg transition-all"}
             style={{margin: "10px", padding: "10px", cursor: "default"}}>
            <h1 className={"font-bold"}>{quest.title} <span style={{color: "var(--fg-secondary)"}}>+{quest.points}</span></h1>
            <p>{quest.description}</p>
        </div>
    );
}

function Divider({title}: {title: string}): JSX.Element
{
    return (
        <div className={"divider relative h-1 m-10"} style={{backgroundColor: "var(--foreground)"}}>
            <label className={"absolute left-1/2 top-1/2 p-1"} style={{transform: "translate(-50%, -50%)", backgroundColor: "var(--background)"}}>{title}</label>
        </div>
    )
}

async function PlayerStats({player}: { player: Player }): Promise<JSX.Element> {
    const quests = await player.fetchActiveQuests();

    return (
        <div className={"w-full"}>
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