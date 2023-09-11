import { Fragment } from "react";
import { UseEntries } from "../../state";
import Entry from "../entry";
import { formatDate, truncDate } from "../../time";
import "./style.scss";

export default function Entries({
	entries,
	remove,
}: Pick<UseEntries, "entries" | "remove">) {
	let prevDate: Date;

	return (
		<div className="entries">
			{entries.map((entry) => {
				let date = truncDate(entry.timestamp);
				let renderDate = !prevDate || +prevDate != +date;
				prevDate = date;

				return (
					<Fragment key={entry.id}>
						{renderDate && <DateHeader date={date} />}
						<Entry entry={entry} remove={() => remove(entry.id)} />
					</Fragment>
				);
			})}
		</div>
	);
}

function DateHeader({ date }: { date: Date }) {
	return (
		<h3>
			{formatDate(date)}{" "}
			{date.toLocaleString("en-us", { weekday: "long" })}
		</h3>
	);
}
