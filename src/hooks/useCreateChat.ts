import { useMutation } from "@apollo/client/react";
import { graphql } from "../gql";

const createChatDocument = graphql(`
  mutation CreateChat($createChatInput: CreateChatInput!) {
    createChat(createChatInput: $createChatInput) {
      _id
      userId
      isPrivate
      userIds
      name
    }
  }
`);

export const userCreateChat = () => {
  return useMutation(createChatDocument);
};
