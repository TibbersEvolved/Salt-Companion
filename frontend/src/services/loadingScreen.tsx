export default function LoadingScreen(prop: props) {
    return (<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 text-2xl">
        {prop.displayText}</div>)
}


type props = {
    displayText: string;
}