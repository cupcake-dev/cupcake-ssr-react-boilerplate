import { UserInterface } from '@cupcake/common'

export class UserDto implements UserInterface {
    public id: string;
    public login: string;
    public email: string;
}