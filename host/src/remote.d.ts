declare module "remoteTodos/todos-app" {
    export function app(id: string): Promise<void>;
}

declare module "remoteUsers/users-app"
{
    export function app(id: string): Promise<void>;
}

