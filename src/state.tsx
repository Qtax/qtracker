import { useEffect, useReducer } from "react";

export type Entry = {
	id: number;
	timestamp: Date;
	note?: string | undefined;
	data: EntryData;
};

export type EntryData = Aches | Painkillers | Plain;

export type Aches =
	| Headache
	| Stomachache
	| MenstrualCramps
	| KneePain
	| Sick
	| Nausea
	| Anxiety
	| Stress;
export type AcheTypes = Aches["type"];

export const acheLabels: Record<AcheTypes, string> = {
	headache: "Headache",
	stomachache: "Stomachache",
	kneePain: "Knee pain",
	menstrualCramps: "Menstrual cramps",
	sick: "Sick",
	nausea: "Nausea",
	anxiety: "Anxiety",
	stress: "Stress",
};

export function isAche(entry: EntryData): entry is Aches {
	return Object.keys(acheLabels).includes(entry.type);
}

/**
 * Green light: I have a headache but I’m able to GO (i.e. "I have a headache but I'm going to work" or "I'm going to look after my kids")
 * Yellow light: I have to SLOW down (i.e. "I better take it easy or I might not make that meeting later. I have to be cautious.")
 * Red light: I have to STOP (i.e. "I have to stop what I'm doing, go home from work, go lie down, I can't look after my children", etc.)
 *
 * Src: https://americanheadachesociety.org/news/the-traffic-light-of-headache/
 */
export type PainLevel = "green" | "yellow" | "red";

export type Headache = {
	type: "headache";
	level?: PainLevel | undefined;
};

export type Stomachache = {
	type: "stomachache";
	level?: PainLevel | undefined;
};

export type MenstrualCramps = {
	type: "menstrualCramps";
	level?: PainLevel | undefined;
};

export type KneePain = {
	type: "kneePain";
	level?: PainLevel | undefined;
};

export type Sick = {
	type: "sick";
	level?: PainLevel | undefined;
};

export type Nausea = {
	type: "nausea";
	level?: PainLevel | undefined;
};

export type Anxiety = {
	type: "anxiety";
	level?: PainLevel | undefined;
};

export type Stress = {
	type: "stress";
	level?: PainLevel | undefined;
};

export type Painkillers = {
	type: "painkillers";
	kind?: "paracetamol" | "ibuprofen" | "paracetamol+ibuprofen";
};

export type Plain = Gym | Love | Aphthae | BirthControlPill | AdhdPill;
export type PlainType = Plain["type"];

export type Gym = {
	type: "gym";
};

export type Love = {
	type: "love";
};

export type Aphthae = {
	type: "aphthae";
};

export type BirthControlPill = {
	type: "birthControlPill";
};

export type AdhdPill = {
	type: "adhdPill";
};

export type State = {
	usedIds: number;
	entries: Entry[];
};

let initialState: State = {
	usedIds: 0,
	entries: [],
};

export type AddAction = {
	type: "add";
	data: EntryData;
};

export type RemoveAction = {
	type: "remove";
	id: number;
};

export type Action = AddAction | RemoveAction;

export function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "add": {
			let id = state.usedIds;
			let item: Entry = {
				id,
				timestamp: new Date(),
				data: action.data,
			};

			return {
				...state,
				usedIds: id + 1,
				entries: [...state.entries, item],
			};
		}
		case "remove": {
			let { id } = action;
			return {
				...state,
				entries: state.entries.filter((entry) => entry.id != id),
			};
		}
	}

	throw new Error("Unknown action");
}

const STORAGE_KEY = "entriesState";

export function useEntries() {
	let [state, dispatch] = useReducer(reducer, initialState, initializer);

	useEffect(() => {
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify(state, (key, value) => {
				if (value instanceof Date) return value.toUTCString();
				return value;
			}),
		);
	}, [state]);

	function addAche(type: AcheTypes, level: PainLevel) {
		dispatch({ type: "add", data: { type, level } });
	}

	function addPainkillers(kind: Painkillers["kind"]) {
		dispatch({ type: "add", data: { type: "painkillers", kind } });
	}

	function addPlain(type: PlainType) {
		dispatch({ type: "add", data: { type } });
	}

	function remove(id: number) {
		dispatch({ type: "remove", id });
	}

	return {
		entries: state.entries,
		remove,
		addAche,
		addPainkillers,
		addPlain,
	};
}

export type UseEntries = ReturnType<typeof useEntries>;

function initializer(initialState: State): State {
	let stored = localStorage.getItem(STORAGE_KEY);
	if (!stored) return initialState;
	return JSON.parse(stored, (key, value) => {
		if (key == "timestamp" && value) {
			let date = new Date(value);
			if (!isNaN(+date)) return date;
		}

		return value;
	});
}
