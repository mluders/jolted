import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { getWheel, updateWheel } from '../api/wheel';
import { StoreContext } from '../Store';
import Spinner from './Spinner';
import Form from './Form';

export default function App() {
  const store = React.useContext(StoreContext);

  useEffect(() => {
    const fetchData = async () => {
      const [status, data] = await getWheel();

      if (status == 200) {
        const { wheel } = data;
        store.wheel = wheel;
      }
    }

    fetchData();
  }, []);

  const onSave = async () => {
    store.isSubmitting = true;
    const [status, data] = await updateWheel(store.wheel);

    if (status == 200) {
      window.location.href = '/';
    } else {
      store.isSubmitting = false;
      const { wheel } = data;
      store.wheel = wheel;
      scrollToError();
    }
  }

  function scrollToError() {
    const items = document.getElementsByClassName('is-invalid');
    if (items.length > 0) {
      items[0].scrollIntoView();
    }
  }

  return useObserver(() => {
    const { isSubmitting, wheel, changeWheel, changeSegment } = store;

    return (
      <div>
        {!wheel && <Spinner />}

        {
          wheel &&
          <Form
            isSubmitting={isSubmitting}
            wheel={wheel}
            changeWheel={changeWheel}
            changeSegment={changeSegment}
            onSave={onSave}
          />
          }
      </div>
    );
  });
}
