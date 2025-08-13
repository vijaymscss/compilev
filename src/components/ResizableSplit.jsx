import React from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

export default function ResizableSplit({ left, right }) {
  return (
    <PanelGroup direction='horizontal' className='h-full'>
      <Panel defaultSize={50} minSize={20} className='h-full'>
        <div className='h-full'>{left}</div>
      </Panel>
      <PanelResizeHandle className='w-1 bg-border hover:bg-primary transition-colors' />
      <Panel defaultSize={50} minSize={20} className='h-full'>
        <div className='h-full'>{right}</div>
      </Panel>
    </PanelGroup>
  );
}
