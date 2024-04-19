import { PostPutItemMutationProps } from '../types/models';

export const buildFileUploadRequest = (data: PostPutItemMutationProps, method: 'POST' | 'PUT') => {
  const myHeaders = new Headers();
  myHeaders.append('accept', 'text/plain');

  const formdata = new FormData();

  formdata.append('itemWithFileInput', JSON.stringify(data));
  if (data.files) {
    formdata.append('file', data.files[0], data.files[0].name);
  }

  const requestOptions: RequestInit = {
    method,
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
    credentials: 'include'
  };

  return requestOptions;
};
