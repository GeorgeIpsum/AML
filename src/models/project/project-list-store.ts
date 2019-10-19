import { types, getRoot, getEnv } from 'mobx-state-tree';
import { Environment } from '../environment';
import { LoadingStatus } from '../status';
import { ProjectModel, Project, ProjectSnapshot } from './project';
import { UUIDGenerator, compare } from '../../utilities/helpers';

export const ProjectListStoreModel = types.model("ProjectListStore")
  .props({
    status: types.optional(types.enumeration<LoadingStatus>("ProjectListLoadingStatus", Object.values(LoadingStatus)), LoadingStatus.idle),
    projects: types.optional(types.array(ProjectModel), []),
    defaultProject: types.optional(types.string, ''),
  })
  .actions(self => ({
    setStatus(value: LoadingStatus) {
      self.status = value;
    },
    setProjects(value?: Project[] | ProjectSnapshot[]) {
      if(value) {
        if(self.projects) {
          self.projects.replace(value as any);
        } else {
          self.projects = value as any;
        }
      } else {
        self.projects.clear();
      }
    },
    setDefaultProject(id: any = '') {
      self.defaultProject = id;
    },
    addProject(name: string = 'Project') {
      if(self.projects) {
        const project: Project = ProjectModel.create({
          id: UUIDGenerator(),
          name: name
        });
        const projects = [...self.projects, ...[project]];
        self.projects.replace(projects as any);
        return true;
      } return false;
    },
    changeProject(index, name: string) {
      if(self.projects && self.projects[index]) {
        if(name) {
          self.projects[index].setName(name);
          return true;
        } return false;
      } return false;
    }
  }))
  .views(self => ({
    get environment() {
      return getEnv(self) as Environment;
    },
    get rootStore() {
      return getRoot(self) as any;
    },
    get isLoading() {
      return self.status === "pending";
    },
    get defaultItem() {
      return self.defaultProject;
    },
    get items() {
      return self.projects;
    },
    get alphabetical() {
      return self.projects.slice().sort((p1, p2) => {
        const P1 = p1.name.toUpperCase(); const P2 = p2.name.toUpperCase();
        return compare(P1, P2);
      });
    }
  }))
  .actions(self => ({
    findById(id: string) {
      if(self.projects) {
        const value = self.projects.find((v) => v.id === id);
        if(value) {
          return value;
        } return false;
      } return false;
    },
    findByName(name: string) {
      if(self.projects) {
        const value = self.projects.find((v) => v.name === name);
        if(value) { 
          return value;
        } return false;
      } return false;
    }
  }))
  .actions(self => ({
    addItem(name: string) {
      self.addProject(name);
    },
    setDefaultItem(id: any = '') {
      self.setDefaultProject(id);
    },
  }));

type ProjectStoreType = typeof ProjectListStoreModel.Type;
export interface ProjectStore extends ProjectStoreType {};
