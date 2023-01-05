/**
 * WordPress dependencies
 */

import { setLocaleData } from "@wordpress/i18n";

const loaded = setLocaleData(window.wp?.localeData ?? undefined);

export function I18nLoaded() {
	return loaded === undefined ?? true;
}

