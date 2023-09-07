import { Fragment } from 'react';
import './app.scss';
import { useEntries } from './state';
import type { Entry, Aches, Painkillers, EntryData } from "./state";

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

			<p>
				Headache:
				<button onClick={() => addAche("headache", "green")}>Green</button>
				<button onClick={() => addAche("headache", "yellow")}>Yellow</button>
				<button onClick={() => addAche("headache", "red")}>Red</button> 
			</p>

			<p>
				Stomachache:
				<button onClick={() => addAche("stomachache", "green")}>Green</button>
				<button onClick={() => addAche("stomachache", "yellow")}>Yellow</button>
				<button onClick={() => addAche("stomachache", "red")}>Red</button> 
			</p>

			<p>
				Menstrual cramps:
				<button onClick={() => addAche("menstrualCramps", "green")}>Green</button>
				<button onClick={() => addAche("menstrualCramps", "yellow")}>Yellow</button>
				<button onClick={() => addAche("menstrualCramps", "red")}>Red</button> 
			</p>

			<p>
				Painkillers:
				<button onClick={() => addPainkillers("paracetamol")}>Paracetamol</button>
				<button onClick={() => addPainkillers("paracetamol+ibuprofen")}>Paracetamol &amp; Ibuprofen</button>
			</p>

		</div>
	);
}


function DateHeader({ date }: { date: Date }) {
	return <h3>{formatDate(date)} {date.toLocaleString('en-us', {  weekday: 'long' })}</h3>
}


function Entry({ entry, remove }: { entry: Entry, remove: () => void }) {
	let data = entry.data;
	let level = "level" in data ? data.level : undefined;

	return <div className={`entry ${level ?? ""}`}>
		<FancyTime time={entry.timestamp} />

		{data.type == "headache" || data.type == "stomachache" || data.type == "menstrualCramps" ?
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
	return <div className={`ache ${data.level ?? ""}`}>
		<span className="type">{data.type}</span>{" "}
		<span className="level">{data.level}</span>
	</div>
}

function Painkillers({ entry, data }: { entry: Entry, data: Painkillers }) {
	return <div className="painkillers">{data.kind ?? data.type}</div>
}


export default App;
