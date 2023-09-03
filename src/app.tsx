import './app.css';
import { useEntries } from './state';
import type { Entry, Aches, Painkillers, EntryData } from "./state";


function App() {
	let { entries, addAche, addPainkillers, remove } = useEntries();

	return (
		<div className="App">
			<ul>
				{entries.map(entry => <li><Entry key={entry.id} entry={entry} remove={() => remove(entry.id)}/></li>)}
			</ul>

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


function Entry({ entry, remove }: { entry: Entry, remove: () => void }) {
	let data = entry.data;
	return <div>
		{formatDate(entry.timestamp)} {formatTime(entry.timestamp)} <button onClick={remove}>X</button>: {
		data.type == "headache" || data.type == "stomachache" || data.type == "menstrualCramps" ? <Ache entry={entry} data={data} /> :
		data.type == "painkillers" ? <Painkillers entry={entry} data={data} /> :
		(data as EntryData).type
	}</div>
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
	return <div>{data.type}: {data.level}</div>
}

function Painkillers({ entry, data }: { entry: Entry, data: Painkillers }) {
	return <div>{data.kind ?? data.type}</div>
}


export default App;
