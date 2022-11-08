import React from 'react';

import { useMutation } from '@apollo/client';
import { SINGLE_UPLOAD  } from "../apollo/Operations";


const UploadFile = () => {
  const [mutate, { loading, error }] = useMutation(SINGLE_UPLOAD);
  
  const onChange = ({
    target: {
      validity,
      files: [file]
    }
  }: any) => {
    
    console.log('file: ', JSON.stringify(file));
    return validity.valid && mutate({ variables: { file } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <React.Fragment>
      <input type="file" required onChange={onChange} />
    </React.Fragment>
  );
};

export default UploadFile;