export type UserSliceType = {
  username: string;
  status: 'idle' | 'loading' | 'error';
  position: {
    latitude: number;
    longitude: number;
  } | undefined;
  address: {};
  error: string | undefined;
};
