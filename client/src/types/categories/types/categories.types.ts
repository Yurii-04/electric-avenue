export type Category = {
  id: string;
  name: string;
  parentId: number | null;
  icon: string | null;
  isGroup: boolean;
}