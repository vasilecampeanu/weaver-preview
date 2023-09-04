import { PluginValue, EditorView, ViewPlugin } from "@codemirror/view";
import { eventEmitter } from "utils/EventEmitter";
import Weaver from "main";

class WeaverEditor implements PluginValue {
	private plugin: Weaver;
	private view: EditorView;
	private lastSelection: { from: number; to: number } | null = null;

	constructor(view: EditorView) {
		this.view = view;
	}

	update(): void {
		const { state } = this.view;
		const { from, to } = state.selection.main;

		if (!this.lastSelection || this.lastSelection.from !== from || this.lastSelection.to !== to) {
			if (from !== to) {
				const selectedText = state.doc.sliceString(from, to);
				eventEmitter.emit("textSelected", selectedText);
				console.log("Selected Text:", selectedText);
			}

			this.lastSelection = { from, to };
		}
	}

	addPlugin(plugin: Weaver) {
		this.plugin = plugin;
		this.update();
	}
}

export const weaverEditor = ViewPlugin.fromClass(WeaverEditor);
