import React from 'react'
import { useLocalStore } from 'mobx-react';

export const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    isSubmitting: false,
    wheel: null,
    changeWheel: (key, value) => {
      store.wheel = {
        ...store.wheel,
        [key]: value
      }
    },
    changeSegment: (index, key, value) => {
      const clonedSegments = JSON.parse(JSON.stringify(store.wheel.wheelSegments));
      clonedSegments[index][key] = value;
      clonedSegments[index]['errors'][key] = [];

      store.wheel = {
        ...store.wheel,
        wheelSegments: clonedSegments
      }
    }
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
