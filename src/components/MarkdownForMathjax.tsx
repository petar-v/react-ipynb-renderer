import React from "react";

import MarkdownIt, { Options as MarkdownItOptions } from "markdown-it";
// @ts-ignore
import mdim from "markdown-it-mathjax3";
import { MarkdownProps } from "../types";
import { Context } from "../context";

export type FormulaOptionsForMathjax = {
  mathjax3?: {
    // https://docs.mathjax.org/en/v3.0-latest/options/input/tex.html
    tex?: any;
    svg?: any;
  };
};

export const MarkdownForMathjax: React.FC<MarkdownProps> = ({
  className,
  text,
}) => {
  const {
    formulaOptions,
    mdiOptions,
    htmlFilter,
  } = React.useContext(Context);
  const mdi = new MarkdownIt(mdiOptions);
  mdi.use(mdim, {
    ...formulaOptions.mathjax3,
  });
  const html = mdi.render(text);
  return <div
    className={className}
    dangerouslySetInnerHTML={{ __html: htmlFilter(html) }}
  ></div>;
};
