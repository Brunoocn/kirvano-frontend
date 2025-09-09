import type { AxiosResponse } from "axios";

export const HTTP_STATUS_INTERCEPTOR = [401, 491];
export const HTTP_STATUS_LOGOUT = [401];

export const logoutMethodInterceptor = (response: AxiosResponse, apiName?: string) => {
    if (!response) return;
    if (!HTTP_STATUS_INTERCEPTOR.includes(response.status)) return;
    if (HTTP_STATUS_LOGOUT.includes(response.status)) {
        const event = new CustomEvent("MF-LOGOUT-ERROR", { bubbles: true });
        window.dispatchEvent(event);

        return;
    }

    const event = new CustomEvent("MF-RENEW-TOKEN", {
        bubbles: true,
        detail: {
            apiName,
        },
    });
    window.dispatchEvent(event);
};
