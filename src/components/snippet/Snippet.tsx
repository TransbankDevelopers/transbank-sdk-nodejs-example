"use client";
import React from "react";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./Snippet.css";

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
    <div className="snipet-container">
      <button className="Copy-button">
        <CopyToClipboard text={props.code}>
          <Image src="/copy.svg" alt="copy icon" width={16} height={16} />
        </CopyToClipboard>
      </button>
      <SyntaxHighlighter
        language={props.language || SnippetLanguage.JAVASCRIPT}
        style={oneDark}
      >
        {props.code}
      </SyntaxHighlighter>
    </div>
  );
};
