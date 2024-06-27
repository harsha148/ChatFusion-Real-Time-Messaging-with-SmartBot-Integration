export type loginDetails = {
    username: string,
    password: string
}

export interface Message {
    id: number;
    text: string;
    sender: string;
    timestamp: string;
  }
  
  export interface Chat {
    id: number;
    name: string;
    messages: Message[];
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
  