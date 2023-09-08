import { Fragment } from 'react';
import './app.scss';
import { acheLabels, isAche, useEntries } from './state';
import type { Entry, Aches, Painkillers, EntryData, UseEntries, AcheTypes } from "./state";

function truncDate(date: Date): Date {
	let d = new Date(date);
	d.setHours(0, 0, 0, 0);
	return d;
}

function App() {
	let { entries, addAche, addPainkillers, remove } = useEntries();
	let prevDate: Date;

	return (
		<div className="app">
			<div className="entries">
				{entries.map(entry => {
					let date = truncDate(entry.timestamp);
					let renderDate = !prevDate || +prevDate != +date;
					prevDate = date;

					return <Fragment key={entry.id}>
						{renderDate && <DateHeader date={date}/>}
						<Entry entry={entry} remove={() => remove(entry.id)}/>
					</Fragment>
				})}
			</div>

			<div className="adders">
				<div>
					<button onClick={() => addPainkillers("paracetamol")}>Paracetamol</button>{" "}
					<button onClick={() => addPainkillers("paracetamol+ibuprofen")}>Paracetamol &amp; Ibuprofen</button>
				</div>
				<AcheAdder type="headache" addAche={addAche} />
				<AcheAdder type="stomachache" addAche={addAche} />
				<AcheAdder type="menstrualCramps" addAche={addAche} />
				<AcheAdder type="kneePain" addAche={addAche} />
				<AcheAdder type="sick" addAche={addAche} />
			</div>
		</div>
	);
}


function AcheAdder({ type, addAche }: { type: AcheTypes; addAche: UseEntries["addAche"]; }) {
	return (<div className="ache-adder">
		<span className="label">{acheLabels[type]}</span>
		<button className="green" onClick={() => addAche(type, "green")}>Green</button>
		<button className="yellow" onClick={() => addAche(type, "yellow")}>Yellow</button>
		<button className="red" onClick={() => addAche(type, "red")}>Red</button> 
	</div>);
}


function DateHeader({ date }: { date: Date }) {
	return <h3>{formatDate(date)} {date.toLocaleString('en-us', {  weekday: 'long' })}</h3>
}


function Entry({ entry, remove }: { entry: Entry, remove: () => void }) {
	let data = entry.data;
	let level = "level" in data ? data.level : undefined;

	return <div className={`entry ${level ?? ""}`}>
		<FancyTime time={entry.timestamp} />

		{isAche(data) ?
			<Ache entry={entry} data={data} /> :
		data.type == "painkillers" ?
			<Painkillers entry={entry} data={data} /> :
		(data as EntryData).type}
		
		<button className="remove" onClick={remove}>X</button>
	</div>
}

function FancyTime({ time }: { time: Date }) {
	return <span className="time">
		{zeroPad(time.getHours())}
		<span className="minutes">:{zeroPad(time.getMinutes())}</span>
	</span>;
}

function formatDate(date: Date) {
	return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(date.getDate())}`;
}

function formatTime(time: Date) {
	return zeroPad(time.getHours()) + ":" + zeroPad(time.getMinutes());
}

function zeroPad(n: number, padding = 2): string {
	return String(n).padStart(padding, "0");
}

function Ache({ entry, data }: { entry: Entry, data: Aches }) {
	return <div className="ache">
		<span className="label">{acheLabels[data.type]}</span>{" "}
		<span className="level">{data.level}</span>
	</div>
}

function Painkillers({ entry, data }: { entry: Entry, data: Painkillers }) {
	return <div className="painkillers">{data.kind ?? data.type}</div>
}


export default App;
