export const isAdmin = (userId: string) => {
  return process.env.NEXT_ADMIN_ID === userId;
};
