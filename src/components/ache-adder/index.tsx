import { AcheTypes, UseEntries, acheLabels } from "../../state";
import "./style.scss";

export default function AcheAdder({
	type,
	addAche,
}: {
	type: AcheTypes;
	addAche: UseEntries["addAche"];
}) {
	return (
		<div className="ache-adder">
			<span className="label">{acheLabels[type]}</span>
			<button className="green" onClick={() => addAche(type, "green")}>
				Green
			</button>
			<button className="yellow" onClick={() => addAche(type, "yellow")}>
				Yellow
			</button>
			<button className="red" onClick={() => addAche(type, "red")}>
				Red
			</button>
		</div>
	);
}
