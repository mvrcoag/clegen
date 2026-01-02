/**
 * {{ Entity }} type definition
 */
export interface {{ Entity }} {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * {{ Entity }} Props for React components
 */
export interface {{ Entity }}Props {
  {{ entity }}?: {{ Entity }};
  onUpdate?: ({{ entity }}: {{ Entity }}) => void;
  onDelete?: (id: string) => void;
}

/**
 * {{ Entity }} State
 */
export interface {{ Entity }}State {
  items: {{ Entity }}[];
  loading: boolean;
  error: Error | null;
}
