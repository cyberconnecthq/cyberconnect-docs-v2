import React from "react";
import { ApolloExplorer } from "@apollo/explorer/react";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import ReactDOMServer from 'react-dom/server';

export default function ToolTips({
  text,
  tooltip,
}: {
  text: string;
  tooltip: string;
}): JSX.Element {
  return (    
    <p id="my-element" data-tooltip-html={ReactDOMServer.renderToString(<div>{tooltip}</div>)}>
      {text}
    </p>
  );
}

