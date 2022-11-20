import React from "react";
import { KatexOptions } from "katex";

import MarkdownIt, { Options as MarkdownItOptions } from "markdown-it";
// @ts-ignore
import mdit from "markdown-it-texmath";
import { MarkdownProps } from "../types";
import { Context } from "../context";

export type FormulaOptionsForKatex = {
  texmath?: {
    engine?: any;
    // https://github.com/goessner/markdown-it-texmath#features
    delimiters?:
      | "dollars"
      | "brackets"
      | "doxygen"
      | "gitlab"
      | "julia"
      | "kramdown"
      | "beg_end";
    katexOptions?: KatexOptions;
  };
};

export const MarkdownForKatex: React.FC<MarkdownProps> = ({
  className,
  text,
}) => {
  const {
    formulaOptions,
    mdiOptions,
    htmlFilter,
  } = React.useContext(Context);
  const mdi = new MarkdownIt(mdiOptions);
  mdi.use(mdit, {
    engine: require("katex"),
    delimiters: "dollars",
    ...formulaOptions.texmath,
  });
  const html = mdi.render(replaceForKatex(text));
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: htmlFilter(html) }}
    ></div>
  );
};

const replaceForKatex = (text: string) => {
  return text
    .replace(/\\\\begin\{eqnarray\}/g, "\\begin{aligned}")
    .replace(/\\\\end\{eqnarray\}/g, "\\end{aligned}");
};
