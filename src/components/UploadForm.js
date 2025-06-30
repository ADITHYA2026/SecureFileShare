import { Storage, API, graphqlOperation } from 'aws-amplify';
import { createFileMeta } from './graphql/mutations';
import { v4 as uuidv4 } from 'uuid';

const handleUpload = async () => {
  const id = uuidv4(); // unique ID
  const filename = file.name;
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + parseInt(expiry)); // expiry in minutes

  // Upload file to S3
  await Storage.put(`${id}/${filename}`, file);

  // Save metadata to DynamoDB
  await API.graphql(graphqlOperation(createFileMeta, {
    input: {
      id,
      filename,
      fileKey: `${id}/${filename}`,
      expiry: expiryDate.toISOString(),
      password: password || ''
    }
  }));

  setLink(`${window.location.origin}/download/${id}`);
};