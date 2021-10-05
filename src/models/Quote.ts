export interface miniQuote {
  quote: string;
}

export interface Quote extends miniQuote {
  count: number;
  id: string;
  created_at: string;
}
