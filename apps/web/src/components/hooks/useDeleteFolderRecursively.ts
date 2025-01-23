import { useAppSelector } from "@/redux/hooks";

const useDeleteFolderRecursively = () => {
  const items = useAppSelector((state) => state.explorer.explorerItems);

  const deleteFolderRecursively = (
    itemId: string,
    arr: string[] = []
  ): string[] => {
    const folder = items[itemId];
    if (!folder.isFolder) {
      arr.push(itemId);
      return arr;
    }

    for (const child of folder.children) {
      arr.push(child);
      if (items[child].isFolder) {
        return deleteFolderRecursively(child, arr);
      }
    }

    return arr;
  };

  return [deleteFolderRecursively];
};

export default useDeleteFolderRecursively;
