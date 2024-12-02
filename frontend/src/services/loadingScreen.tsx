import LoadingSpinner from "../shared/loadingSpinner";

export default function LoadingScreen(prop: props) {
    return (<><div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 text-2xl">
        <div>{prop.displayText}</div><LoadingSpinner /></div>

    </>)
}


type props = {
    displayText: string;
}