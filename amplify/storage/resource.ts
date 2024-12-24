import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'ca-as1-lostnfound',
  access: (allow) => ({
    'uploads/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read','write']),
    ],
  })
});