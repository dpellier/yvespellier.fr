
import './gallery.scss';
import React, { Fragment, useState, useCallback } from 'react';
import VendorGallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import PropTypes from 'prop-types';

const Gallery = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openViewer = useCallback((event, { index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeViewer = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return (
        <Fragment>
            <VendorGallery onClick={ openViewer }
                           photos={ images } />
            <ModalGateway>
                { viewerIsOpen ? (
                    <Modal onClose={ closeViewer }>
                        <Carousel currentIndex={ currentImage }
                                  views={ images.map((image) => ({
                                      ...image,
                                      srcset: image.srcSet
                                  }))}
                        />
                    </Modal>
                ) : null }
            </ModalGateway>
        </Fragment>
    );
};

Gallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        height: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
        srcSet: PropTypes.arrayOf(PropTypes.string).isRequired,
        width: PropTypes.number.isRequired
    })).isRequired
};

export { Gallery };
