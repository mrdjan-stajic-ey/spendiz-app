export interface IAppListProps<T extends any = any> {
  data: T[];
  renderItem: ({item}: {item: T}) => JSX.Element | null;
  keyExtractor: (item: T) => any;
}
