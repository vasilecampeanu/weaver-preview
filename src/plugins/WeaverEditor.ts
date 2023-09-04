import { PluginValue, EditorView, ViewPlugin } from "@codemirror/view";
import { eventEmitter } from "utils/EventEmitter";
import Weaver from "main";

class WeaverEditor implements PluginValue {
	private plugin: Weaver;
	private view: EditorView;

	constructor(view: EditorView) {
		this.view = view;
	}

	update(): void {
		const { state } = this.view;
		const { from, to } = state.selection.main;

		if (from !== to) {
			const selectedText = state.doc.sliceString(from, to);
			eventEmitter.emit("textSelected", selectedText);
			console.log("Selected Text:", selectedText)
		}
	}

	addPlugin(plugin: Weaver) {
		this.plugin = plugin;
		this.update();
	}
}

export const weaverEditor = ViewPlugin.fromClass(WeaverEditor);
