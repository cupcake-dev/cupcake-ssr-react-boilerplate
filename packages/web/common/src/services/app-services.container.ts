import { ApiService } from './api-service';
import { AppServiceBaseInterface } from './app-service-base.interface';

interface AppConfig {
  API_URL: string;
}

export class AppServicesContainer {
  constructor(conf: AppConfig) {
    this.api = new ApiService(conf.API_URL);
  }
  private store!: any;

  public setStore(store: any) {
    this.store = store;
  }

  public api!: ApiService;

  private services: { [key: string]: AppServiceBaseInterface } = {};

  public getService<T>(name: string): T {
    return (this.services[name] as any) as T;
  }
}
