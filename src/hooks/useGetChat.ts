import { graphql } from "../gql";

export const getChatsDocument = graphql(`
  query Chats {
    chats {
      ...chatFragment
    }
  }
`);
