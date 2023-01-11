import { Component } from 'react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { addFilter } from "@wordpress/hooks";

class MediaIframe extends Component  {
    render() {
        return (
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <iframe
                        src={ window.wp.settings.editor.mediaLibraryIframeSrc }/>
                </div>
            </div>
        );
    }
}

class MediaUpload extends Component {
    openModal = () => {
        // @ts-ignore
        ReactDOM.render(<MediaIframe />, document.getElementById('container'))
    }

    render() {
        return this.props.render( { open: this.openModal } );
    }
}

export default function initMediaLibrary() {
    const replaceMediaUpload = () => MediaUpload;

    addFilter(
        'editor.MediaUpload',
        'core/edit-post/components/media-upload/replace-media-upload',
        replaceMediaUpload
    );
}