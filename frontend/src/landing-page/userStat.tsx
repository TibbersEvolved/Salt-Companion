export default function UserStat(prop: props) {
    return (<div className="tooltip" data-tip={prop.tooltip}>
        <button className="btn bg-[#fc7961] text-white h-10   text-md font-semibold hover:bg-[#f35b7e]">{prop.text}</button>
    </div>)
}

type props = {
    text: string;
    tooltip: string;
}