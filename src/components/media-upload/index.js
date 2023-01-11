import { Component } from 'react';
import { addFilter } from "@wordpress/hooks";

class MediaUpload extends Component {
    openModal = () => {
        console.log('Open Media Library');
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