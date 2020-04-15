import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";
import { AppServiceBaseInterface } from "./app-service-base.interface";
import { AuthTokensInterface } from "./../contarcts";

export class ApiService implements AppServiceBaseInterface {
	public name: string = "api";
	constructor(apiUrl: string) {
		// super()
		this.instance = axios.create({
			baseURL: apiUrl,
			timeout: 5000,
			withCredentials: true,
		});
	}
	private instance!: AxiosInstance;
	private getAuthTokens?: () => AuthTokensInterface | null;
	public setGetAuthTokensHandler(
		getAuthTokens: () => AuthTokensInterface | null
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
			Authorization: `Bearer ${authTokens.accessToken}`
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
		config?: AxiosRequestConfig
	): AxiosPromise<T> {
		console.log("post");
		const _config = this.setAuthHeader(config);
		console.log("post 2", _config);
		return this.instance.post(url, data, _config);
	}
	put<T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): AxiosPromise<T> {
		return this.instance.put(url, data, this.setAuthHeader(config));
	}
	patch<T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): AxiosPromise<T> {
		return this.instance.patch(url, data, this.setAuthHeader(config));
	}
}
