import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

// Models
import { SettingsModel } from "../../models/settings.model";

@Injectable({
	providedIn: 'root'
})
export class SettingsService {

	settings: SettingsModel;

	constructor(
		private storage: Storage
	) {
		this.settings = new SettingsModel();
	}

	saveSettings( settings: SettingsModel ) {
		this.storage.set('settings', settings);
	}

	async getSettings() {
		const settings = await this.storage.get('settings');
		if (settings) {
			this.settings = settings;
		}
		return this.settings;
	}


	async wantTaxiOption() {
		const settings = await this.storage.get('settings');
		return settings.wantTaxi || false;
	}

	async wantPaymentsOptionInTabs() {
		const settings = await this.storage.get('settings');
		return settings.wantPaymentsInTabsMenu || false;
	}

	// async wantPaymentsOptionInLeftMenu() {
	// 	const settings = await this.storage.get('settings');
	// 	return settings.wantPaymentsInLeftMenu;
	// }




}
