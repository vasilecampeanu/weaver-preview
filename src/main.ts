import { WeaverSettings } from 'interfaces/WeaverSettings';
import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import SampleSettingTab, { DEFAULT_SETTINGS } from 'settings';

export default class Weaver extends Plugin {
	settings: WeaverSettings;

	async onload() {
		await this.messageOnLoad();
		await this.loadSettings();
		this.addSettingTab(new SampleSettingTab(this.app, this));
	}

	async messageOnLoad() {
		console.log('obsidian-weaver loading...');
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{}, 
			DEFAULT_SETTINGS, 
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
