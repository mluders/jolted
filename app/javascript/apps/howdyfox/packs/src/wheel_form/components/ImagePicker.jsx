import React, { useState } from 'react';
import ImageUploader from 'react-images-upload';
import Spinner from './Spinner';
import './image_picker.css';

const imageStyle = {
  maxWidth: '256px',
  maxHeight: '64px'
}

const buttonStyle = {
  color: '#212529',
  display: 'inline-block',
  verticalAlign: 'middle',
  backgroundColor: '#eeeeee',
  borderColor: '#f8f9fa',
  borderRadius: '.25rem',
  padding: '.375rem .75rem',
  color: '#212529',
  fontSize: '1rem',
  fontWeight: '400',
  lineHeight: '1.5',
  textAlign: 'center',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out'
}

const VALID_FILE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

function formatBytes(a,b=2){if(0===a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}

export default function ImagePicker(props) {
  const { imageUrl, changeImageUrl, uploadImage, maxFileSize } = props;
  const [uploading, setUploading] = useState(false);

  const onDrop = async (images) => {
    setUploading(true);
    const url = await uploadImage(images[0]);
    changeImageUrl(url);
    setUploading(false);
  };

  const onDelete = () => {
    changeImageUrl(null);
  }

  const currentBody = () => {
    if (uploading) {
      return <Spinner />;
    } else if (imageUrl) {
      return<div>
        <div className="mb-2">
          {imageUrl && <img src={imageUrl} style={imageStyle}></img>}
        </div>
        <button onClick={onDelete} className="btn btn-light">
          Remove
        </button>
      </div>;
    } else {
      return <div>
        <ImageUploader
          singleImage={true}
          withIcon={true}
          buttonText="Choose image"
          buttonStyles={buttonStyle}
          onChange={onDrop}
          imgExtension={VALID_FILE_EXTENSIONS}
          maxFileSize={maxFileSize}
          withIcon={false}
          withLabel={false}
        />
        <small className="text-muted">
          Max {formatBytes(maxFileSize)} ({VALID_FILE_EXTENSIONS.join(', ')})
        </small>
      </div>;
    }
  }

  return (
    <div className="text-center">
      {currentBody()}
    </div>
  );
}
