export interface ITextHighlit {
  sentence: string;
  highlightWord: string;
}
export interface ITextHighlitStyles {
  hightlitStyle?: {
    fontWeight: any;
    [key: string]: any;
  };
}
