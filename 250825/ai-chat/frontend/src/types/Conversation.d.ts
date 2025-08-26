export interface Conversation {
  user_id: number;
  user_message: string;
  user_time: string;
  ai_id: number;
  ai_message: string;
  ai_time: string;
}

export interface StreamingMessage {
  id: string;
  user_message: string;
  ai_message: string;
  user_time: string;
  ai_time: string;
  isStreaming: boolean;
}

export interface DisplayMessage extends Conversation {
  isStreaming?: boolean;
}
