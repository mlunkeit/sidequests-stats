import GoogleApi from "@/api/GoogleApi";

const googleApi = GoogleApi.getInstance();
const datasheet = googleApi.getDataSpreadsheet();

function ProgressBar({ name, progress, max }: { name: string; progress: number, max: number }) {
    return (
        <div className={"progress-bar"} style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <div className={"progress-bar-label"} style={{ whiteSpace: "nowrap", textAlign: "right", paddingRight: "10px", width: "150px" }}>
                <span><a href={name}>{name}</a></span>
                <span>{progress} XP</span>
            </div>
            <div style={{ flex: 1 }}>
                <div
                    className="progress-bar bg-violet-700 shadow rounded p-1"
                    style={{
                        width: (progress/max * 100) + "%",
                        height: "auto",
                    }}
                ></div>
            </div>
        </div>
    );
}

async function ProgressBarTable() {
    const players = await datasheet.fetchPlayerList();

    if(!players)
        return (<div>No data :(</div>);

    let highestScore = Math.max(...players.map(player => player.getPoints()));

    if(highestScore === 0)
        highestScore = 1;

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px" }}>
            {(players.sort((a, b) => b.getPoints() - a.getPoints()).map(player => (
                <ProgressBar name={player.getName()} progress={player.getPoints()} max={highestScore} />
            )))}
        </div>
    );
}

export default function Home() {
    return (
        <div
            className="flex flex-col items-center justify-between min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
        >
            {/* Header */}
            <header className="text-center">
                <h1 className="text-3xl font-bold">Leaderboard</h1>
            </header>

            {/* Main Content */}
            <main className="flex flex-col items-center sm:items-start w-full max-w-lg">
                <ProgressBarTable/>
            </main>

            <footer></footer>
        </div>
    );
}