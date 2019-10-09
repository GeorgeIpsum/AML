import { types, getRoot } from 'mobx-state-tree';

export const ContextModel = types.model("Context")
  .props({
    id: types.identifier,
    name: types.string
  })
  .actions(self => ({
    setName(value: string) {
      self.name = value;
    }
  }))
  .views(self => ({
    get deposits() {
      const root = getRoot(self);
      if(root && root.depositStore) {
        return root.depositStore.findByContext(self.id);
      }
      console.log(root);
      return [];
    }
  }));

type ContextType = typeof ContextModel.Type;
export interface Context extends ContextType {};

type ContextSnapshotType = typeof ContextModel.SnapshotType;
export interface ContextSnapshot extends ContextSnapshotType {};