import "./style.scss";
import { useEntries } from "../../state";
import Entries from "../entries";
import AcheAdder from "../ache-adder";

export default function App() {
	let { entries, addAche, addPainkillers, remove } = useEntries();

	return (
		<div className="app">
			<Entries entries={entries} remove={remove} />

			<div className="adders">
				<div>
					<button onClick={() => addPainkillers("paracetamol")}>
						Paracetamol
					</button>{" "}
					<button
						onClick={() => addPainkillers("paracetamol+ibuprofen")}
					>
						Paracetamol &amp; Ibuprofen
					</button>
				</div>

				<AcheAdder type="headache" addAche={addAche} />
				<AcheAdder type="stomachache" addAche={addAche} />
				<AcheAdder type="menstrualCramps" addAche={addAche} />
				<AcheAdder type="kneePain" addAche={addAche} />
				<AcheAdder type="sick" addAche={addAche} />
				<AcheAdder type="anxiety" addAche={addAche} />
				<AcheAdder type="stress" addAche={addAche} />
				<AcheAdder type="nausea" addAche={addAche} />
			</div>
		</div>
	);
}
