// const postItemWithFile = async (item: PostItemMutationProps, files?: FileList): Promise<Item> => {
//   const myHeaders = new Headers();
//   myHeaders.append('accept', 'text/plain');

//   const formdata = new FormData();

//   formdata.append('itemJson', JSON.stringify(item));
//   if (files) {
//     formdata.append('file', files[0], files[0].name);
//   }

//   const requestOptions: RequestInit = {
//     method: 'POST',
//     headers: myHeaders,
//     body: formdata,
//     redirect: 'follow',
//     credentials: 'include'
//   };

//   const response = await fetch(API_URL, requestOptions);

//   return await response.json();
// };
