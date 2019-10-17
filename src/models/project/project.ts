import { types, getRoot } from 'mobx-state-tree';

export const ProjectModel = types.model("Project")
  .props({
    id: types.optional(types.identifier, 'xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx'),
    name: types.optional(types.string, 'New Project'),
    active: types.optional(types.boolean, false),
  })
  .actions(self => ({
    setName(value: string) {
      self.name = value;
    },
    setActive(value: boolean) {
      self.active = value;
    }
  }))
  .views(self => ({
    get deposits() {
      const root = getRoot(self);
      if(root && root.depositStore) {
        return root.depositStore.findByProject(self.id);
      } return [];
    }
  }));

type ProjectType = typeof ProjectModel.Type;
export interface Project extends ProjectType {};

type ProjectSnapshotType = typeof ProjectModel.SnapshotType;
export interface ProjectSnapshot extends ProjectSnapshotType {};
