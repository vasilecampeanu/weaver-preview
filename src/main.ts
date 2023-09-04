import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, WorkspaceLeaf } from "obsidian";
import { EditorView } from "@codemirror/view";

import { WeaverSettings } from "interfaces/WeaverSettings";
import { SampleSettingTab, DEFAULT_SETTINGS } from "settings";
import { weaverEditor } from "plugins/WeaverEditor";

export default class Weaver extends Plugin {
	public settings: WeaverSettings;

	async onload() {
		await this.messageOnLoad();
		await this.loadSettings();
		this.registerEditorExtension(weaverEditor);
		await this.registerEventListeners();
		this.app.workspace.onLayoutReady(this.onLayoutReady.bind(this));
	}

	async messageOnLoad() {
		console.log("obsidian-weaver loading...");
	}

	async onunload() { }

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	private async getSelection(leaf: WorkspaceLeaf): Promise<void> {
		// @ts-expect-error
		const editor = leaf?.view?.editor;

		if (editor) {
			const editorView = editor.cm as EditorView;
			const editorPlugin = editorView.plugin(weaverEditor);
			editorPlugin?.addPlugin(this);
			editorPlugin?.update();
		}
	}

	private async onLayoutReady(): Promise<void> {
		this.getSelection(this.app.workspace.getMostRecentLeaf() as WorkspaceLeaf);
	}

	private async registerEventListeners(): Promise<void> {
		this.registerEvent(
			this.app.workspace.on("active-leaf-change", async (leaf: WorkspaceLeaf) => {
				this.getSelection(leaf);
			})
		);
	}
}
