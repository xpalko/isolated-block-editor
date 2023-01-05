/**
 * WordPress dependencies
 */

import { render, unmountComponentAtNode } from '@wordpress/element';

/**
 * Internal dependencies
 */

import './style.scss';
import IsolatedBlockEditor from '../index';

/** @typedef {import('../index').BlockEditorSettings} BlockEditorSettings */

/**
 * These are the Gutenberg and IsolatedBlockEditor settings. Everything not set uses the defaults.
 *
 * @type BlockEditorSettings
 */
const settings = {
	iso: {
		moreMenu: {
			editor: window.wp.settings?.iso?.moreMenu?.editor ?? true,
			fullscreen: window.wp.settings?.iso?.moreMenu?.fullscreen ?? true,
			preview: window.wp.settings?.iso?.moreMenu?.preview ?? true,
			topToolbar: window.wp.settings?.iso?.moreMenu?.topToolbar ?? true,
		},
		toolbar: {
			inserter: window.wp.settings?.iso?.toolbar?.inserter ?? true,
			inspector: window.wp.settings?.iso?.toolbar?.inspector ?? true,
			navigation: window.wp.settings?.iso?.toolbar?.navigation ?? true,
			documentInspector: window.wp.settings?.iso?.toolbar?.documentInspector ?? true,
			toc: window.wp.settings?.iso?.toolbar?.toc ?? true,
			undo: window.wp.settings?.iso?.toolbar?.undo ?? true,
			selectorTool: window.wp.settings?.iso?.toolbar?.selectorTool ?? true,
		},
		sidebar: {
			inserter: window.wp.settings?.iso?.sidebar?.inserter ?? true,
			inspector: window.wp.settings?.iso?.sidebar?.inspector ?? true
		}
	},
	editor: {
		hasUploadPermissions: window.wp.settings?.editor?.hasUploadPermissions ?? true,
		allowedMimeTypes: window.wp.settings?.editor?.allowedMimeTypes ?? [],
		allowedBlockTypes: window.wp.settings?.editor?.allowedBlockTypes ?? [],
		hasFixedToolbar: window.wp.settings?.editor?.hasFixedToolbar ?? true,
		template: window.wp.settings?.editor?.template ?? null,
		templateLock: window.wp.settings?.editor?.templateLock ?? null,
		reusableBlocks: window.wp.settings?.editor?.reusableBlocks ?? [],
		styles: window.wp.settings?.editor?.styles ?? [],
		defaultEditorStyles: window.wp.settings?.editor?.defaultEditorStyles ?? [],
		bodyPlaceholder: window.wp.settings?.editor?.bodyPlaceholder ?? '',
		__experimentalBlockPatterns: window.wp.settings?.editor?.__experimentalBlockPatterns ?? [],
		__experimentalBlockPatternCategories: window.wp.settings?.editor?.__experimentalBlockPatternCategories ?? []
	}
};

/**
 * Saves content to the textarea
 *
 * @param {string} content Serialized block content
 * @param {HTMLTextAreaElement} textarea Textarea node
 */
function saveBlocks( content, textarea ) {
	textarea.value = content;
}

/**
 * Initial content loader. Determine if the textarea contains blocks or raw HTML
 *
 * @param {string} content Text area content
 * @param {*} parser Gutenberg `parse` function
 * @param {*} rawHandler Gutenberg `rawHandler` function
 */
function onLoad( content, parser, rawHandler ) {
	// Does the content contain blocks?
	if ( content.indexOf( '<!--' ) !== -1 ) {
		// Parse the blocks
		return parser( content );
	}

	// Raw HTML - do our best
	return rawHandler( { HTML: content } );
}

/**
 * Attach IsolatedBlockEditor to a textarea
 *
 * @param {HTMLTextAreaElement} textarea Textarea node
 * @param {BlockEditorSettings} userSettings Settings object
 */
function attachEditor( textarea, userSettings = {} ) {
	// Check it's a textarea
	if ( textarea.type.toLowerCase() !== 'textarea' ) {
		return;
	}

	// Create a node after the textarea
	const editor = document.createElement( 'div' );
	editor.classList.add( 'editor' );

	// Insert after the textarea, and hide it
	// @ts-ignore
	textarea.parentNode.insertBefore( editor, textarea.nextSibling );
	textarea.style.display = 'none';

	// Render the editor
	render(
		<IsolatedBlockEditor
			settings={ { ...settings, ...userSettings } }
			onLoad={ ( parser, rawHandler ) => onLoad( textarea.value, parser, rawHandler ) }
			onSaveContent={ ( content ) => saveBlocks( content, textarea ) }
			onError={ () => document.location.reload() }
		></IsolatedBlockEditor>,
		editor
	);
}

/**
 * Remove IsolatedBlockEditor from a textarea node
 *
 * @param {HTMLTextAreaElement} textarea Textarea node
 */
function detachEditor( textarea ) {
	/**
	 * @type {HTMLElement}
	 */
	// @ts-ignore
	const editor = textarea.nextSibling;

	if ( editor && editor.classList.contains( 'editor' ) ) {
		unmountComponentAtNode( editor );

		// @ts-ignore
		textarea.style.display = null;
		// @ts-ignore
		editor.parentNode.removeChild( editor );
	}
}

// This adds the functions to the WP global, making it easier for the example to work.
window.wp = {
	...( window.wp ?? {} ),
	attachEditor,
	detachEditor,
};
