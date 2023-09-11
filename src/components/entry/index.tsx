import { acheLabels, isAche } from "../../state";
import type { Aches, Entry, EntryData, Painkillers } from "../../state";
import { zeroPad } from "../../time";
import "./style.scss";

export default function Entry({
	entry,
	remove,
}: {
	entry: Entry;
	remove: () => void;
}) {
	let data = entry.data;
	let level = "level" in data ? data.level : undefined;

	return (
		<div className={`entry ${level ?? ""}`}>
			<FancyTime time={entry.timestamp} />

			{isAche(data) ? (
				<Ache entry={entry} data={data} />
			) : data.type == "painkillers" ? (
				<Painkillers entry={entry} data={data} />
			) : (
				(data as EntryData).type
			)}

			<button className="remove" onClick={remove}>
				X
			</button>
		</div>
	);
}

export function FancyTime({ time }: { time: Date }) {
	return (
		<span className="time">
			{zeroPad(time.getHours())}
			<span className="minutes">:{zeroPad(time.getMinutes())}</span>
		</span>
	);
}

function Ache({ data }: { entry: Entry; data: Aches }) {
	return (
		<div className="ache">
			<span className="label">{acheLabels[data.type]}</span>{" "}
			<span className="level">{data.level}</span>
		</div>
	);
}

function Painkillers({ data }: { entry: Entry; data: Painkillers }) {
	return <div className="painkillers">{data.kind ?? data.type}</div>;
}
