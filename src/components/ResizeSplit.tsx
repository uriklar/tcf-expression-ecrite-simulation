import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import type { ReactNode } from 'react';

type ResizeSplitProps = {
  description: ReactNode;
  editor: ReactNode;
};

export function ResizeSplit({ description, editor }: ResizeSplitProps) {
  return (
    <PanelGroup autoSaveId="tcf-writing-split" className="split" direction="vertical">
      <Panel defaultSize={38} minSize={22} className="split-panel">
        {description}
      </Panel>
      <PanelResizeHandle className="resize-handle" />
      <Panel minSize={34} className="split-panel">
        {editor}
      </Panel>
    </PanelGroup>
  );
}
