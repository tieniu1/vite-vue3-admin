export interface IDataType<T = any> {
  code: number;
  body: T;
}
export type IPieEchartData = {
  value: number;
  name: string;
};
