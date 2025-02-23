/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { MediaUpload } from "@wordpress/media-utils";

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
			mediaUpload: MediaUpload,
			disableCustomColors: false,
			disableCustomFontSizes: false,
			disablePostFormats: true,
			titlePlaceholder: __( 'Add title' ),
			isRTL: false,
			autosaveInterval: 60,
			maxUploadFileSize: 0,
			// @ts-ignore */}
			allowedMimeTypes: {
				"jpg|jpeg|jpe": "image/jpeg",
				png: "image/png",
				gif: "image/gif",
				"mp3|m4a|m4b": "audio/mpeg",
				"mov|qt": "video/quicktime",
				avi: "video/avi",
				wmv: "video/x-ms-wmv",
				"mid|midi": "audio/midi",
				pdf: "application/pdf",
				"mp4|m4v": "video/mp4",
				webm: "video/webm",
				ogv: "video/ogg",
				"txt|asc|c|cc|h|srt": "text/plain",
				webp: "image/webp"
			},
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
			mediaLibraryIframeSrc: ( editor?.mediaLibraryIframeSrc ?? '' ),

			__experimentalCanUserUseUnfilteredHTML: false,

			// Default to no patterns, reusable blocks
			__experimentalBlockPatterns: ( editor?.__experimentalBlockPatterns ?? [] ),
			// Default to no category patterns, reusable blocks
			__experimentalBlockPatternCategories: ( editor?.__experimentalBlockPatternCategories ?? [] ),
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
