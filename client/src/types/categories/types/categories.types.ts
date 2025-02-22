export type Category = {
  id: number;
  name: string;
  parentId: number | null;
  icon: string | null;
  isGroup: boolean;
}