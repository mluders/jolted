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
        console.log(wheel);
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
      console.log(wheel);
    }
  }

  return useObserver(() => {
    const { isSubmitting, wheel, changeSegment } = store;

    return (
      <div>
        {!wheel && <Spinner />}

        {
          wheel &&
          <Form
            isSubmitting={isSubmitting}
            wheel={wheel}
            changeSegment={changeSegment}
            onSave={onSave}
          />
          }
      </div>
    );
  });
}
