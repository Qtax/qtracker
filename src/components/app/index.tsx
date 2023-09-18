import "./style.scss";
import { useEntries } from "../../state";
import Entries from "../entries";
import AcheAdder from "../ache-adder";
import { useRef, useState } from "react";
import useOnClickOutside from "../../hooks/use-on-click-outside";

export default function App() {
	let { entries, addAche, addPainkillers, remove } = useEntries();

	let [isOpen, setIsOpen] = useState(false);

	let ref = useRef<HTMLDivElement>(null);
	useOnClickOutside(ref, () => {
		setIsOpen(false);
	});

	return (
		<div className="app">
			<div className="content">
				<Entries entries={entries} remove={remove} />
			</div>

			<div className="mini-nav">
				<div className="branding">
					<img src="/qtracker.svg" alt="Logo" />
					qTracker
				</div>
				<button className="main-add" onClick={() => setIsOpen(true)}>
					Add
				</button>
			</div>

			<div
				className="adders"
				ref={ref}
				style={{ display: isOpen ? undefined : "none" }}
			>
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
