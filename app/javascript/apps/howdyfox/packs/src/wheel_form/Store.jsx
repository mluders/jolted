import React from 'react'
import { useLocalStore } from 'mobx-react';
import { directUploadToS3 } from '../shared/api/aws';

export const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    isSubmitting: false,
    wheel: null,
    imageUploadUrl: null,
    imageUploadUrlFields: null,
    changeWheel: (key, value) => {
      store.wheel = {
        ...store.wheel,
        [key]: value
      }
      store.wheel.errors[key] = [];
    },
    changeSegment: (index, key, value) => {
      const clonedSegments = JSON.parse(JSON.stringify(store.wheel['wheel_segments']));
      clonedSegments[index][key] = value;
      clonedSegments[index]['errors'][key] = [];

      store.wheel = {
        ...store.wheel,
        'wheel_segments': clonedSegments
      }
    },
    uploadImage: async (image) => {
      const { imageUploadUrl, imageUploadUrlFields } = store;

      if (!imageUploadUrl) return;
      if (!imageUploadUrlFields) return;

      let url = null;

      try {
        url = await directUploadToS3(
          image,
          imageUploadUrl,
          imageUploadUrlFields
        );
      } catch (error) {
        console.error('Error when uploading image: ', error);
      }

      return url;
    }
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
