import { PluginValue, EditorView, ViewPlugin } from "@codemirror/view";
import { eventEmitter } from "utils/EventEmitter";
import Weaver from "main";

class WeaverEditor implements PluginValue {
	private plugin: Weaver;
	private view: EditorView;
	private isSelectionEvent: boolean = false;

	constructor(view: EditorView) {
		this.view = view;
		view.dom.addEventListener("mouseup", this.setIsSelectionEvent.bind(this));
		view.dom.addEventListener("keyup", this.setIsSelectionEvent.bind(this));
	}

	setIsSelectionEvent(e: Event): void {
		this.isSelectionEvent = true;
	}

	update(): void {
		if (this.isSelectionEvent) {
			const { state } = this.view;
			const { from, to } = state.selection.main;

			if (from !== to) {
				const selectedText = state.doc.sliceString(from, to);
				eventEmitter.emit("textSelected", selectedText);
				console.log("Selected Text:", selectedText);
			}

			this.isSelectionEvent = false;
		}
	}

	addPlugin(plugin: Weaver) {
		this.plugin = plugin;
		this.update();
	}
}

export const weaverEditor = ViewPlugin.fromClass(WeaverEditor);
