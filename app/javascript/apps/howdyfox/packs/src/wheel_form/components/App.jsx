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
        store.wheel = data['wheel'];
        store.imageUploadUrl = data['image_upload_url'];
        store.imageUploadUrlFields = data['image_upload_url_fields'];
      }
    }

    fetchData();
  }, []);

  const onSave = async () => {
    store.isSubmitting = true;
    store.generalError = null;
    const [status, data] = await updateWheel(store.wheel);

    if (status == 200) {
      window.location.href = '/';
    } else if (status == 422) {
      store.isSubmitting = false;
      const { wheel } = data;
      store.wheel = wheel;
      scrollToClass('is-invalid');
    } else {
      store.isSubmitting = false;
      store.generalError = "Something went wrong when creating your wheel. Please contact support@howdyfox.com";
      scrollToClass('general-error');
    }
  }

  function scrollToClass(className) {
    const items = document.getElementsByClassName(className);
    if (items.length > 0) {
      items[0].scrollIntoView();
    }
  }

  return useObserver(() => {
    const { isSubmitting, generalError, wheel, changeWheel, changeSegment, uploadImage } = store;

    return (
      <div>
        {!wheel && <Spinner />}

        {
          wheel &&
          <Form
            isSubmitting={isSubmitting}
            generalError={generalError}
            wheel={wheel}
            changeWheel={changeWheel}
            changeSegment={changeSegment}
            uploadImage={uploadImage}
            onSave={onSave}
          />
          }
      </div>
    );
  });
}
