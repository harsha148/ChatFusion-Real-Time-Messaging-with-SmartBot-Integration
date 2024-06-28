export type loginDetails = {
    username: string,
    password: string
}

export interface MessageType {
    id: number;
    text: string;
    sender: string;
    timestamp: string;
  }
  
  export interface Chat {
    id: number;
    name: string;
    messages: MessageType[];
  }
  
  export interface User {
    id: number;
    username: string;
  }
  
  export interface RootState {
    user: {
      isAuthenticated: boolean;
      user: User | null;
    };
    chats: Chat[];
  }
  