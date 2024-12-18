interface PageProps {
    params: { name: string };
}

export default async function StatsPage({params}: PageProps): JSX.Element
{
    const {name} = await params;

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

        </main>

        {/* Footer (optional) */}
        <footer className="text-sm text-gray-500">
            © 2024 - 2025, Malte Lunkeit
        </footer>
    </div>
    );
}