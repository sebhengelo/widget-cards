export interface WidgetItem {
  name: string
  icon: React.ReactNode
  description: string
  type: string
}

export interface DroppedWidget extends Omit<WidgetItem, 'icon'> {
  id: string
  content?: string
  children?: DroppedWidget[]
}

export interface CanvasState {
  widgets: DroppedWidget[]
} 