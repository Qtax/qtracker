import "./style.scss";
import { useEntries } from "../../state";
import Entries from "../entries";
import AcheAdder from "../ache-adder";
import { useLayoutEffect, useRef, useState } from "react";
import useOnClickOutside from "../../hooks/use-on-click-outside";

export default function App() {
	let { entries, addAche, addPainkillers, addPlain, remove } = useEntries();

	let lastEntriesLength = useRef(0);
	useLayoutEffect(() => {
		if (entries.length > lastEntriesLength.current) {
			let scrollElem = document.scrollingElement || document.body;
			scrollElem.scrollTop = scrollElem.scrollHeight;
		}
		lastEntriesLength.current = entries.length;
	}, [entries.length]);

	let [isOpen, setIsOpen] = useState(false);

	let addersRef = useRef<HTMLDivElement>(null);
	useOnClickOutside(addersRef, () => {
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
				ref={addersRef}
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

				<div>
					<button onClick={() => addPlain("gym")}>Gym</button>{" "}
					<button onClick={() => addPlain("love")}>Love</button>{" "}
					<button onClick={() => addPlain("aphthae")}>Aphthae</button>{" "}
					<button onClick={() => addPlain("birthControlPill")}>
						The pill
					</button>{" "}
					<button onClick={() => addPlain("adhdPill")}>
						ADHD pill
					</button>{" "}
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
