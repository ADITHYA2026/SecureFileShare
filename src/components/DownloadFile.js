import { Storage, API, graphqlOperation } from 'aws-amplify';
import { getFileMeta } from '../graphql/queries';
import { useParams } from 'react-router-dom';

const handleDownload = async () => {
  const { id } = useParams();
  const res = await API.graphql(graphqlOperation(getFileMeta, { id }));
  const fileData = res.data.getFileMeta;

  const now = new Date();
  const expiry = new Date(fileData.expiry);

  if (now > expiry) {
    setStatus('expired');
    return;
  }

  if (fileData.password && fileData.password !== enteredPassword) {
    setStatus('wrong_password');
    return;
  }

  const signedURL = await Storage.get(fileData.fileKey, { expires: 300 }); // 5 min
  window.open(signedURL, "_blank");
};
