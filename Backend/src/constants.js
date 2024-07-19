export const DB_URL = process.env.MONGODB_URL;
export const DB_NAME = 'codeconnect';

const avatar_Upload_Options = {
  folder: 'codeconnect/avatars',
  resource_type: 'image',
};
const projectPhoto_Upload_Options = {
  folder: 'codeconnect/project-photos',
  resource_type: 'image',
};
const spaceAvatar_Upload_Options = {
  folder: 'codeconnect/space-avatars',
  resource_type: 'image',
};

export {
  avatar_Upload_Options,
  projectPhoto_Upload_Options,
  spaceAvatar_Upload_Options,
};
