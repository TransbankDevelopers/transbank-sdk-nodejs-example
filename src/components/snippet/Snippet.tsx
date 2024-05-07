"use client";
import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";

export enum SnippetLanguage {
  PYTHON = "python",
  JAVASCRIPT = "javascript",
}

export type SnippetProps = {
  code: string;
  language?: SnippetLanguage;
  showLineNumbers?: boolean;
};

export const Snippet = (props: SnippetProps) => {
  return (
    <CopyBlock
      text={props.code}
      language={props.language || SnippetLanguage.JAVASCRIPT}
      showLineNumbers={props.showLineNumbers || false}
      codeBlock
      theme={dracula}
      customStyle={{
        padding: "12px",
        borderRadius: "0px",
      }}
    />
  );
};
