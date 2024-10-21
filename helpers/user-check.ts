
export const isAdmin = async(userId: string) =>{
    return process.env.NEXT_ADMIN_ID === userId;
}