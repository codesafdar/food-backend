
export const CustomResponse = (message: string, status: number) => {
  throw ({ message, status })
}