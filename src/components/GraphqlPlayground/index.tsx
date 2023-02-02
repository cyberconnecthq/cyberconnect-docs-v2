import React from 'react'
import { Provider } from 'react-redux';
import {Playground, store} from 'graphql-playground-react'


export default function GraphqlPlayground({
    endpoint,
  }: {
    endpoint: string;
  }): JSX.Element {
    return (    
        <Playground endpoint={endpoint} /> 
        
    );
  }