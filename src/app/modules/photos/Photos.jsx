
import React from 'react';
import { ContentContainer } from 'app/components/contentContainer/ContentContainer';
import { Gallery } from 'app/components/gallery/Gallery';
import images from 'assets/images/photos/data.json';

const Photos = () => {
    return (
        <ContentContainer>
            <Gallery images={ images } />
        </ContentContainer>
    );
};

export { Photos };
