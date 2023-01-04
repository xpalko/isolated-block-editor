/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';

/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */

function getMenu( current, defaultMenu ) {
	if ( current === false ) {
		return false;
	}

	return defaultMenu;
}

/**
 * Apply default settings to the user supplied settings, ensuring we have a full and valid set of settings
 *
 * @param {BlockEditorSettings} settings - Settings
 * @return {BlockEditorSettings}
 */
export default function applyDefaultSettings( settings ) {
	const { iso, editor } = settings;

	return {
		iso: {
			// No preferences or persistence
			preferencesKey: iso?.preferencesKey ?? null,
			persistenceKey: iso?.persistenceKey ?? null,

			// No disallowed embeds
			disallowEmbed: iso?.disallowEmbed ?? [],

			customStores: iso?.customStores ?? [],

			// Default to all blocks
			blocks: { allowBlocks: iso?.blocks?.allowBlocks ?? [], disallowBlocks: iso?.blocks?.disallowBlocks ?? [] },

			// Inserter, undo, and inspector is on, everything else is off
			toolbar: {
				// @ts-ignore */}
				inserter: true,
				// @ts-ignore */}
				inspector: false,
				// @ts-ignore */}
				navigation: false,
				// @ts-ignore */}
				documentInspector: false,
				// @ts-ignore */}
				toc: false,
				// @ts-ignore */}
				undo: true,
				// @ts-ignore */}
				selectorTool: false,

				...( iso?.toolbar ?? {} ),
			},

			header: iso?.header ?? true,

			sidebar: {
				inserter: false,
				inspector: false,

				...( iso?.sidebar ?? {} ),
			},

			footer: iso?.footer ?? false,

			// Nothing appears in the 'more menu'
			moreMenu: getMenu( iso?.moreMenu, {
				editor: false,
				fullscreen: false,
				preview: false,
				topToolbar: false,

				...( iso?.moreMenu ?? {} ),
			} ),

			// No link menu
			linkMenu: iso?.linkMenu ?? [],

			// Default to top toolbar
			defaultPreferences: {
				...( iso?.defaultPreferences ?? {} ),
			},

			allowApi: iso?.allowApi ?? false,

			disableCanvasAnimations: iso?.disableCanvasAnimations ?? false,

			// No default pattern
			currentPattern: iso?.currentPattern ?? null,

			// No patterns
			patterns: iso?.patterns ?? [],
		},
		editor: {
			alignWide: true,
			disableCustomColors: false,
			disableCustomFontSizes: false,
			disablePostFormats: true,
			titlePlaceholder: __( 'Add title' ),
			isRTL: false,
			autosaveInterval: 60,
			maxUploadFileSize: 0,
			// @ts-ignore */}
			allowedMimeTypes: [],
			styles: [
				{
					baseURL: '',
					__unstableType: 'theme',
					css: "body { font-family: 'Noto Serif' }",
				},
			],
			imageSizes: [],
			richEditingEnabled: true,
			codeEditingEnabled: false,
			// @ts-ignore */}
			allowedBlockTypes: true,
			__experimentalCanUserUseUnfilteredHTML: false,

			// Default to no patterns, reusable blocks
			__experimentalBlockPatterns: [
				{
					"categories": [
						"text"
					],
					"content": "<!-- wp:group {\"align\":\"full\",\"style\":{\"color\":{\"gradient\":\"linear-gradient(135deg,rgb(238,238,238) 21%,rgb(169,184,195) 100%)\"}}} -->\n<div class=\"wp-block-group alignfull has-background\" style=\"background:linear-gradient(135deg,rgb(238,238,238) 21%,rgb(169,184,195) 100%)\"><div class=\"wp-block-group__inner-container\"><!-- wp:heading {\"level\":1} -->\n<h1>Featured Articles</h1>\n<!-- /wp:heading -->\n\n<!-- wp:columns -->\n<div class=\"wp-block-columns\"><!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:image {\"sizeSlug\":\"large\"} -->\n<figure class=\"wp-block-image size-large\"><img src=\"https://picsum.photos/200/300\" alt=\"\"/></figure>\n<!-- /wp:image -->\n\n<!-- wp:heading -->\n<h2>Article 1</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Eaedem res maneant alio modo. At hoc in eo M. Non potes, nisi retexueris illa. Scrupulum, inquam, abeunti; Quantum Aristoxeni ingenium consumptum videmus in musicis?</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:buttons -->\n<div class=\"wp-block-buttons\"><!-- wp:button {\"backgroundColor\":\"red\"} -->\n<div class=\"wp-block-button\"><a class=\"wp-block-button__link has-red-background-color has-background\">Read more</a></div>\n<!-- /wp:button --></div>\n<!-- /wp:buttons --></div>\n<!-- /wp:column -->\n\n<!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:image {\"sizeSlug\":\"large\"} -->\n<figure class=\"wp-block-image size-large\"><img src=\"https://picsum.photos/200/300\" alt=\"\"/></figure>\n<!-- /wp:image -->\n\n<!-- wp:heading -->\n<h2>Article 2</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Eaedem res maneant alio modo. At hoc in eo M. Non potes, nisi retexueris illa. Scrupulum, inquam, abeunti; Quantum Aristoxeni ingenium consumptum videmus in musicis?</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:buttons -->\n<div class=\"wp-block-buttons\"><!-- wp:button {\"backgroundColor\":\"red\"} -->\n<div class=\"wp-block-button\"><a class=\"wp-block-button__link has-red-background-color has-background\">Read more</a></div>\n<!-- /wp:button --></div>\n<!-- /wp:buttons --></div>\n<!-- /wp:column -->\n\n<!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:image {\"sizeSlug\":\"large\"} -->\n<figure class=\"wp-block-image size-large\"><img src=\"https://picsum.photos/200/300\" alt=\"\"/></figure>\n<!-- /wp:image -->\n\n<!-- wp:heading -->\n<h2>Article 3</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Eaedem res maneant alio modo. At hoc in eo M. Non potes, nisi retexueris illa. Scrupulum, inquam, abeunti; Quantum Aristoxeni ingenium consumptum videmus in musicis?</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:buttons -->\n<div class=\"wp-block-buttons\"><!-- wp:button {\"backgroundColor\":\"red\"} -->\n<div class=\"wp-block-button\"><a class=\"wp-block-button__link has-red-background-color has-background\">Read more</a></div>\n<!-- /wp:button --></div>\n<!-- /wp:buttons --></div>\n<!-- /wp:column --></div>\n<!-- /wp:columns --></div></div>\n<!-- /wp:group -->",
					"description": "An example block pattern with a heading.",
					"name": "example/myplugin",
					"title": "Example block pattern"
				}
			],
			// Default to no category patterns, reusable blocks
			__experimentalBlockPatternCategories: [
				{
					"label": "Text",
					"name": "text"
				},
				{
					"label": "Demo",
					"name": "demo"
				}
			],
			// @ts-ignore */}
			reusableBlocks: [],

			// Default to fixed top toolbar
			fixedToolbar: true,

			...editor,

			bodyPlaceholder: editor?.bodyPlaceholder ?? __( 'Start writing or type / to choose a block' ),

			// @ts-ignore */}
			availableLegacyWidgets: {},
			hasPermissionsToManageWidgets: false,

			// Default to no link suggestions
			// @ts-ignore */}
			fetchLinkSuggestions: editor?.fetchLinkSuggestions ?? editor?.__experimentalFetchLinkSuggestions
				? // @ts-ignore */}
				  editor?.fetchLinkSuggestions ?? editor?.__experimentalFetchLinkSuggestions
				: () => [],
		},
	};
}
