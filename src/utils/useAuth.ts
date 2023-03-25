import { api, type RouterInputs } from "./api";

type GetUser = RouterInputs["credentials"]["getUserById"];

export const getUsers = ()=> {api.credentials.getAll.useQuery()}
export const getUser = (input:GetUser)=> api.credentials.getUserById.useQuery(input)

export const useCreateUser = () => {
  const utils = api.useContext();
  return api.credentials.RegisterNewUser.useMutation({
    // invalidate the threads so it's fresh 🤣 (taze künefe)
    onSuccess: async () => {
      await utils.credentials.getAll.invalidate();
    },
  });
};