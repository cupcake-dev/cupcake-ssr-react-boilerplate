import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { AppServiceBaseInterface } from './app-service-base.interface';
import { AuthTokensInterface } from './../contarcts';

export class ApiService implements AppServiceBaseInterface {
  public name = 'api';
  constructor(apiUrl: string) {
    // super()
    this.instance = axios.create({
      baseURL: apiUrl,
      timeout: 5000,
      withCredentials: true,
    });
    createAuthRefreshInterceptor(this.instance, this.refreshAuthLogic);
  }
  private instance!: AxiosInstance;
  private getAuthTokens?: () => AuthTokensInterface | null;
  private dispatchSetTokenAction?: (token: AuthTokensInterface) => void;

  private refreshAuthLogic = async (failedRequest: any) => {
    try {
      const refreshResponse = await this.post('auth/refresh_token');
      if (refreshResponse.data.accessToken !== '') {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.dispatchSetTokenAction!(refreshResponse.data);
        failedRequest.config.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
        return Promise.resolve();
      } else {
        return Promise.reject('Refresh token invalid');
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  public setDispatchSetTokenAction(
    dispatchSetTokenAction: (token: AuthTokensInterface) => void,
  ) {
    this.dispatchSetTokenAction = dispatchSetTokenAction;
  }

  public setGetAuthTokensHandler(
    getAuthTokens: () => AuthTokensInterface | null,
  ) {
    this.getAuthTokens = getAuthTokens;
  }
  setAuthHeader(config?: AxiosRequestConfig) {
    const _config = config ? config : {};
    if (!this.getAuthTokens) return _config;
    const authTokens = this.getAuthTokens();
    if (authTokens === null) return _config;
    _config.headers = {
      ..._config.headers,
      Authorization: `Bearer ${authTokens.accessToken}`,
    };
    return _config;
  }
  public request<T = any>(config: AxiosRequestConfig): AxiosPromise<T> {
    return this.instance.request(this.setAuthHeader(config));
  }
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.instance.get(url, this.setAuthHeader(config));
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.instance.delete(url, this.setAuthHeader(config));
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.instance.head(url, this.setAuthHeader(config));
  }
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise<T> {
    const _config = this.setAuthHeader(config);
    return this.instance.post(url, data, _config);
  }
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise<T> {
    return this.instance.put(url, data, this.setAuthHeader(config));
  }
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise<T> {
    return this.instance.patch(url, data, this.setAuthHeader(config));
  }
}
